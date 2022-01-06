import * as models from '../../domain/models/TransferModel';

import { PrismaClient, Transfer } from '@prisma/client';

import { DbClient } from '../interfaces/DbClient';

export class PrismaAdapter implements DbClient<models.TransferModel> {
  constructor(private readonly prisma: PrismaClient) {}

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
    transfer: Partial<models.TransferModel>
  ): Promise<models.TransferModel> {
    const data = this.convertToPrisma(transfer);
    const dbResult = await this.prisma.transfer.create({ data });

    const result = this.convertToModel(dbResult);

    return result;
  }

  private convertToPrisma(
    transfer: Partial<models.TransferModel>
  ): Omit<Transfer, 'id'> {
    const result: Partial<Omit<Transfer, 'id'>> = {
      externalId: transfer.externalId,
      amount: transfer.amount,
      internalId: transfer.internalId,
      expectedOn: transfer.expectedOn,
      status: transfer.status,
    };

    return result as Omit<Transfer, 'id'>;
  }

  public async update(
    externalId: string,
    transfer: Partial<models.TransferModel>
  ): Promise<models.TransferModel> {
    const data = this.convertToPrisma(transfer);
    const dbResult = await this.prisma.transfer.update({
      where: { externalId },
      data,
    });

    const result = this.convertToModel(dbResult);

    return result;
  }
}
