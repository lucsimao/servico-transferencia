import { TransferModel } from './../../../domain/models/TransferModel';

export interface GetTransferRepository {
  get(externalId: string): Promise<TransferModel>;
}
