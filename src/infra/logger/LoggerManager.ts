import { Logger, LoggerParams } from './../../data/interfaces/logger/Logger';

export class LoggerManager {
  private loggers: Logger[] = [];

  public constructor(...loggers: Logger[]) {
    this.loggers = loggers;
  }

  public info(message: LoggerParams): void {
    this.loggers.forEach((logger) => {
      logger.info(message);
    });
  }

  public warning(message: LoggerParams): void {
    this.loggers.forEach((logger) => {
      logger.warning(message);
    });
  }

  public error(message: LoggerParams): void {
    this.loggers.forEach((logger) => {
      logger.error(message);
    });
  }
}