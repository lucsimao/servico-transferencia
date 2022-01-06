import { CreateTransferParams } from './../../../domain/use-cases/CreateTransfer';
import { TransferModel } from './../../../domain/models/TransferModel';
export interface CreateTransferRepository {
  create(
    createTransferParams: CreateTransferParams
  ): Promise<Pick<TransferModel, 'externalId' | 'status'>>;
}
