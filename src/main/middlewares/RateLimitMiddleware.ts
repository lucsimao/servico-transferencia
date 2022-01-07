import { NextFunction, Request, RequestHandler, Response } from 'express';

import Env from '../config/Env';
import { TooManyRequestsError } from '../errors/TooManyRequestsError';
import rateLimit from 'express-rate-limit';

export class RateLimitMiddleware {
  public static getMiddleware(): RequestHandler {
    const result = rateLimit({
      windowMs: Env.rateLimiter.ms,
      max: Env.rateLimiter.max,
      keyGenerator: this.getKeyGenerator(),
      handler: this.getHandler(),
    });

    return result;
  }

  private static getKeyGenerator() {
    const result = (req: Request): string => {
      return req.ip;
    };
    return result;
  }

  private static getHandler() {
    const result = (
      _req: Request,
      _res: Response,
      next: NextFunction
    ): void => {
      next(new TooManyRequestsError());
    };

    return result;
  }
}
