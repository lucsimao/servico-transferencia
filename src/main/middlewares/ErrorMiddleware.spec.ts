import {
  makeFakeExpressRequest,
  makeFakeExpressResponse,
} from '../tests/testHelper';

import { ErrorHelper } from '../../presentation/helpers/ErrorHelper';
import { ErrorMiddleware } from './ErrorMiddleware';
import { badRequest } from '../../presentation/helpers/httpHelpers';

jest
  .spyOn(ErrorHelper, 'format')
  .mockImplementation((error: Error) => badRequest(error));
const makeSut = () => {
  const sut = ErrorMiddleware;

  return { sut };
};

describe(ErrorMiddleware.name, () => {
  describe(ErrorMiddleware.getMiddleware.name, () => {
    it('Should return value when method is called', () => {
      const { sut } = makeSut();
      const middleware = sut.getMiddleware();
      const req = makeFakeExpressRequest();
      const res = makeFakeExpressResponse();
      const error = new Error('any_error');
      const formatSpy = jest.spyOn(ErrorHelper, 'format');

      middleware(error, req, res);

      expect(formatSpy).toBeCalledWith(error);
    });
  });
});
