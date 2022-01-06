import { DbClient } from '../interfaces/DbClient';
import { PersistenceTransferRepository } from 'src/data/interfaces';
import { TransferModel } from '../../domain/models/TransferModel';

export class DatabaseGetTransferRepository
  implements PersistenceTransferRepository
{
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
