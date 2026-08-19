import express from "express";
import { createServer } from "node:http";

import { Server } from "socket.io";

import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";

import cors from "cors";
import userRoute from "./routes/usersroute.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit: "40kb", extended: true}));

app.use("/api/v1/users", userRoute);

const start = async () => {
  app.set("mongo_user");
  const connectionDb = await mongoose.connect(
    "mongodb://anas708khan_db_user:nCngosGKqRloEHmu@ac-9hnq7f5-shard-00-00.oirgznn.mongodb.net:27017,ac-9hnq7f5-shard-00-01.oirgznn.mongodb.net:27017,ac-9hnq7f5-shard-00-02.oirgznn.mongodb.net:27017/?ssl=true&replicaSet=atlas-bgog5i-shard-0&authSource=admin&appName=zoomcloneCluster",
  );

  console.log(`MONGO Connected DB Host: ${connectionDb.connection.host}`);
  server.listen(app.get("port"), () => {
    console.log("LISTENIN ON PORT 8000");
  });
};

start();
