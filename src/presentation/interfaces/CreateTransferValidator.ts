import { CreateTransferParams } from '../../domain/use-cases/CreateTransfer';

export interface CreateTransferValidator {
  validate(createTransferParams: CreateTransferParams): CreateTransferParams;
}
