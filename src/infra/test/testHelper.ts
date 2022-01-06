import {
  makeFakeHttpResponse,
  makeFakeTransferModel,
} from '../../data/test/testHelper';

import { HttpClient } from '../../data/interfaces';
import { Logger } from '../../data/interfaces/logger/Logger';

export const makeLoggerStub = (): jest.Mocked<Logger> => ({
  info: jest.fn(),
  warning: jest.fn(),
  error: jest.fn(),
});

export const makeHttpClientStub = (): jest.Mocked<HttpClient> => ({
  get: jest.fn().mockReturnValue(makeFakeHttpResponse(makeFakeTransferModel())),
  post: jest
    .fn()
    .mockReturnValue(makeFakeHttpResponse(makeFakeTransferModel())),
});
