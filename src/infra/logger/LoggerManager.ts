import { Logger, LoggerParams } from './../../data/interfaces';

export class LoggerManager implements Logger {
  private loggers: Logger[];

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

  public getLoggers(): Logger[] {
    return [...this.loggers];
  }
}
