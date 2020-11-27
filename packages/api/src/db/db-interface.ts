export interface IDatabase {
  getAll(): Promise<{ fullUrl: string; _id: string }[]>;
  insert(id: string, body: { fullUrl: string }): Promise<any>;
  delete(id: string): Promise<void>;
  update(
    id: string,
    fullUrl: string
  ): Promise<{ originalUrl: string; _id: string }>;
}
