import express, { Request, Response } from 'express';

import App from '../../src/main/Application';
import { BodyParserMiddleware } from './../../src/main/middlewares/BodyParserMiddleware';
import { Logger } from './../../src/data/interfaces';
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

describe(BodyParserMiddleware.name, () => {
  test('Should parse body as json', async () => {
    const { sut } = makeSut();
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
