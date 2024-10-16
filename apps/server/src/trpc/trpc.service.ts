import { Injectable } from '@nestjs/common';
import { PublicKey } from '@solana/web3.js';
import { initTRPC, TRPCError } from '@trpc/server';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';

import { JwtService } from '../auth/jwt.service';
import { UserRepository } from '../database/user.repo';
import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';

export interface TrpcContext {
  user?: {
    id: string;
    pubkey: PublicKey;
    walletKeypair: Keypair;
  };
}

@Injectable()
export class TrpcService {

  public trpc = initTRPC.context<TrpcContext>().create();
  public procedure = this.trpc.procedure;
  public router = this.trpc.router;
  public mergeRouters = this.trpc.mergeRouters;

  constructor(
    private readonly jwt: JwtService,
    private readonly user: UserRepository
  ) { }

  public async getAuthContext(inputs: {
    jwt: JwtService,
    userRepo: UserRepository,
    token: string | undefined
  }): Promise<TrpcContext> {
    try {
      const { token, jwt, userRepo } = inputs
      if (!token || !jwt.verifyToken(token)) {
        throw new Error('Invalid auth token')
      }

      const decoded = jwt.decode(token)
      const wallet = new PublicKey(decoded.walletAddress)
      const user = await userRepo.findByPubkey(wallet)
      if (!user.pubkey) throw new Error('Invalid wallet pubkey')
      return {
        user: {
          id: user.id,
          pubkey: new PublicKey(user.pubkey),
          walletKeypair: Keypair.fromSecretKey(bs58.decode(user.wallet_private_key))
        }
      }
    } catch {
      return {
        user: undefined
      }
    }
  }

  public async createExpressContext(opts: CreateExpressContextOptions): Promise<TrpcContext> {
    const authorization = opts.req.headers.authorization;
    const token = authorization?.replace('Bearer', '').trim()
    const context = await this.getAuthContext({
      token,
      jwt: this.jwt,
      userRepo: this.user
    })
    return context;
  }

  public protectedProcedure = this.trpc.procedure.use(
    async (
      opts,
    ) => {
      const { ctx } = opts;
      if (!ctx.user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }
      return opts.next({
        ctx: {
          user: ctx.user,
        },
      });
    }
  );
}
