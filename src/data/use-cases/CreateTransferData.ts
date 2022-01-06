import {
  CreateTransfer,
  CreateTransferParams,
} from './../../domain/use-cases/CreateTransfer';

import { CreateTransferRepository } from '../interfaces/repositories/CreateTransferRepository';
import { DateHelper } from './../helpers/DateHelper';
import { ExpiredTransferError } from '../errors/ExpiredTransferError';
import { GetTransferRepository } from '../interfaces/repositories/GetTransferRepository';
import { TransferModel } from '../../domain/models/TransferModel';

export class CreateTransferData implements CreateTransfer {
  constructor(
    private createTransferRepository: CreateTransferRepository,
    private getTransferRepository: GetTransferRepository
  ) {}

  public async create(
    createTransferParams: CreateTransferParams
  ): Promise<TransferModel> {
    const { dueDate, ...params } = createTransferParams;
    if (dueDate && DateHelper.isDateOverdue(dueDate)) {
      throw new ExpiredTransferError();
    }

    const { externalId } = await this.createTransferRepository.create(params);
    const result = await this.getTransferRepository.get(externalId);

    return result;
  }
}
