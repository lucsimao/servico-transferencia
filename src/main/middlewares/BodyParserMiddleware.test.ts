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
