import { CreateTransferParams } from '../../domain/use-cases/CreateTransfer';
import { CreateTransferRepository } from '../interfaces/repositories/CreateTransferRepository';
import { HttpResponse } from '../interfaces';
import { TransferModel } from '../../domain/models/TransferModel';
import { TransferStatusEnum } from '../../domain/enums/TransferStatusEnum';

export const makeFakeHttpResponse = (data: unknown): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const makeFakeCreateTransferRepositoryStub =
  (): jest.Mocked<CreateTransferRepository> => ({
    create: jest.fn(),
  });

export const makeFakeTransferDataParams = (): CreateTransferParams => ({
  externalId: 'any_external_id',
  amount: 999,
  expectedOn: new Date('03/01/2022'),
});

export const makeFakeTransferModel = (): TransferModel => ({
  internalId: 'any_internal_id',
  externalId: 'any_external_id',
  amount: 999,
  expectedOn: new Date('03/01/2022'),
  status: TransferStatusEnum.CREATED,
});
