import App from '../App';
import { TransferRoutes } from './TransferRoutes';
import request from 'supertest';

const makeSut = () => {
  const sut = new App(3000);
  sut.setupMiddlewares();
  sut.setupRoutes();

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
