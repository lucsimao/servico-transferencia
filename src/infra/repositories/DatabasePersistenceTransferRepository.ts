import { DbClient } from '../interfaces/DbClient';
import { PersistenceTransferRepository } from 'src/data/interfaces/repositories/PersistenceTransferRepository';
import { TransferModel } from '../../domain/models/TransferModel';

export class ApiGetTransferRepository implements PersistenceTransferRepository {
  constructor(private readonly dbClient: DbClient<TransferModel>) {}

  public async find(externalId: string): Promise<TransferModel> {
    const result = await this.dbClient.find(externalId);

    return result;
  }

  public async save(transfer: Partial<TransferModel>): Promise<TransferModel> {
    const result = await this.dbClient.save(transfer);

    return result;
  }
}
