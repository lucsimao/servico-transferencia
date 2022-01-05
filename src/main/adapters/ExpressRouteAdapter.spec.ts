import { Request, Response } from 'express';

import { Controller } from '../../presentation/interfaces/Controller';
import { ExpressRouteAdapter } from './ExpressRouteAdapter';

const makeFakeExpressRequest = (): jest.Mocked<Request> => {
  const result: jest.Mocked<Partial<Request>> = {
    body: { value: 'any_request_body' },
  };
  return result as jest.Mocked<Request>;
};
const makeFakeExpressResponse = (): jest.Mocked<Response> => {
  const result: jest.Mocked<Partial<Response>> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  return result as jest.Mocked<Response>;
};

const makeControllerStub = (): jest.Mocked<Controller<unknown, unknown>> => ({
  handle: jest
    .fn()
    .mockReturnValue({ statusCode: 999, body: 'any_controller_body' }),
});

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

      expect(controllerStub.handle).toBeCalledWith(req.body);
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
