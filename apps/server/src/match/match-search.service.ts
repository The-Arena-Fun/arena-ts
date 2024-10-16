import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PublicKey } from '@solana/web3.js';
import { ConfigService } from '@nestjs/config';
import { createClient, RedisClientType, SchemaFieldTypes } from 'redis'
import { RedisService } from '../database/redis.service';
import { AppEvents } from '../events/events';
import { MatchParticipantRepository } from '../database/match-participant.repo';
import { MatchRepository } from '../database/match.repo';
import { UserRepository } from '../database/user.repo';
import { SupportTokenRepository } from '../database/support-token.repo';
import { GameType, Match, SupportToken } from '../generated/enum.types';
import { SecretMissingError } from '../config/error';

type GameConfig = Pick<
  Match,
  'game_type' |
  'individual_wage_amount' |
  'individual_trade_amount'
> & {
  token: SupportToken
}

class MatchNotExistsError extends Error {
  public message = 'Match does not exists'
}

const MATCH_QUEUE_ITEM_TTL_S = 1 * 60;

@Injectable()
export class MatchSearchService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(MatchSearchService.name);
  private redis: RedisClientType;

  constructor(
    private readonly config: ConfigService,
    private readonly user: UserRepository,
    private readonly match: MatchRepository,
    private readonly matchInvite: MatchParticipantRepository,
    private readonly supportToken: SupportTokenRepository
  ) {
    this.redis = createClient({
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
      username: process.env.REDIS_USERNAME as string,
      password: process.env.REDIS_PASSWORD as string,
    });
  }

  public async getDefaultGameConfig(): Promise<GameConfig> {
    const defaultTokenName = this.config.get<string>('game.defaultTokenName');
    const defaultWageAmount = this.config.get<number>('game.defaultWageAmount');
    const defaultTradeAmount = this.config.get<number>('game.defaultTradeAmount');
    if (!defaultTokenName) throw new SecretMissingError('game.defaultTokenName')
    if (!defaultWageAmount) throw new SecretMissingError('game.defaultWageAmount')
    if (!defaultTradeAmount) throw new SecretMissingError('game.defaultTradeAmount')
    const usdc = await this.supportToken.findOneByName(defaultTokenName);
    return {
      game_type: 'one_vs_one',
      token: usdc,
      individual_wage_amount: defaultWageAmount,
      individual_trade_amount: defaultTradeAmount,
    }
  }

  public async onModuleInit() {
    await this.redis.connect()
    await this.createMatchQueueSearchIndex().catch((error) => this.logger.error(error))
    this.redis.on(AppEvents.MatchQueueUserAdded, this.userEnteredMatchQueue.bind(this))
  }

  public onModuleDestroy() {
    this.redis.off(AppEvents.MatchQueueUserAdded, this.userEnteredMatchQueue.bind(this))
  }

  private async createMatchQueueSearchIndex() {
    // TODO: dev only should remove on staging / production
    await this.redis.ft.dropIndex('idx:match_queue');
    return this.redis.ft.create('idx:match_queue', {
      '$.game_type': {
        type: SchemaFieldTypes.TEXT,
      },
      '$.token': {
        type: SchemaFieldTypes.TEXT,
      },
      '$.wage_amount': {
        type: SchemaFieldTypes.NUMERIC,
      },
      '$.trade_amount': {
        type: SchemaFieldTypes.NUMERIC,
      }
    }, {
      ON: 'JSON',
    });
  }

  private getMatchQueueItemKey(inputs: {
    pubkey: PublicKey,
  }) {
    return `match_queue:${inputs.pubkey.toBase58()}`;
  }

  private getMatchQueueKeys() {
    const cursor = 0
    return this.redis.scan(cursor, { MATCH: 'match_queue:*' })
  }

  private async userEnteredMatchQueue(inputs: {
    pubkey: PublicKey,
    gameType: GameType,
    token: string,
    wageAmount: number,
    tradeAmount: number
  }) {

    try {
      // TODO: Return all objects for now, because search isn't working properly
      const results = await this.redis.ft.search('idx:match_queue', `*`, {
        LIMIT: {
          from: 0,
          size: 2
        }
      })

      if (results.total < 2) return;

      // Remove keys from queue
      await this.redis.del(results.documents.map(item => item.id))

      console.log('enter queue', inputs)
      // Create a match
      const match = await this.match.create({
        gameType: inputs.gameType,
        token: inputs.token,
        individualWageAmount: inputs.wageAmount,
        individualTradeAmount: inputs.tradeAmount
      })

      // Create invites
      await Promise.all(results.documents.map(async item => {
        if (!item.value.pubkey) {
          throw new Error("Invalid pubkey")
        }
        const invite = await this.matchInvite.create({
          matchId: match.id,
          pubkey: new PublicKey(item.value.pubkey)
        })

        const user = await this.user.findById(invite.user_id)

        return {
          id: invite.id,
          pubkey: user.pubkey
        }
      }));

      this.logger.log(`Match found, invites created`);
    } catch (e) {
      this.logger.error(`Failed to create match: ${JSON.stringify({ error: e })}`)
      throw e;
    }
  }

  public async enterQueue(inputs: {
    pubkey: PublicKey,
    token: string;
    gameType: GameType
    wageAmount: number;
    tradeAmount: number
  }) {
    const key = this.getMatchQueueItemKey({
      pubkey: inputs.pubkey
    });
    const metadata = {
      pubkey: inputs.pubkey.toBase58(),
      game_type: inputs.gameType,
      token: inputs.token,
      wage_amount: inputs.wageAmount,
      trade_amount: inputs.tradeAmount,
      created_at: Date.now()
    };
    await this.redis.json.set(key, '$', metadata).catch(console.error);
    await this.redis.expire(key, MATCH_QUEUE_ITEM_TTL_S);
    const { keys } = await this.getMatchQueueKeys()
    const queuePosition = keys.length;

    this.logger.log(`User added to queue: ${inputs.pubkey.toBase58()} at position ${queuePosition}`)

    this.redis.emit(AppEvents.MatchQueueUserAdded, {
      pubkey: inputs.pubkey.toBase58(),
      gameType: inputs.gameType,
      token: inputs.token,
      wageAmount: inputs.wageAmount,
      tradeAmount: inputs.tradeAmount,
    })

    return {
      position: keys.length
    }
  }

  public async leaveQueue(inputs: {
    requestedBy: PublicKey,
  }) {
    const key = this.getMatchQueueItemKey({
      pubkey: inputs.requestedBy
    });
    const metadata = await this.redis.json.type(key)
    if (!metadata) {
      throw new MatchNotExistsError();
    }
    await this.redis.del(key)
  }
}
