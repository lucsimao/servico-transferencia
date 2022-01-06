import { ApiGetTransferRepository } from './ApiGetTransferRepository';
import { makeFakeTransferModel } from '../../data/test/testHelper';
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
      const fakeExternalId = 'any_id';

      await sut.get(fakeExternalId);

      expect(httpClientStub.get).toBeCalledWith(
        'http://any_uri/my_url/paymentOrders/any_id',
        { headers: {} }
      );
    });

    it('Should return value when method is called', async () => {
      const { sut } = makeSut();
      const fakeExternalId = 'any_id';

      const result = await sut.get(fakeExternalId);

      expect(result).toEqual(makeFakeTransferModel());
    });
  });
});
