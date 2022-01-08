import { HttpOptions, HttpResponse } from '.';

export interface HttpClient {
  get<T>(uri: string, options: HttpOptions): Promise<HttpResponse<T>>;

  post<T, K>(uri: string, options: HttpOptions<T>): Promise<HttpResponse<K>>;
}
