import { LoggerManager } from './../../infra/logger/LoggerManager';

export class LoggerFactory {
  public static create() {
    return new LoggerManager();
  }
}
