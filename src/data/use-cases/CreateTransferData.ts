import {
  CreateTransfer,
  CreateTransferParams,
} from './../../domain/use-cases/CreateTransfer';

import { DateHelper } from './../helpers/DateHelper';
import { ExpiredTransferError } from './../../presentation/errors/ExpiredTransferError';
import { HttpClient } from './../interfaces/HttpClient';
import { TransferModel } from '../../domain/models/TransferModel';

export class CreateTransferData implements CreateTransfer {
  constructor(
    private readonly uri: string,
    private readonly httpClient: HttpClient
  ) {}

  public async create(
    createTransferParams: CreateTransferParams
  ): Promise<TransferModel> {
    const { dueDate, ...params } = createTransferParams;
    if (dueDate && DateHelper.isDateOverdue(dueDate)) {
      throw new ExpiredTransferError();
    }

    const options = {
      body: params,
    };

    const uri = this.uri + '/paymentOrders';

    const result = await this.httpClient.post<
      CreateTransferParams,
      TransferModel
    >(uri, options);

    return result.body;
  }
}
