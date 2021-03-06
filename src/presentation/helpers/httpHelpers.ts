import { ApiHttpResponse } from '../interfaces';
import httpStatusCode from 'http-status-codes';

export const created = <T>(body: T): ApiHttpResponse<T> => {
  return {
    statusCode: httpStatusCode.CREATED,
    body,
  };
};

export const badRequest = (error: Error): ApiHttpResponse<Error> => {
  return {
    statusCode: httpStatusCode.BAD_REQUEST,
    body: error,
  };
};

export const internalServerError = (error: Error): ApiHttpResponse<Error> => {
  return {
    statusCode: httpStatusCode.INTERNAL_SERVER_ERROR,
    body: error,
  };
};

export const tooManyRequests = (error: Error): ApiHttpResponse<Error> => {
  return {
    statusCode: httpStatusCode.TOO_MANY_REQUESTS,
    body: error,
  };
};
