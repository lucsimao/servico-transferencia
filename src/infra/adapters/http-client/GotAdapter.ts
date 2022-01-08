import { HttpClient, HttpOptions, HttpResponse } from '../../interfaces';
import got, { OptionsOfJSONResponseBody } from 'got';

export class GotAdapter implements HttpClient {
  async get<T>(url: string, options?: HttpOptions): Promise<HttpResponse<T>> {
    const gotOptions: OptionsOfJSONResponseBody = {
      responseType: 'json',
      ...(options as OptionsOfJSONResponseBody),
    };
    const result = await got.get<T>(url, gotOptions);

    return { statusCode: result.statusCode, body: result.body as T };
  }

  public async post<T, K>(
    url: string,
    options?: HttpOptions
  ): Promise<HttpResponse<K>> {
    const gotOptions: OptionsOfJSONResponseBody = {
      responseType: 'json',
      json: options?.body as Record<string, T>,
      headers: options?.headers,
    };

    const result = await got.post<K>(url, gotOptions);

    return { statusCode: result.statusCode, body: result.body as K };
  }
}
