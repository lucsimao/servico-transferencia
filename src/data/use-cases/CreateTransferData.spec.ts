import { HttpClient, HttpResponse } from '../interfaces';

import { CreateTransferData } from './CreateTransferData';
import { CreateTransferParams } from '../../domain/use-cases/CreateTransfer';
import { DateHelper } from './../helpers/DateHelper';
import { ExpiredTransferError } from './../../presentation/errors/ExpiredTransferError';
import { TransferModel } from './../../domain/models/TransferModel';
import { TransferStatusEnum } from './../../domain/enums/TransferStatusEnum';

jest.mock('./../helpers/DateHelper');
jest.spyOn(DateHelper, 'isDateOverdue').mockReturnValue(false);

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
  const sut = new CreateTransferData(fakeUri, httpClientStub);

  return { sut, httpClientStub, fakeUri };
};

describe(CreateTransferData.name, () => {
  describe(CreateTransferData.prototype.create.name, () => {
    it('Should call httpClient with correct params when method is invoked', async () => {
      const { sut, httpClientStub, fakeUri } = makeSut();
      const transferDataParams = makeFakeTransferDataParams();

      await sut.create(transferDataParams);

      expect(httpClientStub.post).toBeCalledWith(`${fakeUri}/paymentOrders`, {
        body: makeFakeTransferDataParams(),
      });
    });

    it('Should return httpClient response when dueDate is provided and not expired', async () => {
      const { sut, httpClientStub } = makeSut();
      const transferDataParams = {
        dueDate: new Date('05/01/2022'),
        ...makeFakeTransferDataParams(),
      };
      const fakeHttpResponse = makeFakeHttpResponse(makeFakeTransferModel());
      httpClientStub.post.mockResolvedValueOnce(fakeHttpResponse);

      const result = await sut.create(transferDataParams);

      expect(result).toEqual(makeFakeTransferModel());
    });

    it('Should return httpClient response when success', async () => {
      const { sut, httpClientStub } = makeSut();
      const transferDataParams = makeFakeTransferDataParams();
      const fakeHttpResponse = makeFakeHttpResponse(makeFakeTransferModel());
      httpClientStub.post.mockResolvedValueOnce(fakeHttpResponse);

      const result = await sut.create(transferDataParams);

      expect(result).toEqual(makeFakeTransferModel());
    });

    it(`Should throw ${ExpiredTransferError.name} when transfer is expired`, async () => {
      const { sut, httpClientStub } = makeSut();
      const transferDataParams = {
        dueDate: new Date('05/01/2022'),
        ...makeFakeTransferDataParams(),
      };
      const fakeHttpResponse = makeFakeHttpResponse(makeFakeTransferModel());
      httpClientStub.post.mockResolvedValueOnce(fakeHttpResponse);
      jest.spyOn(DateHelper, 'isDateOverdue').mockReturnValueOnce(true);

      const promise = sut.create(transferDataParams);

      await expect(promise).rejects.toThrow(new ExpiredTransferError());
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
