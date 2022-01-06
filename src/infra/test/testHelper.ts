import { Prisma, PrismaClient } from '@prisma/client';
import {
  makeFakeHttpResponse,
  makeFakeTransferModel,
} from '../../data/test/testHelper';

import { DbClient } from '../interfaces/DbClient';
import { HttpClient } from '../interfaces';
import { Logger } from '../../data/interfaces';
import { TransferModel } from 'src/domain/models/TransferModel';

export const makeLoggerStub = (): jest.Mocked<Logger> => ({
  info: jest.fn(),
  warning: jest.fn(),
  error: jest.fn(),
});

export const makeHttpClientStub = (): jest.Mocked<HttpClient> => ({
  get: jest.fn().mockReturnValue(makeFakeHttpResponse(makeFakeTransferModel())),
  post: jest
    .fn()
    .mockReturnValue(makeFakeHttpResponse(makeFakeTransferModel())),
});

export const makeDbClientStub = (): jest.Mocked<DbClient<TransferModel>> => ({
  find: jest.fn().mockResolvedValue(makeFakeTransferModel()),
  save: jest.fn().mockResolvedValue(makeFakeTransferModel()),
  update: jest.fn().mockResolvedValue(makeFakeTransferModel()),
});

declare type TransferType = Prisma.TransferDelegate<
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
>;

export const makeTransferStub = () => {
  const result: jest.Mocked<Partial<TransferType>> = {
    findFirst: jest.fn().mockResolvedValue(makeFakeTransferModel()),
    create: jest.fn().mockResolvedValue(makeFakeTransferModel()),
    update: jest.fn().mockResolvedValue(makeFakeTransferModel()),
  };

  return result as jest.Mocked<TransferType>;
};

export const makePrismaStub = (transferStub: TransferType) => {
  const result: jest.Mocked<Partial<PrismaClient>> = {
    transfer: transferStub,
  };

  return result as jest.Mocked<PrismaClient>;
};
