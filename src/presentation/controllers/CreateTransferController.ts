import { CreateTransfer } from '../../domain/use-cases/CreateTransfer';
import { HttpRequest } from '../interfaces/HttpRequest';
import { HttpResponse } from '../interfaces/HttpResponse';
import { TransferModel } from '../../domain/models/TransferModel';

export class CreateTransferController {
  constructor(private readonly createTransfer: CreateTransfer) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const transfer = httpRequest.body as TransferModel;
    await this.createTransfer.create(transfer);

    return {
      statusCode: 500,
      body: { message: 'Internal server error' },
    };
  }
}
