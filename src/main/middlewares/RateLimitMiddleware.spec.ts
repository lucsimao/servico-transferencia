import * as RateLimitModule from 'express-rate-limit';

import {
  makeFakeExpressRequest,
  makeFakeExpressResponse,
} from './../tests/testHelper';

import { RateLimitMiddleware } from './RateLimitMiddleware';
import { TooManyRequestsError } from './../errors/TooManyRequestsError';
import express from 'express';

jest.mock('express');
jest.mock('express-rate-limit');

express.json = jest.fn().mockReturnValue('any_value');

const makeFakeRateLimitMiddleware = () => {
  const result: jest.Mocked<Partial<RateLimitModule.RateLimitRequestHandler>> =
    { resetKey: jest.fn() };

  return result as jest.Mocked<RateLimitModule.RateLimitRequestHandler>;
};

const makeSut = () => {
  const sut = RateLimitMiddleware;

  return { sut };
};

describe(RateLimitMiddleware.name, () => {
  describe(RateLimitMiddleware.getMiddleware.name, () => {
    it('should call rateLimiter when method is invoked', () => {
      const { sut } = makeSut();
      const rateLimitSpy = jest.spyOn(RateLimitModule, 'default');

      sut.getMiddleware();

      expect(rateLimitSpy).toBeCalledWith({
        handler: expect.any(Function),
        keyGenerator: expect.any(Function),
        max: 10,
        windowMs: 60000,
      });
    });

    it('should call return req ip when method is invoked', () => {
      const { sut } = makeSut();
      (
        jest.spyOn(RateLimitModule, 'default') as jest.Mock
      ).mockImplementationOnce((params: { keyGenerator: CallableFunction }) => {
        return params.keyGenerator({ ip: 2 });
      });
      const result = sut.getMiddleware();

      expect(result).toEqual(2);
    });

    it('should call return req ip when method is invoked', () => {
      const { sut } = makeSut();
      const fakeNext = jest.fn();
      (
        jest.spyOn(RateLimitModule, 'default') as jest.Mock
      ).mockImplementationOnce((params: { handler: CallableFunction }) => {
        return params.handler(
          makeFakeExpressRequest(),
          makeFakeExpressResponse(),
          fakeNext
        );
      });
      sut.getMiddleware();

      expect(fakeNext).toBeCalledWith(new TooManyRequestsError());
    });

    it('should return a middleware when method is invoked', () => {
      const { sut } = makeSut();
      const fakeMiddleware = makeFakeRateLimitMiddleware();
      jest
        .spyOn(RateLimitModule, 'default')
        .mockReturnValueOnce(fakeMiddleware);
      const result = sut.getMiddleware();

      expect(result).toEqual(fakeMiddleware);
    });
  });
});
