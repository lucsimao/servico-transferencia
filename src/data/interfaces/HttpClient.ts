import { HttpOptions, HttpResponse } from '../interfaces';

export interface HttpClient {
  get<T, K>(uri: string, options: HttpOptions<T>): Promise<HttpResponse<K>>;

  post<T, K>(uri: string, options: HttpOptions<T>): Promise<HttpResponse<K>>;
}
