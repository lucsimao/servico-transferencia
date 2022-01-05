import { CreateTransferParams } from '../../domain/use-cases/CreateTransfer';
import { CreateTransferRepository } from '../../data/interfaces/repositories/CreateTransferRepository';
import { HttpClient } from '../../data/interfaces';
import { TransferModel } from '../../domain/models/TransferModel';

export class ApiCreateTransferRepository implements CreateTransferRepository {
  constructor(
    private readonly uri: string,
    private readonly httpClient: HttpClient
  ) {}

  public async create(
    createTransferParams: CreateTransferParams
  ): Promise<TransferModel> {
    const options = {
      body: createTransferParams,
    };

    const uri = this.uri + '/paymentOrders';

    const response = await this.httpClient.post<
      CreateTransferParams,
      TransferModel
    >(uri, options);
    const result = response.body;

    return result;
  }
}
