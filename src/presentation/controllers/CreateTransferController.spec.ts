import { CreateTransferController } from './CreateTransferController';
import { HttpRequest } from '../interfaces/HttpRequest';
import httpStatusCodes from 'http-status-codes';

const makeFakeHttpRequest = () => {
  return {} as HttpRequest;
};

const makeSut = () => {
  const sut = new CreateTransferController();

  return { sut };
};

describe(CreateTransferController.name, () => {
  describe(CreateTransferController.prototype.handle.name, () => {
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
