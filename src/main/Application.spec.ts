import { BodyParserMiddleware, CorsMiddleware } from './middlewares';
import express, { Application, RequestHandler, Router } from 'express';

import App from './Application';
import { Logger } from '../data/interfaces/logger/Logger';
import { TransferRoutes } from './routes/TransferRoutes';

jest.mock('express');
jest.mock('./middlewares');
express.Router = () => makeRouterStub();

const makeRouterStub = (): jest.Mocked<Router> => {
  const result: jest.Mocked<Partial<Router>> = {
    get: jest.fn(),
    post: jest.fn(),
  };
  return result as jest.Mocked<Router>;
};

const makeExpressAppStub = (): jest.Mocked<Partial<Application>> => ({
  listen: jest.fn().mockReturnValue({ close: jest.fn() }),
  use: jest.fn(),
});

const makeLoggerStub = (): jest.Mocked<Logger> => ({
  info: jest.fn(),
  warning: jest.fn(),
  error: jest.fn(),
});

const makeSut = () => {
  const fakePort = 9999;
  const expressStub = makeExpressAppStub() as jest.Mocked<Application>;
  const loggerStub = makeLoggerStub();

  const sut = new App(fakePort, expressStub, loggerStub);

  return { sut, fakePort, loggerStub, expressStub };
};

describe(App.name, () => {
  describe(App.prototype.start.name, () => {
    it('Should call app.listen when method is invoked', () => {
      const { sut, fakePort, expressStub } = makeSut();

      sut.start();

      expect(expressStub.listen).toBeCalledWith(fakePort, expect.any(Function));
    });

    it('Should call logger in callback function', () => {
      const { sut, fakePort, expressStub, loggerStub } = makeSut();
      (expressStub.listen as jest.Mock).mockImplementationOnce(
        (_port: number, callback: () => void) => {
          callback();
        }
      );

      sut.start();

      expect(loggerStub.info).toBeCalledWith({
        msg: `Starting server on port ${fakePort}...`,
      });
      expect(loggerStub.info).toBeCalledWith({
        msg: `Server listening on port ${fakePort}`,
      });
    });

    it('Should throw when app.listen throws', () => {
      const { sut, expressStub } = makeSut();
      expressStub.listen.mockImplementationOnce(() => {
        throw new Error('any_listen_error');
      });

      expect(() => sut.start()).toThrow(new Error('any_listen_error'));
    });
  });

  describe(App.prototype.setup.name, () => {
    it('Should call app.use when method is invoked', () => {
      const { sut, expressStub } = makeSut();
      jest
        .spyOn(BodyParserMiddleware, 'getMiddleware')
        .mockReturnValueOnce('body_parser' as unknown as RequestHandler);
      jest
        .spyOn(CorsMiddleware, 'getMiddleware')
        .mockReturnValueOnce('cors' as unknown as RequestHandler);
      sut.setup();

      expect(expressStub.use).toBeCalledWith('/api', expect.anything());
      expect(expressStub.use).toHaveBeenCalledWith('body_parser');
      expect(expressStub.use).toHaveBeenCalledWith('cors');
    });

    it('Should call middlewares when method is invoked', () => {
      const { sut } = makeSut();
      const bodyParserSpy = jest.spyOn(BodyParserMiddleware, 'getMiddleware');
      const corsSpy = jest.spyOn(BodyParserMiddleware, 'getMiddleware');

      sut.setup();

      expect(bodyParserSpy).toBeCalledWith();
      expect(corsSpy).toBeCalledWith();
    });

    it('Should setRoutes when method is invoked', () => {
      const { sut } = makeSut();
      const setRoutesSpy = jest.spyOn(TransferRoutes, 'setRoutes');

      sut.setup();

      expect(setRoutesSpy).toBeCalledWith({
        get: expect.any(Function),
        post: expect.any(Function),
      });
    });

    it('Should call logger when method is invoked', () => {
      const { sut, loggerStub } = makeSut();

      sut.setup();

      expect(loggerStub.info).toBeCalledWith({
        msg: `Starting application setup...`,
      });
      expect(loggerStub.info).toBeCalledWith({
        msg: `Starting middlewares setup...`,
      });
      expect(loggerStub.info).toBeCalledWith({
        msg: `Finished middlewares setup`,
      });
      expect(loggerStub.info).toBeCalledWith({
        msg: `Finished application setup`,
      });
      expect(loggerStub.info).toBeCalledWith({
        msg: `Starting routes setup...`,
      });
      expect(loggerStub.info).toBeCalledWith({
        msg: `Finished routes setup`,
      });
    });
  });

  describe(App.prototype.close.name, () => {
    it('Should not call server.close when method is invoked before start', async () => {
      const { sut, expressStub } = makeSut();
      const serverCloseSpy = expressStub.listen().close;

      await sut.close();

      expect(serverCloseSpy).not.toBeCalled();
    });

    it('Should call server.close when method is invoked', async () => {
      const { sut, expressStub } = makeSut();
      const serverCloseSpy = expressStub.listen().close;
      sut.start();

      await sut.close();

      expect(serverCloseSpy).toBeCalledWith();
    });

    it('Should call logger in callback function', async () => {
      const { sut, expressStub, loggerStub } = makeSut();
      (expressStub.listen as jest.Mock).mockImplementationOnce(
        (_port: number, callback: () => void) => {
          callback();
        }
      );
      sut.start();

      await sut.close();

      expect(loggerStub.info).toBeCalledWith({
        msg: `Closing application...`,
      });
      expect(loggerStub.info).toBeCalledWith({
        msg: `Application Closed`,
      });
    });

    it('Should throw when server.close throws', async () => {
      const { sut, expressStub } = makeSut();
      const serverCloseSpy = jest.spyOn(
        expressStub.listen(),
        'close'
      ) as jest.Mock;
      serverCloseSpy.mockRejectedValueOnce(new Error('any_close_error'));
      sut.start();

      const promise = sut.close();

      await expect(promise).rejects.toThrow(new Error('any_close_error'));
    });
  });

  describe(App.prototype.getApp.name, () => {
    it('Should return app when method is invoked', () => {
      const { sut, expressStub } = makeSut();

      const result = sut.getApp();

      expect(result).toBe(expressStub);
    });
  });
});
