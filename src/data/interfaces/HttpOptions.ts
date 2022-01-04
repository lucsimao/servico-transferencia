import { HttpHeaders } from './index';
export interface HttpOptions<T = unknown> {
  headers?: HttpHeaders;
  body?: T;
}
