import { ApiGetTransferRepository } from './ApiGetTransferRepository';
import { makeFakeTransferModel } from '../../data/test/testHelper';
import { makeHttpClientStub } from '../test/testHelper';

const makeSut = () => {
  const fakeUri = 'http://any_uri/my_url';
  const httpClientStub = makeHttpClientStub();

  const sut = new ApiGetTransferRepository(fakeUri, httpClientStub);

  return { sut };
};

describe(ApiGetTransferRepository.name, () => {
  describe(ApiGetTransferRepository.prototype.get, () => {
    it('Should return value when method is called', async () => {
      const { sut } = makeSut();
      const fakeExternalId = 'any_id';

      const result = await sut.get(fakeExternalId);

      expect(result).toEqual(makeFakeTransferModel());
    });
  });
});
