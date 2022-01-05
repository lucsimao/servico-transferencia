import { NextFunction, Request, Response } from 'express';

export class CorsMiddleware {
  public static getMiddleware() {
    return (_req: Request, res: Response, next: NextFunction): void => {
      res.set('access-control-allow-origin', '*');
      res.set('access-control-allow-methods', '*');
      res.set('access-control-allow-headers', '*');
      next();
    };
  }
}
