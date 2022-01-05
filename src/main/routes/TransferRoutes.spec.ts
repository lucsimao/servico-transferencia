import { CreateTransferControllerFactory } from '../factories/CreateTransferControllerFactory';
import { ExpressRouteAdapter } from './../adapters/ExpressRouteAdapter';
import { TransferRoutes } from './TransferRoutes';
import { makeRouterStub } from '../tests/testHelper';
jest.mock('express');
jest.mock('../../main/adapters/ExpressRouteAdapter');
jest.mock('./../factories/CreateTransferControllerFactory');

const makeSut = () => {
  const sut = TransferRoutes;

  return { sut };
};

describe(TransferRoutes.name, () => {
  describe(TransferRoutes.setRoutes.name, () => {
    it('should call correct routes when method is invoked', () => {
      const { sut } = makeSut();
      const router = makeRouterStub();
      const createTransferFactorySpy = (
        jest.spyOn(CreateTransferControllerFactory, 'create') as jest.Mock
      ).mockReturnValueOnce('any_create_transfer');
      const expressAdaptSpy = (
        jest.spyOn(ExpressRouteAdapter, 'adapt') as jest.Mock
      ).mockReturnValueOnce('any_route_value');

      sut.setRoutes(router);

      expect(createTransferFactorySpy).toBeCalledWith();
      expect(expressAdaptSpy).toBeCalledWith('any_create_transfer');
      expect(router.post).toBeCalledWith('/transfer', 'any_route_value');
    });
  });
});
