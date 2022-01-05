import { ApiHttpRequest } from './ApiHttpRequest';
import { ApiHttpResponse } from './ApiHttpResponse';

export interface Controller<T, K> {
  handle(
    apiHttpRequest: ApiHttpRequest<T>
  ): Promise<ApiHttpResponse<K | Error>>;
}
