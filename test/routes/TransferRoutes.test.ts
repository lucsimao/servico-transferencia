import App from '../../src/main/Application';
import { Logger } from './../../src/data/interfaces/logger/Logger';
import { TransferRoutes } from './../../src/main/routes/TransferRoutes';
import express from 'express';
import request from 'supertest';

const makeLoggerStub = (): jest.Mocked<Logger> => ({
  info: jest.fn(),
  warning: jest.fn(),
  error: jest.fn(),
});

const makeSut = () => {
  const expressStub = express();
  const loggerStub = makeLoggerStub();
  const sut = new App(3000, expressStub, loggerStub);
  sut.setup();

  return { sut };
};

describe(TransferRoutes.name, () => {
  test('Should return an Transfer on success', async () => {
    const { sut } = makeSut();
    const app = sut.getApp();

    await request(app)
      .post('/api/transfer')
      .send({
        externalId: 'string',
        amount: 1000,
        expectedOn: new Date(),
        dueDate: new Date(),
      })
      .expect(200);
  });
});
