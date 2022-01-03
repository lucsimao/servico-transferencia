import {
  CreateTransfer,
  CreateTransferParams,
} from './../../domain/use-cases/CreateTransfer';

import { HttpClient } from './../interfaces/HttpClient';
import { TransferModel } from '../../domain/models/TransferModel';

export class CreateTransferData implements CreateTransfer {
  constructor(
    private readonly uri: string,
    private readonly httpClient: HttpClient
  ) {}

  public async create(params: CreateTransferParams): Promise<TransferModel> {
    const result = await this.httpClient.post<
      CreateTransferParams,
      TransferModel
    >(this.uri, params);

    return result;
  }
}
