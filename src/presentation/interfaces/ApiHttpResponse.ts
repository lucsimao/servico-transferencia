export interface ApiHttpResponse<T> {
  statusCode: number;
  body: T;
}
