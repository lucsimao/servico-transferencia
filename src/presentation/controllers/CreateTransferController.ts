import {
  CreateTransfer,
  CreateTransferParams,
} from '../../domain/use-cases/CreateTransfer';

import { HttpRequest } from '../interfaces/HttpRequest';
import { HttpResponse } from '../interfaces/HttpResponse';
import httpStatusCodes from 'http-status-codes';

export class CreateTransferController {
  constructor(private readonly createTransfer: CreateTransfer) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const transfer = httpRequest.body as CreateTransferParams;
      await this.createTransfer.create(transfer);

      return {
        statusCode: 500,
        body: { message: 'Internal server error' },
      };
    } catch (error) {
      return {
        statusCode: httpStatusCodes.INTERNAL_SERVER_ERROR,
        body: { message: error },
      };
    }
  }
}
