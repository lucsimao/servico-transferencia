import { TransferModel } from './../../../domain/models/TransferModel';

export interface GetTransferRepository {
  get(internalId: string): Promise<TransferModel>;
}
