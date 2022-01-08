import { Request, Response } from 'express';

import { ErrorHelper } from '../../presentation/helpers/ErrorHelper';

export class ErrorMiddleware {
  public static getMiddleware() {
    return (error: Error, _req: Request, res: Response): void => {
      const response = ErrorHelper.format(error);
      res.status(response.statusCode).send(response.body);
    };
  }
}
