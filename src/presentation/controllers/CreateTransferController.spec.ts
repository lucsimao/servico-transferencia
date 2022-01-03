import { CreateTransfer } from '../../domain/use-cases/CreateTransfer';
import { CreateTransferController } from './CreateTransferController';
import { CreateTransferParams } from './../../domain/use-cases/CreateTransfer';
import { ExpiredTransferError } from '../errors/ExpiredTransferError';
import { HttpRequest } from '../interfaces/HttpRequest';
import { TransferModel } from '../../domain/models/TransferModel';
import { TransferStatusEnum } from '../../domain/enums/TransferStatusEnum';
import httpStatusCodes from 'http-status-codes';

const makeFakeTransferModel = (): TransferModel => ({
  internalId: 'any_internal_id',
  externalId: 'any_external_id',
  amount: 999,
  expectedOn: new Date('03/01/2022'),
  status: TransferStatusEnum.CREATED,
});

const makeCreateTransferStub = (): jest.Mocked<CreateTransfer> => ({
  create: jest.fn().mockResolvedValue(makeFakeTransferModel()),
});

const makeFakeHttpRequest = () => {
  return {} as HttpRequest<CreateTransferParams>;
};

const makeSut = () => {
  const createTransferStub = makeCreateTransferStub();
  const sut = new CreateTransferController(createTransferStub);

  return { sut, createTransferStub };
};

describe(CreateTransferController.name, () => {
  describe(CreateTransferController.prototype.handle.name, () => {
    it(`Should call create with correct params when method is invoked`, async () => {
      const { sut, createTransferStub } = makeSut();
      const fakeHttpRequest = makeFakeHttpRequest();

      await sut.handle(fakeHttpRequest);

      expect(createTransferStub.create).toBeCalledWith(fakeHttpRequest.body);
    });

    it(`Should return ${httpStatusCodes.CREATED} when CreateTransfer returns a TransferModel`, async () => {
      const { sut } = makeSut();
      const fakeHttpRequest = makeFakeHttpRequest();

      const result = await sut.handle(fakeHttpRequest);

      expect(result).toEqual({
        statusCode: httpStatusCodes.CREATED,
        body: makeFakeTransferModel(),
      });
    });

    it(`Should return ${httpStatusCodes.BAD_REQUEST} when CreateTransfer throws a ${ExpiredTransferError.name}`, async () => {
      const { sut, createTransferStub } = makeSut();
      const fakeHttpRequest = makeFakeHttpRequest();
      createTransferStub.create.mockRejectedValue(new ExpiredTransferError());

      const result = await sut.handle(fakeHttpRequest);

      expect(result).toEqual({
        statusCode: httpStatusCodes.BAD_REQUEST,
        body: new ExpiredTransferError(),
      });
    });

    it(`Should return ${httpStatusCodes.INTERNAL_SERVER_ERROR} when CreateTransfer throws`, async () => {
      const { sut, createTransferStub } = makeSut();
      const fakeHttpRequest = makeFakeHttpRequest();
      createTransferStub.create.mockRejectedValue(
        new Error('any_create_error')
      );

      const result = await sut.handle(fakeHttpRequest);

      expect(result).toEqual({
        statusCode: httpStatusCodes.INTERNAL_SERVER_ERROR,
        body: new Error('any_create_error'),
      });
    });
  });
});
