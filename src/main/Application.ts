import {} from './middlewares/ErrorMiddleware';

import { Application, Router } from 'express';
import {
  BodyParserMiddleware,
  CorsMiddleware,
  ErrorMiddleware,
  RateLimitMiddleware,
} from './middlewares';
import { SwaggerUiRoutes, TransferRoutes } from './routes';

import { Logger } from '../infra/interfaces/logger/Logger';
import { Server } from 'http';

export default class App {
  private server: Server | undefined;

  constructor(
    private readonly port: number,
    private readonly app: Application,
    private readonly logger: Logger
  ) {}

  public start(): void {
    this.logger.info({ msg: `Starting server on port ${this.port}...` });

    this.server = this.app.listen(this.port, () => {
      this.logger.info({ msg: `Server listening on port ${this.port}` });
    });
  }

  public async setup(): Promise<void> {
    this.logger.info({ msg: 'Starting application setup...' });

    this.setupMiddlewares();
    this.setupRoutes();
    this.setupErrorMiddleware();

    this.logger.info({ msg: 'Finished application setup' });
  }

  private setupMiddlewares(): void {
    this.logger.info({ msg: 'Starting middlewares setup...' });

    const middleware = [
      BodyParserMiddleware.getMiddleware(),
      CorsMiddleware.getMiddleware(),
      RateLimitMiddleware.getMiddleware(),
    ];

    this.app.use(middleware);

    this.logger.info({ msg: 'Finished middlewares setup' });
  }

  private setupRoutes(): void {
    this.logger.info({ msg: 'Starting routes setup...' });

    const router = Router();
    this.app.use('/api', router);
    TransferRoutes.setRoutes(router);
    SwaggerUiRoutes.setRoutes(router);

    this.logger.info({ msg: 'Finished routes setup' });
  }

  private setupErrorMiddleware(): void {
    this.logger.info({ msg: 'Starting error middlewares setup...' });

    const middleware = [ErrorMiddleware.getMiddleware()];
    this.app.use(middleware);

    this.logger.info({ msg: 'Finished error middlewares setup' });
  }

  public async close(): Promise<void> {
    this.logger.info({ msg: 'Closing application...' });

    await this.server?.close();

    this.logger.info({ msg: 'Application Closed' });
  }

  public getApp(): Application {
    return this.app;
  }
}
