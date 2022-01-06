export interface DbClient<T> {
  find(external: string): Promise<T>;
  save(transfer: Partial<T>): Promise<T>;
  update(external: string, model: T): Promise<T>;
}
