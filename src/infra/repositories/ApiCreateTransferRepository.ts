import { CreateTransferParams } from '../../domain/use-cases/CreateTransfer';
import { CreateTransferRepository } from '../../data/interfaces';
import { HttpClient } from '../interfaces';
import { TransferModel } from '../../domain/models/TransferModel';

declare type CreateTransferResponse = Pick<
  TransferModel,
  'externalId' | 'status'
>;
export class ApiCreateTransferRepository implements CreateTransferRepository {
  constructor(
    private readonly uri: string,
    private readonly httpClient: HttpClient
  ) {}

  public async create(
    createTransferParams: CreateTransferParams
  ): Promise<Pick<TransferModel, 'externalId' | 'status'>> {
    const options = {
      body: createTransferParams,
    };

    const uri = this.uri + '/paymentOrders';

    const response = await this.httpClient.post<
      CreateTransferParams,
      CreateTransferResponse
    >(uri, options);
    const result = response.body;

    return result;
  }
}
