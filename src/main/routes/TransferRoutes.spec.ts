import express, { Request, Response, Router } from 'express';

import { TransferRoutes } from './TransferRoutes';

jest.mock('express');
express.json = jest.fn().mockReturnValue('any_value');

const makeFakeExpressRequest = (): Request => ({} as Request);
const makeFakeExpressResponse = (): jest.Mocked<Response> => {
  const result: jest.Mocked<Partial<Response>> = { send: jest.fn() };
  return result as jest.Mocked<Response>;
};

const makeFakeRouter = (): jest.Mocked<Router> => {
  const result: jest.Mocked<Partial<Router>> = { post: jest.fn() };
  return result as jest.Mocked<Router>;
};

const makeSut = () => {
  const sut = TransferRoutes;

  return { sut };
};

describe(TransferRoutes.name, () => {
  describe(TransferRoutes.setRoutes.name, () => {
    it('should call correct routes when method is invoked', () => {
      const { sut } = makeSut();
      const router = makeFakeRouter();

      sut.setRoutes(router);

      expect(router.post).toBeCalledWith('/transfer', expect.any(Function));
    });

    it('should call correct callback when method is invoked', () => {
      const { sut } = makeSut();
      const router = makeFakeRouter();
      const req = makeFakeExpressRequest();
      const res = makeFakeExpressResponse();
      (router.post as jest.Mock).mockImplementationOnce(
        (_route: string, callback: CallableFunction) => {
          callback(req, res);
        }
      );

      sut.setRoutes(router);

      expect(res.send).toBeCalledWith('any');
    });
  });
});
