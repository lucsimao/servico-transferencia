import {
  CreateTransfer,
  CreateTransferParams,
} from '../../domain/use-cases/CreateTransfer';

import { ApiHttpRequest } from '../interfaces';
import { makeFakeTransferModel } from '../../data/test/testHelper';

export const makeCreateTransferStub = (): jest.Mocked<CreateTransfer> => ({
  create: jest.fn().mockResolvedValue(makeFakeTransferModel()),
});

export const makeFakeApiHttpRequest = () => {
  return {} as ApiHttpRequest<CreateTransferParams>;
};
