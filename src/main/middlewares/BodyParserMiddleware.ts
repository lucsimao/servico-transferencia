import { RequestHandler, json } from 'express';

export class BodyParserMiddleware {
  public static getMiddleware(): RequestHandler {
    return json();
  }
}
