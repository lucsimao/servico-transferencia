import { SwaggerUiRoutes } from '.';
import express from 'express';
import { makeRouterStub } from '../tests/testHelper';
jest.mock('express');
jest.mock('openapi-comment-parser');
jest.mock('swagger-ui-express', () => ({
  serve: { any: 'server' },
  setup: jest.fn().mockReturnValue({ any: 'value' }),
}));
express.Router = () => makeRouterStub();

const makeSut = () => {
  const sut = SwaggerUiRoutes;

  return { sut };
};

describe(SwaggerUiRoutes.name, () => {
  describe(SwaggerUiRoutes.setRoutes.name, () => {
    it('Should return value when method is called', () => {
      const { sut } = makeSut();
      const router = makeRouterStub();

      sut.setRoutes(router);

      expect(router.use).toBeCalledWith(
        '/docs',
        { any: 'server' },
        { any: 'value' }
      );
    });
  });
});
