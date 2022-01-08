import {
  makeControllerStub,
  makeFakeApiHttpRequest,
} from '../../presentation/tests/testHelper';

import { LoggerControllerDecorator } from './LoggerControllerDecorator';
import { makeLoggerStub } from '../../infra/test/testHelper';

const makeSut = () => {
  const controllerStub = makeControllerStub();
  const loggerStub = makeLoggerStub();
  const sut = new LoggerControllerDecorator(controllerStub, loggerStub);

  return { sut, controllerStub, loggerStub };
};

describe('Tests', () => {
  describe('make', () => {
    it('Should return call controller when method is called', async () => {
      const { sut, controllerStub } = makeSut();
      const param = makeFakeApiHttpRequest();

      await sut.handle(param);

      expect(controllerStub.handle).toBeCalledWith(param);
    });

    it('Should return call logger.info when method is called with success', async () => {
      const { sut, loggerStub } = makeSut();
      const param = makeFakeApiHttpRequest();

      await sut.handle(param);

      expect(loggerStub.info).toBeCalledWith({
        msg: 'Controller result: 999 - any_controller_body',
      });
    });

    it('Should call logger when controller throws', async () => {
      const { sut, controllerStub, loggerStub } = makeSut();
      const param = makeFakeApiHttpRequest();
      controllerStub.handle.mockRejectedValueOnce(new Error('any_error'));

      const promise = sut.handle(param);

      await expect(promise).rejects.toThrow();
      expect(loggerStub.error).toBeCalledWith({ msg: 'Error: any_error' });
    });

    it('Should throw when controller throws', async () => {
      const { sut, controllerStub } = makeSut();
      const param = makeFakeApiHttpRequest();
      controllerStub.handle.mockRejectedValueOnce(new Error('any_error'));

      const promise = sut.handle(param);

      await expect(promise).rejects.toThrow(new Error('any_error'));
    });
  });
});
