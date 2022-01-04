import { HttpOptions } from './HttpOptions';
import { HttpResponse } from './HttpResponse';

export interface HttpClient {
  get<T, K>(uri: string, options: HttpOptions<T>): Promise<HttpResponse<K>>;

  post<T, K>(uri: string, options: HttpOptions<T>): Promise<HttpResponse<K>>;
}
