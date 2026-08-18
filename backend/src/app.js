import express from "express";
import { createServer } from "node:http";

import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";

const app = express();
const server = createServer(app);
connectToSocket(server);

app.set("port", process.env.PORT || 8000);
app.use(cors());



const start = () => {
  server.listen(app.get("port"), () => {
    console.log(`Listening on port ${app.get("port")}`);
  });

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.warn("MONGODB_URI is not set; starting without a database connection.");
    return;
  }

  mongoose.connect(mongoUri)
    .then((connectionDB) => {
      console.log(`MongoDB connected: ${connectionDB.connection.host}`);
    })
    .catch((error) => {
      console.error(`MongoDB connection failed: ${error.message}`);
    });
};

start();
