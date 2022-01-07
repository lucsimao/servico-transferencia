import { ApiHttpRequest, ApiHttpResponse } from './../interfaces/';
import {
  badRequest,
  created,
  internalServerError,
} from '../helpers/httpHelpers';

import { Controller } from './../interfaces/Controller';
import { CreateTransfer } from '../../domain/use-cases/CreateTransfer';
import { CreateTransferParams } from './../../domain/use-cases/CreateTransfer';
import { CreateTransferValidator } from '../interfaces/CreateTransferValidator';
import { ExpiredTransferError } from '../../data/errors/ExpiredTransferError';
import { TransferModel } from './../../domain/models/TransferModel';

export class CreateTransferController
  implements Controller<CreateTransferParams, TransferModel>
{
  constructor(
    private readonly createTransfer: CreateTransfer,
    private readonly createTransferValidator: CreateTransferValidator
  ) {}

  async handle(
    apiHttpRequest: ApiHttpRequest<CreateTransferParams>
  ): Promise<ApiHttpResponse<TransferModel | Error>> {
    try {
      const transferParam = apiHttpRequest.body;

      this.createTransferValidator.validate(transferParam);

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
