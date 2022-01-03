import {
  CreateTransfer,
  CreateTransferParams,
} from '../../domain/use-cases/CreateTransfer';
import {
  badRequest,
  created,
  internalServerError,
} from '../helpers/httpHelpers';

import { ExpiredTransferError } from '../errors/ExpiredTransferError';
import { HttpRequest } from '../interfaces/HttpRequest';
import { HttpResponse } from '../interfaces/HttpResponse';

export class CreateTransferController {
  constructor(private readonly createTransfer: CreateTransfer) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const transferParam = httpRequest.body as CreateTransferParams;
      const result = await this.createTransfer.create(transferParam);

      return created(result);
    } catch (error) {
      if (error instanceof ExpiredTransferError) {
        return badRequest(error);
      }

      return internalServerError(error as Error);
    }
  }
}
