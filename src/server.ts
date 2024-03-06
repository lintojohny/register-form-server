import express from "express";
import { createServer } from "http";
import * as usersController from "./controllers/user";
import bodyParser from "body-parser";
import cors from "cors";
import connect from "./database/connection";
import { validateBody } from "./middleware/register-user-middleware";

const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API is UP");
});

app.post("/api/users", validateBody, usersController.register);

connect().then(() => {
  try {
    console.log("connected to mongodb");
    httpServer.listen(4001, () => {
      console.log(`API is listening on port 4001`);
    });
  } catch (error) {
    console.log("Failed to connect MongoDb");
  }
});
