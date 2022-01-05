import { CreateTransferControllerFactory } from '../factories/CreateTransferControllerFactory';
import { ExpressRouteAdapter } from './../adapters/ExpressRouteAdapter';
import { Router } from 'express';
import { TransferRoutes } from './TransferRoutes';
jest.mock('express');
jest.mock('../../main/adapters/ExpressRouteAdapter');
jest.mock('./../factories/CreateTransferControllerFactory');

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
