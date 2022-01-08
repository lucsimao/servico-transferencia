import express, { Request, Response } from 'express';

import App from '../../src/main/Application';
import { BodyParserMiddleware } from './../../src/main/middlewares/BodyParserMiddleware';
import { Logger } from '../infra/interfaces/logger/Logger';
import { prismaClearTransferDatabase } from '../helpers/PrismaHelper';
import request from 'supertest';

const makeLoggerStub = (): jest.Mocked<Logger> => ({
  info: jest.fn(),
  warning: jest.fn(),
  error: jest.fn(),
});

const makeSut = async () => {
  const expressStub = express();
  const loggerStub = makeLoggerStub();

  const sut = new App(3000, expressStub, loggerStub);
  await sut.getApp().use(BodyParserMiddleware.getMiddleware());

  return { sut };
};

describe(BodyParserMiddleware.name, () => {
  beforeEach(async () => {
    await prismaClearTransferDatabase();
  });

  test('Should parse body as json', async () => {
    const { sut } = await makeSut();
    const app = sut.getApp();

    app.post('/test_body_parser', (req: Request, res: Response) => {
      res.send(req.body);
    });

    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Lucas' })
      .expect({ name: 'Lucas' });
  });
});
