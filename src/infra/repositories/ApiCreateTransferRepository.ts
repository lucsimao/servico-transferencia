import { CreateTransferParams } from '../../domain/use-cases/CreateTransfer';
import { CreateTransferRepository } from '../../data/interfaces';
import { DateHelper } from '../../data/helpers/DateHelper';
import { HttpClient } from '../interfaces';
import { TransferModel } from '../../domain/models/TransferModel';

interface ApiTransferParams {
  externalId: string;
  amount: number;
  expectedOn: string;
}
export class ApiCreateTransferRepository implements CreateTransferRepository {
  constructor(
    private readonly uri: string,
    private readonly httpClient: HttpClient
  ) {}

  public async create(
    createTransferParams: CreateTransferParams
  ): Promise<Pick<TransferModel, 'internalId' | 'status'>> {
    const options = {
      body: this.convertToApiTransferParams(createTransferParams),
    };

    const uri = this.uri + '/paymentOrders';

    const response = await this.httpClient.post<
      ApiTransferParams,
      Pick<TransferModel, 'internalId' | 'status'>
    >(uri, options);
    const result = response.body;

    return result;
  }

  private convertToApiTransferParams(
    param: CreateTransferParams
  ): ApiTransferParams {
    return {
      externalId: param.externalId,
      amount: param.amount * 100,
      expectedOn: DateHelper.formatDate(param.expectedOn || new Date()),
    };
  }
}
