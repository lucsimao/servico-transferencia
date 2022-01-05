import { ApiHttpRequest } from '../interfaces';
import { CreateTransfer } from '../../domain/use-cases/CreateTransfer';
import { CreateTransferController } from './CreateTransferController';
import { CreateTransferParams } from './../../domain/use-cases/CreateTransfer';
import { ExpiredTransferError } from '../../data/errors/ExpiredTransferError';
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

const makeFakeApiHttpRequest = () => {
  return {} as ApiHttpRequest<CreateTransferParams>;
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
      const fakeApiHttpRequest = makeFakeApiHttpRequest();

      await sut.handle(fakeApiHttpRequest);

      expect(createTransferStub.create).toBeCalledWith(fakeApiHttpRequest.body);
    });

    it(`Should return ${httpStatusCodes.CREATED} when CreateTransfer returns a TransferModel`, async () => {
      const { sut } = makeSut();
      const fakeApiHttpRequest = makeFakeApiHttpRequest();

      const result = await sut.handle(fakeApiHttpRequest);

      expect(result).toEqual({
        statusCode: httpStatusCodes.CREATED,
        body: makeFakeTransferModel(),
      });
    });

    it(`Should return ${httpStatusCodes.BAD_REQUEST} when CreateTransfer throws a ${ExpiredTransferError.name}`, async () => {
      const { sut, createTransferStub } = makeSut();
      const fakeApiHttpRequest = makeFakeApiHttpRequest();
      createTransferStub.create.mockRejectedValue(new ExpiredTransferError());

      const result = await sut.handle(fakeApiHttpRequest);

      expect(result).toEqual({
        statusCode: httpStatusCodes.BAD_REQUEST,
        body: new ExpiredTransferError(),
      });
    });

    it(`Should return ${httpStatusCodes.INTERNAL_SERVER_ERROR} when CreateTransfer throws`, async () => {
      const { sut, createTransferStub } = makeSut();
      const fakeApiHttpRequest = makeFakeApiHttpRequest();
      createTransferStub.create.mockRejectedValue(
        new Error('any_create_error')
      );

      const result = await sut.handle(fakeApiHttpRequest);

      expect(result).toEqual({
        statusCode: httpStatusCodes.INTERNAL_SERVER_ERROR,
        body: new Error('any_create_error'),
      });
    });
  });
});
