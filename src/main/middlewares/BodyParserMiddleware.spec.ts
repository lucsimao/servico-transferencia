import { BodyParserMiddleware } from '.';
import express from 'express';

jest.mock('express');
express.json = jest.fn().mockReturnValue('any_value');

const makeSut = () => {
  const sut = BodyParserMiddleware;

  return { sut };
};

describe(BodyParserMiddleware.name, () => {
  describe(BodyParserMiddleware.getMiddleware.name, () => {
    it('should return a middleware when method is invoked', () => {
      const { sut } = makeSut();

      const result = sut.getMiddleware();

      expect(result).toEqual(express.json());
    });
  });
});
