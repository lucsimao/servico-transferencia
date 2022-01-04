import { Request, Response } from 'express';

import App from '../App';
import { BodyParserMiddleware } from './BodyParserMiddleware';
import request from 'supertest';

const makeSut = () => {
  const sut = new App(3000);
  sut.setupMiddlewares();

  return { sut };
};

describe(BodyParserMiddleware.name, () => {
  test('Should enable CORS', async () => {
    const { sut } = makeSut();
    const app = sut.getApp();

    app.get('/test_cors', (req: Request, res: Response) => {
      res.send();
    });

    await request(app)
      .get('/test_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*');
  });
});
