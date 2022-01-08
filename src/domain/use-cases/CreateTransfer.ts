import { TransferModel } from '../models/TransferModel';

export interface CreateTransferParams {
  externalId: string;
  amount: number;
  expectedOn?: Date;
}

export interface CreateTransfer {
  create(
    params: Omit<CreateTransferParams, 'externalId'>
  ): Promise<TransferModel>;
}
