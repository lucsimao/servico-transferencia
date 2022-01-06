import { CreateTransferParams } from '../../domain/use-cases/CreateTransfer';
import { CreateTransferRepository } from '../interfaces/repositories/CreateTransferRepository';
import { GetTransferRepository } from '../interfaces/repositories/GetTransferRepository';
import { HttpResponse } from 'src/infra/interfaces';
import { PersistenceTransferRepository } from '../interfaces/repositories/PersistenceTransferRepository';
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

export const makePersistenceTransferRepositoryStub =
  (): jest.Mocked<PersistenceTransferRepository> => ({
    save: jest.fn(),
    find: jest.fn(),
  });

export const makeFakeTransferDataParams = (): CreateTransferParams => ({
  externalId: 'any_external_id',
  amount: 999,
  expectedOn: new Date('03/01/2022'),
});

export const makeFakeCreateTransferResponse = (): Pick<
  TransferModel,
  'externalId' | 'status'
> => ({
  externalId: 'any_external_id',
  status: 'APPROVED',
});

export const makeFakeTransferModel = (): TransferModel => ({
  internalId: 'any_internal_id',
  externalId: 'any_external_id',
  amount: 999,
  expectedOn: new Date('03/01/2022'),
  status: 'CREATED',
});
