import App from '../../src/main/Application';
import { CreateTransferParams } from '../../src/domain/use-cases/CreateTransfer';
import Env from '../../src/main/config/Env';
import { Logger } from './../../src/data/interfaces/logger/Logger';
import { TransferModel } from './../../src/domain/models/TransferModel';
import { TransferRoutes } from './../../src/main/routes/TransferRoutes';
import { TransferStatusEnum } from './../../src/domain/enums/TransferStatusEnum';
import express from 'express';
import nock from 'nock';
import request from 'supertest';

const makeFakeTransferModel = (): TransferModel => ({
  internalId: 'any_internal_id',
  externalId: 'any_external_id',
  amount: 999,
  expectedOn: new Date(),
  status: TransferStatusEnum.CREATED,
});

const mockApiReturn = (value: TransferModel) => {
  nock.cleanAll();
  nock(Env.servicesAddress.paymentOrders)
    .post('/paymentOrders')
    .reply(200, value);
};

const makeLoggerStub = (): jest.Mocked<Logger> => ({
  info: jest.fn(),
  warning: jest.fn(),
  error: jest.fn(),
});

const makeSut = () => {
  const expressStub = express();
  const loggerStub = makeLoggerStub();
  const sut = new App(3000, expressStub, loggerStub);
  mockApiReturn(makeFakeTransferModel());
  sut.setup();

  return { sut };
};

describe(TransferRoutes.name, () => {
  test('Should return an Transfer on success', async () => {
    const { sut } = makeSut();
    const app = sut.getApp();
    const param: CreateTransferParams = {
      externalId: 'string',
      amount: 1000,
      expectedOn: new Date(),
      dueDate: new Date(),
    };

    await request(app).post('/api/transfer').send(param).expect(201);
  });
});
