import { HttpRequest } from '../interfaces/HttpRequest';
import { HttpResponse } from '../interfaces/HttpResponse';

export class CreateTransferController {
  handle(_httpRequest: HttpRequest): HttpResponse {
    return {
      statusCode: 500,
      body: { message: 'Internal server error' },
    };
  }
}
