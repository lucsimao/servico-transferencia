import { HttpClient, HttpResponse } from '../../data/interfaces';

import { ApiCreateTransferRepository } from './ApiCreateTransferRepository';
import { CreateTransferParams } from '../../domain/use-cases/CreateTransfer';
import { TransferModel } from '../../domain/models/TransferModel';
import { TransferStatusEnum } from '../../domain/enums/TransferStatusEnum';

const makeHttpClientStub = (): jest.Mocked<HttpClient> => ({
  get: jest.fn(),
  post: jest
    .fn()
    .mockReturnValue(makeFakeHttpResponse(makeFakeTransferModel())),
});

const makeFakeTransferDataParams = (): CreateTransferParams => ({
  externalId: 'any_external_id',
  amount: 999,
  expectedOn: new Date('03/01/2022'),
});

const makeFakeTransferModel = (): TransferModel => ({
  internalId: 'any_internal_id',
  externalId: 'any_external_id',
  amount: 999,
  expectedOn: new Date('03/01/2022'),
  status: TransferStatusEnum.CREATED,
});

const makeFakeHttpResponse = (data: unknown): HttpResponse => ({
  statusCode: 200,
  body: data,
});

const makeSut = () => {
  const fakeUri = 'http://any_uri/my_url';
  const httpClientStub = makeHttpClientStub();

  const sut = new ApiCreateTransferRepository(fakeUri, httpClientStub);

  return { sut };
};

describe(ApiCreateTransferRepository.name, () => {
  describe(ApiCreateTransferRepository.prototype.create, () => {
    it('Should return value when method is called', async () => {
      const { sut } = makeSut();
      const fakeTransferDataParams = makeFakeTransferDataParams();

      const result = await sut.create(fakeTransferDataParams);

      expect(result).toEqual(makeFakeTransferModel());
    });
  });
});
