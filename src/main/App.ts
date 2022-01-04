import { BodyParserMiddleware, CorsMiddleware } from './middlewares';
import express, { Application } from 'express';

import Env from './config/Env';
import { LoggerFactory } from './factories/LoggerFactory';
import { Server } from 'http';

const Logger = LoggerFactory.create();

export default class App {
  private app: Application;
  private server: Server | undefined;

  constructor(private port: number = Env.app.port) {
    this.app = express();
  }

  public start(): void {
    Logger.info({ msg: `Starting server on port ${this.port}...` });
    this.server = this.app.listen(this.port, () => {
      Logger.info({ msg: `Server listening on port ${this.port}` });
    });
  }

  public async setup(): Promise<void> {
    Logger.info({ msg: 'Starting application setup...' });
    this.setupMiddlewares();
    Logger.info({ msg: 'Finished application setup' });
  }

  public setupMiddlewares(): void {
    Logger.info({ msg: 'Starting routes setup...' });
    this.app.use(BodyParserMiddleware.getMiddleware());
    this.app.use(CorsMiddleware.getMiddleware());
    Logger.info({ msg: 'Finished routes setup' });
  }

  public async close(): Promise<void> {
    Logger.info({ msg: 'Closing application...' });
    await this.server?.close();
    Logger.info({ msg: 'Application Closed' });
  }

  public getApp(): Application {
    return this.app;
  }
}
