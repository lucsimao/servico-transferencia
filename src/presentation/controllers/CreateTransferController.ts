import { ApiHttpRequest, ApiHttpResponse } from './../interfaces/';
import {
  badRequest,
  created,
  internalServerError,
} from '../helpers/httpHelpers';

import { CreateTransfer } from '../../domain/use-cases/CreateTransfer';
import { CreateTransferParams } from './../../domain/use-cases/CreateTransfer';
import { ExpiredTransferError } from '../errors/ExpiredTransferError';
import { TransferModel } from './../../domain/models/TransferModel';

export class CreateTransferController {
  constructor(private readonly createTransfer: CreateTransfer) {}

  async handle(
    apiHttpRequest: ApiHttpRequest<CreateTransferParams>
  ): Promise<ApiHttpResponse<TransferModel | Error>> {
    try {
      const transferParam = apiHttpRequest.body as CreateTransferParams;
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
