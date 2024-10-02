
import { Injectable, Logger } from '@nestjs/common';
import { observable } from '@trpc/server/observable';
import { PublicKey } from '@solana/web3.js';

import { TrpcService } from '../trpc.service';
import { UserRepository } from '../../database/user.repo';
import { MatchSearchService } from '../../match/match-search.service';
import { RedisService } from '../../database/redis.service';
import { AppEvents, AppEventsMap } from '../../events/events';
import { MatchRepository } from '../../database/match.repo';
import { MatchInviteRepository } from '../../database/match-invite.repo';
import { MatchInviteState } from '../../generated/enum.types';
import { MatchService } from '../../match/match.service';

@Injectable()
export class MatchRouter {
  private readonly logger = new Logger(MatchRouter.name);

  constructor(
    private readonly trpc: TrpcService,
    private readonly user: UserRepository,
    private readonly match: MatchRepository,
    private readonly matchInvite: MatchInviteRepository,
    private readonly matchSearch: MatchSearchService,
    private readonly matchService: MatchService,
    private readonly redis: RedisService
  ) { }

  public router = this.trpc.router({
    // TODO: Find a match for user, if existing match is on going, return an error
    enterQueue: this.trpc.protectedProcedure.mutation(async ({ ctx }) => {
      const queueIndex = await this.matchSearch.enterQueue({
        pubkey: ctx.user.pubkey,
        gameType: 'one_vs_one'
      })
      return {
        position: queueIndex
      }
    }),
    leaveQueue: this.trpc.protectedProcedure.mutation(async ({ ctx }) => {
      return this.matchSearch.leaveQueue({ requestedBy: ctx.user.pubkey })
    }),
    watch: this.trpc.procedure.subscription(() => {
      return observable<AppEventsMap['match_queue::invite_sent']>((emit) => {
        const listener = (payload: AppEventsMap['match_queue::invite_sent']) => {
          this.logger.log(`match_queue::user_added event received: ${JSON.stringify(payload)}`)
          emit.next(payload)
        }
        this.redis.on(AppEvents.MatchQueueInviteSent, listener)
        return () => {
          this.redis.off(AppEvents.MatchQueueInviteSent, listener)
        };
      });
    }),
    activeMatch: this.trpc.protectedProcedure.query(async ({ ctx }) => {
      const activeMatchResult = await this.matchService.findActiveMatchByUserId(ctx.user.id)
      if (!activeMatchResult?.match) return null
      
      const opponentInvite = (await this.matchInvite
        .findInvitesByMatch(activeMatchResult.match.id))
        .find(invite => invite.user_id !== ctx.user.id)

      if (!opponentInvite) throw new Error('Unable to find oppoent invite')

      const opponent = await this.user.findById(opponentInvite.user_id);

      return {
        match: activeMatchResult.match,
        invite: activeMatchResult.activeInvite,
        opponent: {
          id: opponent.id,
          pubkey: opponent.pubkey
        }
      }
    }),
    randomNumber: this.trpc.procedure.subscription(() => {
      return observable<{
        randomNumber: number,
        counter: number
      }>((emit) => {
        let counter = 0
        const timer = setInterval(() => {
          // emits a number every second
          emit.next({
            randomNumber: Math.floor(Math.random() * 100),
            counter
          });
          counter++;
        }, 200);
        return () => {
          clearInterval(timer);
        };
      });
    }),
    // TODO: Creat temp wallet by provide deposit
    join: this.trpc.protectedProcedure.query(({ ctx }) => ({

    }))
  });
}
