import { Application, Router } from 'express';
import { BodyParserMiddleware, CorsMiddleware } from './middlewares';

import { Logger } from '../data/interfaces';
import { Server } from 'http';
import { TransferRoutes } from './routes/TransferRoutes';

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

    this.logger.info({ msg: 'Finished application setup' });
  }

  private setupMiddlewares(): void {
    this.logger.info({ msg: 'Starting middlewares setup...' });

    this.app.use(BodyParserMiddleware.getMiddleware());
    this.app.use(CorsMiddleware.getMiddleware());

    this.logger.info({ msg: 'Finished middlewares setup' });
  }

  private setupRoutes(): void {
    this.logger.info({ msg: 'Starting routes setup...' });

    const router = Router();
    this.app.use('/api', router);
    TransferRoutes.setRoutes(router);

    this.logger.info({ msg: 'Finished routes setup' });
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
