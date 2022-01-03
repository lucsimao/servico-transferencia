import {
  badRequest,
  created,
  internalServerError,
} from '../helpers/httpHelpers';

import { CreateTransfer } from '../../domain/use-cases/CreateTransfer';
import { CreateTransferParams } from './../../domain/use-cases/CreateTransfer';
import { ExpiredTransferError } from '../errors/ExpiredTransferError';
import { HttpRequest } from '../interfaces/HttpRequest';
import { HttpResponse } from '../interfaces/HttpResponse';
import { TransferModel } from './../../domain/models/TransferModel';

export class CreateTransferController {
  constructor(private readonly createTransfer: CreateTransfer) {}

  async handle(
    httpRequest: HttpRequest<CreateTransferParams>
  ): Promise<HttpResponse<TransferModel | Error>> {
    try {
      const transferParam = httpRequest.body as CreateTransferParams;
      const result = await this.createTransfer.create(transferParam);

      return created(result);
    } catch (error) {
      if (error instanceof ExpiredTransferError) {
        return badRequest(error);
      }

      return internalServerError(error as Error);
    }
  }
}
