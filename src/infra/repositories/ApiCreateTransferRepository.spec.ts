import {
  makeFakeTransferApi,
  makeFakeTransferDataParams,
  makeFakeTransferModel,
} from '../../data/test/testHelper';

import { ApiCreateTransferRepository } from './ApiCreateTransferRepository';
import { makeHttpClientStub } from '../test/testHelper';

const makeSut = () => {
  const fakeUri = 'http://any_uri/my_url';
  const httpClientStub = makeHttpClientStub();

  const sut = new ApiCreateTransferRepository(fakeUri, httpClientStub);

  return { sut, httpClientStub };
};

describe(ApiCreateTransferRepository.name, () => {
  describe(ApiCreateTransferRepository.prototype.create, () => {
    it('Should call post value when method is called', async () => {
      const { sut, httpClientStub } = makeSut();
      const fakeTransferDataParams = makeFakeTransferDataParams();

      await sut.create(fakeTransferDataParams);

      expect(httpClientStub.post).toBeCalledWith(
        'http://any_uri/my_url/paymentOrders',
        { body: makeFakeTransferApi() }
      );
    });

    it('Should return value when method is called', async () => {
      const { sut } = makeSut();
      const fakeTransferDataParams = makeFakeTransferDataParams();

      const result = await sut.create(fakeTransferDataParams);

      expect(result).toEqual(makeFakeTransferModel());
    });
  });
});
