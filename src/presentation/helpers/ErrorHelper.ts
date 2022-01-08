import {
  badRequest,
  internalServerError,
  tooManyRequests,
} from './httpHelpers';

import { ExpiredTransferError } from '../../data/errors/ExpiredTransferError';
import { InvalidParamsError } from '../../infra/errors/InvalidParamsError';
import { TooManyRequestsError } from '../../main/errors/TooManyRequestsError';

export class ErrorHelper {
  public static format(error: Error) {
    if (error instanceof TooManyRequestsError) {
      return tooManyRequests(error);
    }
    if (error instanceof ExpiredTransferError) {
      return badRequest(error);
    }
    if (error instanceof InvalidParamsError) {
      return badRequest(error);
    }
    return internalServerError(error);
  }
}
