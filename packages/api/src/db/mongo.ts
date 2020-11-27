import { response } from "express";
import { Db } from "mongodb";
import { config } from "../config";
import { IDatabase } from "./db-interface";

export class Mongo implements IDatabase {
  db: Db;
  constructor(db: Db) {
    this.db = db;
  }

  public async getAll() {
    const results = await this.db
      .collection(config.db.collection)
      .find()
      .toArray();
    return results;
  }

  public async delete(id: string) {
      await this.db.collection(config.db.collection).deleteOne({_id: id});
      return;
  }

  public async insert(id: string, body: {}) {
    const document = {
      _id: id,
      ...body,
    };
    const result = await this.db
      .collection(config.db.collection)
      .insertOne(document);

    return result;
  }

  public async update(id: string, newUrl: string) {
    const update = await this.db
      .collection(config.db.collection)
      .findOneAndUpdate({ _id: id }, { $set: { originalUrl: newUrl } })

    const updatedValue: { originalUrl: string; _id: string } = update.value 
    return updatedValue;
  }
}
