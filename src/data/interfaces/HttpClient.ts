export interface HttpClient {
  post<T, K>(endpoint: string, body: T): Promise<K>;
}
