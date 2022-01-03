import { CreateTransfer } from '../../domain/use-cases/CreateTransfer';
import { CreateTransferController } from './CreateTransferController';
import { HttpRequest } from '../interfaces/HttpRequest';
import httpStatusCodes from 'http-status-codes';

const makeCreateTransferStub = (): jest.Mocked<CreateTransfer> => ({
  create: jest.fn(),
});

const makeFakeHttpRequest = () => {
  return {} as HttpRequest;
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

    it(`Should return ${httpStatusCodes.INTERNAL_SERVER_ERROR} when CreateTransfer throws`, async () => {
      const { sut } = makeSut();
      const fakeHttpRequest = makeFakeHttpRequest();

      const result = await sut.handle(fakeHttpRequest);

      expect(result).toEqual({
        statusCode: httpStatusCodes.INTERNAL_SERVER_ERROR,
        body: { message: 'Internal server error' },
      });
    });
  });
});
