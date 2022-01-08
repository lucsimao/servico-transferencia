import {
  makeFakeExpressRequest,
  makeFakeExpressResponse,
  makeFakeNextFunction,
} from '../tests/testHelper';

import { ExpressRouteAdapter } from './ExpressRouteAdapter';
import { makeControllerStub } from '../../presentation/tests/testHelper';

const makeSut = () => {
  const sut = ExpressRouteAdapter;

  return { sut };
};

describe(ExpressRouteAdapter.name, () => {
  describe(ExpressRouteAdapter.adapt.name, () => {
    it('Should call controller.handle when method is invoked', async () => {
      const { sut } = makeSut();
      const controllerStub = makeControllerStub();
      const req = makeFakeExpressRequest();
      const res = makeFakeExpressResponse();
      const next = makeFakeNextFunction();

      const adaptedRoute = await sut.adapt(controllerStub);
      await adaptedRoute(req, res, next);

      expect(controllerStub.handle).toBeCalledWith(req);
    });

    it('Should call res.json with response.body when controller returns success response', async () => {
      const { sut } = makeSut();
      const controllerStub = makeControllerStub();
      const req = makeFakeExpressRequest();
      const res = makeFakeExpressResponse();
      const next = makeFakeNextFunction();

      const adaptedRoute = await sut.adapt(controllerStub);
      await adaptedRoute(req, res, next);

      expect(res.status).toBeCalledWith(999);
      expect(res.json).toBeCalledWith('any_controller_body');
    });

    it('Should call res.json with response.body.message when controller returns error response', async () => {
      const { sut } = makeSut();
      const controllerStub = makeControllerStub();
      const req = makeFakeExpressRequest();
      const res = makeFakeExpressResponse();
      const next = makeFakeNextFunction();
      controllerStub.handle.mockResolvedValueOnce({
        statusCode: 999,
        body: new Error('any_controller_error'),
      });

      const adaptedRoute = await sut.adapt(controllerStub);
      await adaptedRoute(req, res, next);

      expect(res.status).toBeCalledWith(999);
      expect(res.json).toBeCalledWith({ error: 'any_controller_error' });
    });

    it('Should call next when controller throws', async () => {
      const { sut } = makeSut();
      const controllerStub = makeControllerStub();
      const req = makeFakeExpressRequest();
      const res = makeFakeExpressResponse();
      const next = makeFakeNextFunction();
      controllerStub.handle.mockRejectedValueOnce(
        new Error('any_controller_error')
      );

      const adaptedRoute = await sut.adapt(controllerStub);
      await adaptedRoute(req, res, next);

      expect(next).toBeCalledWith(new Error('any_controller_error'));
    });
  });
});
