import { TransferModel } from '../models/TransferModel';

export interface CreateTransferParams {
  amount: number;
  expectedOn?: Date;
}

export interface CreateTransfer {
  create(params: CreateTransferParams): Promise<TransferModel>;
}
