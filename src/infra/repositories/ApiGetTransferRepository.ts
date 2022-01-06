import { GetTransferRepository } from 'src/data/interfaces';
import { HttpClient } from '../interfaces';
import { TransferModel } from '../../domain/models/TransferModel';

export class ApiGetTransferRepository implements GetTransferRepository {
  constructor(
    private readonly uri: string,
    private readonly httpClient: HttpClient
  ) {}

  public async get(externalId: string): Promise<TransferModel> {
    const options = {
      headers: {},
    };
    const uri = this.uri + '/paymentOrders/' + externalId;
    const response = await this.httpClient.get<TransferModel>(uri, options);

    const result = response.body;

    return result;
  }
}
