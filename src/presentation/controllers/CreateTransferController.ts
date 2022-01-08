import { ApiHttpRequest, ApiHttpResponse } from './../interfaces/';

import { Controller } from './../interfaces/Controller';
import { CreateTransfer } from '../../domain/use-cases/CreateTransfer';
import { CreateTransferParams } from './../../domain/use-cases/CreateTransfer';
import { CreateTransferValidator } from '../interfaces/CreateTransferValidator';
import { ErrorHelper } from '../helpers/ErrorHelper';
import { TransferModel } from './../../domain/models/TransferModel';
import { created } from '../helpers/httpHelpers';

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
      return ErrorHelper.format(error as Error);
    }
  }
}
