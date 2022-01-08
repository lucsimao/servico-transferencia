import { ErrorHelper } from './ErrorHelper';
import { ExpiredTransferError } from '../../data/errors/ExpiredTransferError';
import { InvalidParamsError } from '../../infra/errors/InvalidParamsError';
import { TooManyRequestsError } from '../../main/errors/TooManyRequestsError';
import httpStatusCodes from 'http-status-codes';

const makeSut = () => {
  const sut = ErrorHelper;

  return { sut };
};

describe(ErrorHelper.name, () => {
  describe(ErrorHelper.format.name, () => {
    it(`Should return ${httpStatusCodes.BAD_REQUEST} when CreateTransfer throws a ${ExpiredTransferError.name}`, async () => {
      const { sut } = makeSut();
      const error = new ExpiredTransferError();

      const result = await sut.format(error);

      expect(result).toEqual({
        statusCode: httpStatusCodes.BAD_REQUEST,
        body: new ExpiredTransferError(),
      });
    });

    it(`Should return ${httpStatusCodes.BAD_REQUEST} when CreateTransfer throws a ${ExpiredTransferError.name}`, async () => {
      const { sut } = makeSut();
      const error = new InvalidParamsError('any_error');

      const result = await sut.format(error);

      expect(result).toEqual({
        statusCode: httpStatusCodes.BAD_REQUEST,
        body: new InvalidParamsError('any_error'),
      });
    });

    it(`Should return ${httpStatusCodes.TOO_MANY_REQUESTS} when CreateTransfer throws a ${TooManyRequestsError.name}`, async () => {
      const { sut } = makeSut();
      const error = new TooManyRequestsError();

      const result = await sut.format(error);

      expect(result).toEqual({
        statusCode: httpStatusCodes.TOO_MANY_REQUESTS,
        body: new TooManyRequestsError(),
      });
    });

    it(`Should return ${httpStatusCodes.INTERNAL_SERVER_ERROR} when CreateTransfer throws`, async () => {
      const { sut } = makeSut();
      const error = new Error('any_error');

      const result = await sut.format(error);

      expect(result).toEqual({
        statusCode: httpStatusCodes.INTERNAL_SERVER_ERROR,
        body: new Error('any_error'),
      });
    });
  });
});
