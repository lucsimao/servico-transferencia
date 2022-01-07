import {
  CreateTransfer,
  CreateTransferParams,
} from './../../domain/use-cases/CreateTransfer';
import {
  CreateTransferRepository,
  GetTransferRepository,
  PersistenceTransferRepository,
} from '../interfaces';

import { DateHelper } from './../helpers/DateHelper';
import { ExpiredTransferError } from '../errors/ExpiredTransferError';
import { TransferModel } from '../../domain/models/TransferModel';

export class CreateTransferData implements CreateTransfer {
  constructor(
    private readonly createTransferRepository: CreateTransferRepository,
    private readonly getTransferRepository: GetTransferRepository,
    private readonly persistenceTransferRepository: PersistenceTransferRepository
  ) {}

  public async create(
    createTransferParams: CreateTransferParams
  ): Promise<TransferModel> {
    const { dueDate, ...params } = createTransferParams;
    if (dueDate && DateHelper.isDateOverdue(dueDate)) {
      throw new ExpiredTransferError();
    }

    const { externalId } = await this.persistenceTransferRepository.save(
      createTransferParams
    );
    const { internalId } = await this.createTransferRepository.create(params);
    const result = await this.getTransferRepository.get(internalId);
    await this.persistenceTransferRepository.update(Number(externalId), result);

    return result;
  }
}
