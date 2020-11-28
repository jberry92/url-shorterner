import { Db } from "mongodb";
import { IDatabase } from "./db-interface";

export class Mongo implements IDatabase {
  db: Db;
  collection: string;
  constructor(db: Db, collection: string) {
    this.db = db;
    this.collection = collection;
  }

  public async getAll() {
    const results = await this.db.collection(this.collection).find().toArray();
    return results;
  }

  public async delete(id: string) {
    await this.db.collection(this.collection).deleteOne({ _id: id });
    return;
  }

  public async insert(id: string, body: {}) {
    const document = {
      _id: id,
      ...body,
    };
    const result = await this.db
      .collection(this.collection)
      .insertOne(document);

    return result;
  }

  public async update(id: string, newUrl: string) {
    const update = await this.db
      .collection(this.collection)
      .findOneAndUpdate({ _id: id }, { $set: { fullUrl: newUrl } });

    const updatedValue: { fullUrl: string; _id: string } = update.value;
    return updatedValue;
  }
}
