import dotenv from "dotenv";
dotenv.config();

import express from"express";
import mongoose from "mongoose";
import { connectToSocket } from "./controller/socketManager.js";
import { createServer } from "node:http";
import cors from "cors";
import userRoutes from './routes/users.js'
const app =  express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 3000);
app.use(cors());
app.use(express.json({limit : "40kb"}));
app.use(express.urlencoded({limit : "40kb", extended : true}));

// let localDbUrl = "mongodb://127.0.0.1:27017/VidChat";
let mongodbUrl = process.env.CONNECTDB;

const start = async () => {
    const connectDB = await mongoose.connect(mongodbUrl);
    console.log(connectDB.connection.host);
    server.listen(app.get("port"), () => {
      console.log(`LISTENING ON PORT : ${app.get("port")}`);
    })
}   

start();
app.use("/api/v1/users/", userRoutes);