import { TransferStatusEnum } from '../enums/TransferStatusEnum';

export interface TransferModel {
  internalId: string;
  externalId: string;
  status: TransferStatusEnum;
  amount: number;
  expectedOn: Date;
}
