import { DbClient } from '../interfaces/DbClient';
import { PersistenceTransferRepository } from '../../data/interfaces';
import { TransferModel } from '../../domain/models/TransferModel';

export class DatabasePersistenceTransferRepository
  implements PersistenceTransferRepository
{
  constructor(private readonly dbClient: DbClient<TransferModel>) {}

  public async find(externalId: number): Promise<TransferModel> {
    const result = await this.dbClient.find(externalId);

    return result;
  }

  public async save(transfer: Partial<TransferModel>): Promise<TransferModel> {
    const result = await this.dbClient.save(transfer);

    return result;
  }

  public async update(
    externalId: number,
    transfer: Partial<TransferModel>
  ): Promise<TransferModel> {
    const result = await this.dbClient.update(externalId, transfer);

    return result;
  }
}
