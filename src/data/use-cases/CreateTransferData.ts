import {
  CreateTransfer,
  CreateTransferParams,
} from './../../domain/use-cases/CreateTransfer';

import { CreateTransferRepository } from '../interfaces/repositories/CreateTransferRepository';
import { DateHelper } from './../helpers/DateHelper';
import { ExpiredTransferError } from './../../presentation/errors/ExpiredTransferError';
import { TransferModel } from '../../domain/models/TransferModel';

export class CreateTransferData implements CreateTransfer {
  constructor(private createTransferRepository: CreateTransferRepository) {}

  public async create(
    createTransferParams: CreateTransferParams
  ): Promise<TransferModel> {
    const { dueDate, ...params } = createTransferParams;
    if (dueDate && DateHelper.isDateOverdue(dueDate)) {
      throw new ExpiredTransferError();
    }

    const result = await this.createTransferRepository.create(params);

    return result;
  }
}
