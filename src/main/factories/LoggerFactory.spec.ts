import { LoggerFactory } from './LoggerFactory';
import { LoggerManager } from './../../infra/logger/LoggerManager';

const makeSut = () => {
  const sut = LoggerFactory;
  return { sut };
};

describe(`${LoggerFactory.name} Tests`, () => {
  describe(LoggerFactory.create.name, () => {
    it(`Should return an ${LoggerManager.name} instance`, () => {
      const { sut } = makeSut();

      const result = sut.create();

      expect(result).toBeInstanceOf(LoggerManager);
    });
  });
});
