import express, { Request, Response } from 'express';

import App from '../../src/main/Application';
import { CorsMiddleware } from './../../src/main/middlewares/CorsMiddleware';
import { Logger } from '../infra/interfaces/logger/Logger';
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

describe(CorsMiddleware.name, () => {
  test('Should enable CORS', async () => {
    const { sut } = makeSut();
    const app = sut.getApp();

    app.get('/test_cors', (_req: Request, res: Response) => {
      res.send();
    });

    await request(app)
      .get('/test_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*');
  });
});
