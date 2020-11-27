import express from "express";
import { config } from "./config";
import { URLShorternerController } from "./controller";
import { Mongo } from "./db/mongo";
import { Db, MongoClient } from "mongodb";
import { AnAbstraction } from "./abstraction";

const app = express();

MongoClient.connect(config.db.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((client) => {
  const mongo = new Mongo(client.db(config.db.name));
  const abstraction = new AnAbstraction(mongo);
  const controller = new URLShorternerController(abstraction);
  app.use(express.json());
  app.use("/api/v1", controller.router);

  app.listen(3000, () => {
    console.log("Connected to DB. App listening on port 3000.");
  });
});
