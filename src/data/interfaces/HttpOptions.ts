import { HttpHeaders } from './HttpHeaders';
export interface HttpOptions<T = unknown> {
  headers?: HttpHeaders;
  body?: T;
}
