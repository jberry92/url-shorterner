import express from "express";
import cors from "cors";
import { config } from "./config";
import { URLShorternerController } from "./controller";
import { Mongo } from "./db/mongo";
import { MongoClient } from "mongodb";
import { Shortener } from "./shortener/index";

const app = express();

MongoClient.connect(config.db.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((client) => {
  const mongo = new Mongo(client.db(config.db.name));
  const shortener = new Shortener(mongo);
  const controller = new URLShorternerController(shortener);
  app.use(express.json());
  app.use("/api/v1", cors(), controller.router);

  app.listen(3000, () => {
    console.log("Connected to DB. App listening on port 3000.");
  });
});
