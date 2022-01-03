import { HttpResponse } from '../interfaces/HttpResponse';
import httpStatusCode from 'http-status-codes';

export const created = <T>(body: T): HttpResponse => {
  return {
    statusCode: httpStatusCode.CREATED,
    body,
  };
};

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: httpStatusCode.BAD_REQUEST,
    body: error,
  };
};

export const internalServerError = (error: Error): HttpResponse => {
  return {
    statusCode: httpStatusCode.INTERNAL_SERVER_ERROR,
    body: error,
  };
};
