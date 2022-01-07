export interface DbClient<T> {
  find(externalId: number): Promise<T>;
  save(transfer: Partial<T>): Promise<T>;
  update(externalId: number, model: T): Promise<T>;
}
