export interface HttpResponse<T = unknown> {
  statusCode: number;
  body: T;
}
