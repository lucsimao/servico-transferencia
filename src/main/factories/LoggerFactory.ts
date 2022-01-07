import { LoggerManager } from './../../infra/logger/LoggerManager';
import PinoAdapter from '../../infra/adapters/logger/PinoAdapter';

export class LoggerFactory {
  public static create() {
    const pinoAdapter = new PinoAdapter();
    return new LoggerManager(pinoAdapter);
  }
}
