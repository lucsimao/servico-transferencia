import { CreateTransferControllerFactory } from '../factories/CreateTransferControllerFactory';
import { ExpressRouteAdapter } from '../../main/adapters/ExpressRouteAdapter';
import { Router } from 'express';

/**
 * POST /transfer
 * @tag Transfer
 * @summary Create a transfer order
 * @description Create a transfer order in api
 * @bodyContent {TransferParam} application/json
 * @bodyRequired
 * @response 201 - The transfer has been created
 * @responseContent {TransferResponse} 201.application/json
 * @response 400 - Bad Request
 * @responseContent {Error} 400.application/json
 * @response 400 - Expired Transfer
 * @responseContent {ExpiredTransferError} 400.application/json
 * @response 429 - Too Many Request
 * @responseContent {TooManyRequestsServerError} 400.application/json
 * @response 500 - Internal Server Error
 * @responseContent {InternalServerError} 500.application/json
 */
export class TransferRoutes {
  public static setRoutes(router: Router): void {
    const controller = CreateTransferControllerFactory.create();
    const route = ExpressRouteAdapter.adapt(controller);
    router.post('/transfer', route);
  }
}
