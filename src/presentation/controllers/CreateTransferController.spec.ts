import {
  makeCreateTransferStub,
  makeCreateTransferValidatorStub,
  makeFakeApiHttpRequest,
} from '../tests/testHelper';

import { CreateTransferController } from './CreateTransferController';
import { ErrorHelper } from '../helpers/ErrorHelper';
import { ExpiredTransferError } from '../../data/errors/ExpiredTransferError';
import httpStatusCodes from 'http-status-codes';
import { makeFakeTransferModel } from '../../data/test/testHelper';

const makeSut = () => {
  const createTransferStub = makeCreateTransferStub();
  const createTransferValidatorStub = makeCreateTransferValidatorStub();
  const sut = new CreateTransferController(
    createTransferStub,
    createTransferValidatorStub
  );

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

    it(`Should call ErrorHelper when CreateTransfer throws`, async () => {
      const { sut, createTransferStub } = makeSut();
      const fakeApiHttpRequest = makeFakeApiHttpRequest();
      createTransferStub.create.mockRejectedValue(new ExpiredTransferError());
      const formatSpy = jest.spyOn(ErrorHelper, 'format');

      await sut.handle(fakeApiHttpRequest);

      expect(formatSpy).toBeCalledWith(new ExpiredTransferError());
    });
  });
});
