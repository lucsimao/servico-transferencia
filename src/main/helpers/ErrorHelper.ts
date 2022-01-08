import {
  badRequest,
  internalServerError,
  tooManyRequests,
} from '../../presentation/helpers/httpHelpers';

import { ExpiredTransferError } from '../../data/errors/ExpiredTransferError';
import { TooManyRequestsError } from '../errors/TooManyRequestsError';

export class ErrorHelper {
  public static format(error: Error) {
    if (error instanceof TooManyRequestsError) {
      return tooManyRequests(error);
    }
    if (error instanceof ExpiredTransferError) {
      return badRequest(error);
    }
    return internalServerError(error);
  }
}
