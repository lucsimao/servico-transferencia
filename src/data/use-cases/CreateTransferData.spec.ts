import { CreateTransferData } from './CreateTransferData';
import { CreateTransferParams } from '../../domain/use-cases/CreateTransfer';
import { HttpClient } from './../interfaces/HttpClient';

const makeHttpClientStub = (): jest.Mocked<HttpClient> => ({ post: jest.fn() });

const makeFakeTransferDataParams = (): CreateTransferParams => ({
  externalId: 'any_external_id',
  amount: 999,
  expectedOn: new Date('03/01/2022'),
});

const makeSut = () => {
  const httpClientStub = makeHttpClientStub();
  const sut = new CreateTransferData(httpClientStub);

  return { sut, httpClientStub };
};

describe(CreateTransferData.name, () => {
  describe(CreateTransferData.prototype.create.name, () => {
    it('Should call httpClient with correct params when method is invoked', async () => {
      const { sut, httpClientStub } = makeSut();
      const transferDataParams = makeFakeTransferDataParams();

      await sut.create(transferDataParams);

      expect(httpClientStub.post).toBeCalledWith('any_url', {
        amount: 999,
        expectedOn: new Date('03/01/2022'),
        externalId: 'any_external_id',
      });
    });

    it('Should throw when httpClient throws', async () => {
      const { sut, httpClientStub } = makeSut();
      const transferDataParams = makeFakeTransferDataParams();
      httpClientStub.post.mockRejectedValueOnce(
        new Error('any_httpClient_error')
      );

      const promise = sut.create(transferDataParams);

      await expect(promise).rejects.toThrow(new Error('any_httpClient_error'));
    });
  });
});
