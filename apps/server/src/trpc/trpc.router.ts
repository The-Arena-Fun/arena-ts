import { INestApplication, Injectable, Logger } from '@nestjs/common';
import * as trpcExpress from '@trpc/server/adapters/express';
import { z } from 'zod';

import { TrpcService } from '../trpc/trpc.service';
import { AuthRouter } from './routers/auth.router';
import { ProfileRouter } from './routers/profile.router';
import { MatchRouter } from './routers/match.router';
import { TreasuryRouter } from './routers/treasury.router';
import { MatchMessageRouter } from './routers/message.router';

@Injectable()
export class TrpcRouter {

  private readonly logger = new Logger(TrpcRouter.name);

  constructor(
    private readonly trpc: TrpcService,
    private readonly auth: AuthRouter,
    private readonly profile: ProfileRouter,
    private readonly match: MatchRouter,
    private readonly message: MatchMessageRouter,
    private readonly treasury: TreasuryRouter
  ) {
  }

  public appRouter = this.trpc.router({
    auth: this.auth.router,
    profile: this.profile.router,
    match: this.match.router,
    message: this.message.router,
    treasury: this.treasury.router
  });

  async applyMiddleware(app: INestApplication) {
    app.use(
      `/trpc`,
      trpcExpress.createExpressMiddleware({
        router: this.appRouter,
        createContext: this.trpc.createExpressContext.bind(this.trpc),
      }),
    );
  }
}

export type AppRouter = TrpcRouter[`appRouter`];

