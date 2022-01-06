import * as models from '../../domain/models/TransferModel';

import { PrismaClient, Transfer } from '@prisma/client';

import { DbClient } from '../interfaces/DbClient';

export class PrimaAdapter implements DbClient<models.TransferModel> {
  private readonly prisma;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async find(externalId: string): Promise<models.TransferModel> {
    const dbResult = await this.prisma.transfer.findFirst({
      where: { externalId },
    });

    if (!dbResult) {
      throw new Error('Transfer not Found');
    }

    const result = this.convertToModel(dbResult);

    return result;
  }

  private convertToModel(transfer: Transfer): models.TransferModel {
    const result: models.TransferModel = {
      externalId: transfer.externalId,
      amount: transfer.amount,
      internalId: transfer.internalId || '',
      expectedOn: transfer.expectedOn,
      status: transfer.status,
    };

    return result;
  }

  public async save(
    transfer: models.TransferModel
  ): Promise<models.TransferModel> {
    const data = this.convertToPrisma(transfer);
    const dbResult = await this.prisma.transfer.create({ data });

    const result = this.convertToModel(dbResult);

    return result;
  }

  private convertToPrisma(
    transfer: models.TransferModel
  ): Omit<Transfer, 'id'> {
    const result: Omit<Transfer, 'id'> = {
      externalId: transfer.externalId,
      amount: transfer.amount,
      internalId: transfer.internalId || '',
      expectedOn: transfer.expectedOn,
      status: transfer.status,
    };

    return result;
  }
}