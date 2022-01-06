import App from '../../src/main/Application';
import { CreateTransferParams } from '../../src/domain/use-cases/CreateTransfer';
import Env from '../../src/main/config/Env';
import { Logger } from './../../src/data/interfaces';
import { TransferModel } from './../../src/domain/models/TransferModel';
import { TransferRoutes } from './../../src/main/routes/TransferRoutes';
import express from 'express';
import { makeFakeCreateTransferResponse } from '../../src/data/test/testHelper';
import nock from 'nock';
import request from 'supertest';

const makeFakeTransferModel = (): TransferModel => ({
  internalId: 'any_internal_id',
  externalId: 'any_external_id',
  amount: 999,
  expectedOn: new Date(),
  status: 'CREATED',
});

const mockCreateApiReturn = (
  status: number,
  value: Pick<TransferModel, 'externalId' | 'status'> | { error: Error }
) => {
  nock(Env.servicesAddress.paymentOrders)
    .post('/paymentOrders')
    .reply(status, value);
};

const clearMock = () => {
  nock.cleanAll();
};

const mockGetApiReturn = (
  status: number,
  value: TransferModel | { error: Error },
  externalId: string
) => {
  nock(Env.servicesAddress.paymentOrders)
    .get(`/paymentOrders/${externalId}`)
    .reply(status, value);
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
  const fakeResponse = makeFakeCreateTransferResponse();
  clearMock();
  mockCreateApiReturn(200, fakeResponse);
  mockGetApiReturn(200, makeFakeTransferModel(), fakeResponse.externalId);
  sut.setup();

  return { sut };
};

describe(TransferRoutes.name, () => {
  it('Should return 500 when api fails', async () => {
    const { sut } = makeSut();
    const app = sut.getApp();
    const param: CreateTransferParams = {
      externalId: 'string',
      amount: 1000,
      expectedOn: new Date(),
      dueDate: new Date(),
    };
    clearMock();
    mockCreateApiReturn(500, { error: new Error('any_internal_error') });

    await request(app).post('/api/transfer').send(param).expect(500);
  });

  it('Should return 201 on success', async () => {
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
