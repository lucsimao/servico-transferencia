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
      const transferParam = httpRequest.body as CreateTransferParams;
      const transfer = await this.createTransfer.create(transferParam);
      const result = {
        statusCode: httpStatusCodes.CREATED,
        body: transfer,
      };

      return result;
    } catch (error) {
      return {
        statusCode: httpStatusCodes.INTERNAL_SERVER_ERROR,
        body: { message: error },
      };
    }
  }
}
