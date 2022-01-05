import { CreateTransferController } from '../../presentation/controllers/CreateTransferController';
import { CreateTransferControllerFactory } from './CreateTransferControllerFactory';
import { LoggerManager } from '../../infra/logger/LoggerManager';

jest.mock('../../data/use-cases/CreateTransferData');
jest.mock('../../infra/http-client/GotAdapter');

const makeSut = () => {
  const sut = CreateTransferControllerFactory;
  return { sut };
};

describe(`${CreateTransferControllerFactory.name} Tests`, () => {
  describe(CreateTransferControllerFactory.create.name, () => {
    it(`Should return an ${LoggerManager.name} instance`, () => {
      const { sut } = makeSut();

      const result = sut.create();

      expect(result).toBeInstanceOf(CreateTransferController);
    });
  });
});
