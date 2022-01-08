import {
  makeFakeCreateTransferResponse,
  makeFakeTransferModel,
} from '../../src/data/test/testHelper';

import App from '../../src/main/Application';
import Env from '../../src/main/config/Env';
import { TransferModel } from './../../src/domain/models/TransferModel';
import { TransferRoutes } from './../../src/main/routes/TransferRoutes';
import express from 'express';
import { makeLoggerStub } from '../../src/infra/test/testHelper';
import nock from 'nock';
import { prismaClearTransferDatabase } from '../helpers/PrismaHelper';
import request from 'supertest';

const mockCreateApiReturn = (
  status: number,
  value: Pick<TransferModel, 'internalId' | 'status'> | { error: Error }
) => {
  nock(Env.servicesAddress.paymentOrders)
    .post('/paymentOrders')
    .reply(status, value);
};

const fakeResponse = makeFakeCreateTransferResponse();
const fakeTransferModel = makeFakeTransferModel();

const clearMock = () => {
  nock.cleanAll();
};

const mockGetApiReturn = (
  status: number,
  value: TransferModel | { error: Error },
  internalId: string
) => {
  nock(Env.servicesAddress.paymentOrders)
    .get(`/paymentOrders?internalId=${internalId}`)
    .reply(status, value);
};

const makeSut = async () => {
  const expressStub = express();
  const loggerStub = makeLoggerStub();
  const sut = new App(3000, expressStub, loggerStub);

  await sut.setup();

  return { sut };
};

describe(TransferRoutes.name, () => {
  beforeEach(async () => {
    await prismaClearTransferDatabase();
    clearMock();

    mockCreateApiReturn(201, fakeResponse);
    mockGetApiReturn(201, fakeTransferModel, fakeResponse.internalId);
  });

  it('Should return 500 when api fails', async () => {
    const { sut } = await makeSut();
    const app = sut.getApp();
    const param = {
      externalId: 'string',
      amount: 1000,
      expectedOn: '07-01-2022',
    };
    clearMock();
    mockCreateApiReturn(500, { error: new Error('any_internal_error') });

    const result = await request(app).post('/api/transfer').send(param);
    expect(result.body).toEqual({
      error: 'Response code 500 (Internal Server Error)',
    });
    expect(result.status).toEqual(500);
  });

  it('Should return 400 when invalid date is provided', async () => {
    const { sut } = await makeSut();
    const app = sut.getApp();
    const param = {
      externalId: 'string',
      amount: 1000,
      expectedOn: 'invalid_date',
    };

    const result = await request(app).post('/api/transfer').send(param);
    expect(result.body).toEqual({
      error:
        'Please check the following validation errors: "expectedOn" must be in DD-MM-YYYY format',
    });
    expect(result.status).toEqual(400);
  });

  it('Should return 400 when empty is provided', async () => {
    const { sut } = await makeSut();
    const app = sut.getApp();
    const param = {};

    const result = await request(app).post('/api/transfer').send(param);

    expect(result.body).toEqual({
      error:
        'Please check the following validation errors: "amount" is required',
    });
    expect(result.status).toEqual(400);
  });

  it('Should return 400 when invalid params is provided', async () => {
    const { sut } = await makeSut();
    const app = sut.getApp();
    const param = {};

    const result = await request(app).post('/api/transfer').send(param);

    expect(result.body).toEqual({
      error:
        'Please check the following validation errors: "amount" is required',
    });
    expect(result.status).toEqual(400);
  });

  it('Should return 201 on success', async () => {
    const { sut } = await makeSut();
    const app = sut.getApp();
    const param = {
      externalId: 'string',
      amount: 1000,
      expectedOn: '07-01-2022',
    };

    const result = await request(app).post('/api/transfer').send(param);

    expect(result.body).toEqual({
      amount: 999,
      expectedOn: '2022-03-01T03:00:00.000Z',
      externalId: '2',
      internalId: 'any_internal_id',
      status: 'CREATED',
    });
    expect(result.status).toEqual(201);
  });
});
