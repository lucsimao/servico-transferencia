import { Request, Response, Router } from 'express';

export class TransferRoutes {
  public static setRoutes(router: Router): void {
    router.post('/transfer', (req: Request, res: Response) => {
      res.send('any');
    });
  }
}
