import express from "express";
import cors from "cors";
import { config } from "./config";
import { URLShorternerController } from "./controller";
import { Mongo } from "./db/mongo";
import { MongoClient } from "mongodb";
import { Shortener } from "./shortener";

const createController = async () => {
  const dbConfig = config[process.env.ENVIRONMENT ?? 'dev'].db; 
  const client = await MongoClient.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const mongo = new Mongo(client.db(dbConfig.name), dbConfig.collection);
  const shortener = new Shortener(mongo);
  return new URLShorternerController(shortener);
};

export const createApp = async () => {
  const controller = await createController();
  const app = express();
  app.use(express.json());
  app.use("/api/v1", cors(), controller.router);
  return app;
};
