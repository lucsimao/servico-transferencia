import express, { NextFunction, Request, Response } from 'express';

import { CorsMiddleware } from '.';

jest.mock('express');
express.json = jest.fn().mockReturnValue('any_value');

const makeFakeExpressRequest = (): Request => ({} as Request);
const makeFakeExpressResponse = (): jest.Mocked<Response> => {
  const result: jest.Mocked<Partial<Response>> = { set: jest.fn() };
  return result as jest.Mocked<Response>;
};
const makeFakeNextFunction = (): NextFunction => jest.fn();

const makeSut = () => {
  const sut = CorsMiddleware;

  return { sut };
};

describe(CorsMiddleware.name, () => {
  describe(CorsMiddleware.getMiddleware.name, () => {
    it('should return a middleware when method is invoked', () => {
      const { sut } = makeSut();
      const middleware = sut.getMiddleware();
      const req = makeFakeExpressRequest();
      const res = makeFakeExpressResponse();
      const next = makeFakeNextFunction();

      middleware(req, res, next);

      expect(res.set).toBeCalledWith('access-control-allow-origin', '*');
      expect(res.set).toBeCalledWith('access-control-allow-methods', '*');
      expect(res.set).toBeCalledWith('access-control-allow-headers', '*');
      expect(next).toBeCalledWith();
    });
  });
});
