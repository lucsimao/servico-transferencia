import {
  makeFakeExternalId,
  makeFakeTransferModel,
} from '../../data/test/testHelper';

import { ApiGetTransferRepository } from './ApiGetTransferRepository';
import { makeHttpClientStub } from '../test/testHelper';

const makeSut = () => {
  const fakeUri = 'http://any_uri/my_url';
  const httpClientStub = makeHttpClientStub();

  const sut = new ApiGetTransferRepository(fakeUri, httpClientStub);

  return { sut, httpClientStub };
};

describe(ApiGetTransferRepository.name, () => {
  describe(ApiGetTransferRepository.prototype.get, () => {
    it('Should call get value when method is called', async () => {
      const { sut, httpClientStub } = makeSut();
      const fakeExternalId = makeFakeExternalId();

      await sut.get(String(fakeExternalId));

      expect(httpClientStub.get).toBeCalledWith(
        'http://any_uri/my_url/paymentOrders?internalId=2',
        { headers: {} }
      );
    });

    it('Should return value when method is called', async () => {
      const { sut } = makeSut();
      const fakeExternalId = makeFakeExternalId();

      const result = await sut.get(String(fakeExternalId));

      expect(result).toEqual(makeFakeTransferModel());
    });
  });
});
