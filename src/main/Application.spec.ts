import {
  BodyParserMiddleware,
  CorsMiddleware,
  ErrorMiddleware,
  RateLimitMiddleware,
} from './middlewares';
import { SwaggerUiRoutes, TransferRoutes } from './routes';
import express, { Application, RequestHandler } from 'express';
import { makeExpressAppStub, makeRouterStub } from './tests/testHelper';

import App from './Application';
import { makeLoggerStub } from '../infra/test/testHelper';

jest.mock('express');
jest.mock('./middlewares');
jest.mock('./routes');

jest
  .spyOn(BodyParserMiddleware, 'getMiddleware')
  .mockReturnValue('body_parser' as unknown as RequestHandler);
jest
  .spyOn(CorsMiddleware, 'getMiddleware')
  .mockReturnValue('cors' as unknown as RequestHandler);
(jest.spyOn(RateLimitMiddleware, 'getMiddleware') as jest.Mock).mockReturnValue(
  'rate_limit' as unknown as RequestHandler
);
(jest.spyOn(ErrorMiddleware, 'getMiddleware') as jest.Mock).mockReturnValue(
  'error_middleware' as unknown as RequestHandler
);

express.Router = () => makeRouterStub();

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
    it('Should call app.use when method is invoked', async () => {
      const { sut, expressStub } = makeSut();

      await sut.setup();

      expect(expressStub.use).toHaveBeenCalledWith('/api', expect.anything());
      expect(expressStub.use).toHaveBeenCalledWith([
        'body_parser',
        'cors',
        'rate_limit',
      ]);
      expect(expressStub.use).toHaveBeenCalledWith(['error_middleware']);
    });

    it('Should call middlewares when method is invoked', async () => {
      const { sut } = makeSut();
      const bodyParserSpy = jest.spyOn(BodyParserMiddleware, 'getMiddleware');
      const corsSpy = jest.spyOn(BodyParserMiddleware, 'getMiddleware');
      const rateLimitMiddlewareSpy = jest.spyOn(
        RateLimitMiddleware,
        'getMiddleware'
      );

      await sut.setup();

      expect(bodyParserSpy).toHaveBeenCalledWith();
      expect(corsSpy).toHaveBeenCalledWith();
      expect(rateLimitMiddlewareSpy).toHaveBeenCalledWith();
    });

    it('Should setRoutes when method is invoked', async () => {
      const { sut } = makeSut();
      const transferSetRoutesSpy = jest.spyOn(TransferRoutes, 'setRoutes');
      const swaggerSetRoutesSpy = jest.spyOn(SwaggerUiRoutes, 'setRoutes');

      await sut.setup();

      expect(transferSetRoutesSpy).toBeCalledWith({
        get: expect.any(Function),
        post: expect.any(Function),
        use: expect.any(Function),
      });

      expect(swaggerSetRoutesSpy).toBeCalledWith({
        get: expect.any(Function),
        post: expect.any(Function),
        use: expect.any(Function),
      });
    });

    it('Should call logger when method is invoked', async () => {
      const { sut, loggerStub } = makeSut();

      await sut.setup();

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
      expect(loggerStub.info).toBeCalledWith({
        msg: 'Starting error middlewares setup...',
      });
      expect(loggerStub.info).toBeCalledWith({
        msg: 'Finished error middlewares setup',
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
