import {
  makeControllerStub,
  makeFakeExpressRequest,
  makeFakeExpressResponse,
} from '../tests/testHelper';

import { ExpressRouteAdapter } from './ExpressRouteAdapter';

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

      const adaptedRoute = await sut.adapt(controllerStub);
      await adaptedRoute(req, res);

      expect(controllerStub.handle).toBeCalledWith(req);
    });

    it('Should call res.json with response.body when controller returns success response', async () => {
      const { sut } = makeSut();
      const controllerStub = makeControllerStub();
      const req = makeFakeExpressRequest();
      const res = makeFakeExpressResponse();

      const adaptedRoute = await sut.adapt(controllerStub);
      await adaptedRoute(req, res);

      expect(res.status).toBeCalledWith(999);
      expect(res.json).toBeCalledWith('any_controller_body');
    });

    it('Should call res.json with response.body.message when controller returns error response', async () => {
      const { sut } = makeSut();
      const controllerStub = makeControllerStub();
      const req = makeFakeExpressRequest();
      const res = makeFakeExpressResponse();
      controllerStub.handle.mockResolvedValueOnce({
        statusCode: 999,
        body: new Error('any_controller_error'),
      });

      const adaptedRoute = await sut.adapt(controllerStub);
      await adaptedRoute(req, res);

      expect(res.status).toBeCalledWith(999);
      expect(res.json).toBeCalledWith({ error: 'any_controller_error' });
    });

    it('Should throw when controller throws', async () => {
      const { sut } = makeSut();
      const controllerStub = makeControllerStub();
      const req = makeFakeExpressRequest();
      const res = makeFakeExpressResponse();
      controllerStub.handle.mockRejectedValueOnce(
        new Error('any_controller_error')
      );

      const adaptedRoute = await sut.adapt(controllerStub);
      const promise = adaptedRoute(req, res);

      await expect(promise).rejects.toThrow(new Error('any_controller_error'));
    });
  });
});
