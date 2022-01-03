import {
  CreateTransfer,
  CreateTransferParams,
} from './../../domain/use-cases/CreateTransfer';

import { HttpClient } from './../interfaces/HttpClient';
import { TransferModel } from '../../domain/models/TransferModel';

export class CreateTransferData implements CreateTransfer {
  constructor(private readonly httpClient: HttpClient) {}

  public async create(params: CreateTransferParams): Promise<TransferModel> {
    await this.httpClient.post('any_url', params);
    return {} as TransferModel;
  }
}
