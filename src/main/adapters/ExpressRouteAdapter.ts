import { Request, Response } from 'express';

import { Controller } from '../../presentation/interfaces/Controller';

export class ExpressRouteAdapter {
  public static adapt<T, K>(controller: Controller<T, K>) {
    return async (req: Request, res: Response) => {
      const request = {
        body: req.body,
      };

      const httpResponse = await controller.handle(request);

      if (httpResponse.body instanceof Error) {
        res.status(httpResponse.statusCode).json({
          error: httpResponse.body.message,
        });
      } else {
        res.status(httpResponse.statusCode).json(httpResponse.body);
      }
    };
  }
}
