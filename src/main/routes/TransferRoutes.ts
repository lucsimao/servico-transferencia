import { CreateTransferControllerFactory } from '../factories/CreateTransferControllerFactory';
import { ExpressRouteAdapter } from '../../main/adapters/ExpressRouteAdapter';
import { Router } from 'express';

export class TransferRoutes {
  public static setRoutes(router: Router): void {
    const controller = CreateTransferControllerFactory.create();
    const route = ExpressRouteAdapter.adapt(controller);
    router.post('/transfer', route);
  }
}
