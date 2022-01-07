import { TransferModel } from '../../../domain/models/TransferModel';

export interface PersistenceTransferRepository {
  save(transfer: Partial<TransferModel>): Promise<TransferModel>;
  find(externalId: number): Promise<TransferModel>;
  update(
    externalId: number,
    transfer: Partial<TransferModel>
  ): Promise<TransferModel>;
}
