import { TransferModel } from '../../../domain/models/TransferModel';

export interface PersistenceTransferRepository {
  save(transfer: Partial<TransferModel>): Promise<TransferModel>;
  find(externalId: string): Promise<TransferModel>;
  update(externalId: string, transfer: TransferModel): Promise<TransferModel>;
}
