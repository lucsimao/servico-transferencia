import {
  CreateTransferRepository,
  GetTransferRepository,
  PersistenceTransferRepository,
} from '../interfaces';

import { CreateTransferParams } from '../../domain/use-cases/CreateTransfer';
import { DateHelper } from '../helpers/DateHelper';
import { HttpResponse } from 'src/infra/interfaces';
import { TransferModel } from '../../domain/models/TransferModel';

export const makeFakeHttpResponse = (data: unknown): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const makeCreateTransferRepositoryStub =
  (): jest.Mocked<CreateTransferRepository> => ({
    create: jest.fn().mockReturnValue(makeFakeCreateTransferResponse()),
  });

export const makeGetTransferRepositoryStub =
  (): jest.Mocked<GetTransferRepository> => ({
    get: jest.fn().mockReturnValue(makeFakeTransferModel()),
  });

export const makePersistenceTransferRepository =
  (): jest.Mocked<PersistenceTransferRepository> => ({
    find: jest.fn().mockResolvedValue(makeFakeTransferModel()),
    save: jest.fn().mockResolvedValue(makeFakeTransferModel()),
    update: jest.fn().mockResolvedValue(makeFakeTransferModel()),
  });

export const makeFakeTransferDataParams = (): CreateTransferParams => ({
  externalId: 'any_external_id',
  amount: 999,
});

export const makeFakeCreateTransferResponse = (): Pick<
  TransferModel,
  'internalId' | 'status'
> => ({
  internalId: 'any_internal_id',
  status: 'APPROVED',
});

export const makeFakeTransferModel = (): TransferModel => ({
  internalId: 'any_internal_id',
  externalId: '2',
  amount: 999,
  expectedOn: new Date('03/01/2022'),
  status: 'CREATED',
});

export const makeFakeTransferApi = () => {
  const transferModel = makeFakeTransferDataParams();
  return {
    externalId: transferModel.externalId,
    amount: transferModel.amount * 100,
    expectedOn: DateHelper.formatDate(transferModel.expectedOn || new Date()),
  };
};

export const makeFakeExternalId = (): number => 2;
