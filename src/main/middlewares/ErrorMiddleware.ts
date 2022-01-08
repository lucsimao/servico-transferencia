import { NextFunction, Request, Response } from 'express';

import { ErrorHelper } from '../helpers/ErrorHelper';

export class ErrorMiddleware {
  public static getMiddleware() {
    return (
      _req: Request,
      res: Response,
      next: NextFunction,
      error: Error
    ): void => {
      const response = ErrorHelper.format(error);
      res.status(response.statusCode).send(response.body);
      next();
    };
  }
}
