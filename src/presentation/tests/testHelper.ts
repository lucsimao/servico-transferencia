import {
  CreateTransfer,
  CreateTransferParams,
} from '../../domain/use-cases/CreateTransfer';
import {
  makeFakeTransferDataParams,
  makeFakeTransferModel,
} from '../../data/test/testHelper';

import { ApiHttpRequest } from '../interfaces';
import { Controller } from '../interfaces/Controller';
import { CreateTransferValidator } from '../interfaces/CreateTransferValidator';

export const makeCreateTransferStub = (): jest.Mocked<CreateTransfer> => ({
  create: jest.fn().mockResolvedValue(makeFakeTransferModel()),
});

export const makeFakeApiHttpRequest = () => {
  return {} as ApiHttpRequest<CreateTransferParams>;
};

export const makeCreateTransferValidatorStub =
  (): jest.Mocked<CreateTransferValidator> => ({
    validate: jest.fn().mockReturnValue(makeFakeTransferDataParams()),
  });

export const makeControllerStub = (): jest.Mocked<
  Controller<unknown, unknown>
> => ({
  handle: jest
    .fn()
    .mockReturnValue({ statusCode: 999, body: 'any_controller_body' }),
});
