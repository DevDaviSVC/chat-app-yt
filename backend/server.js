import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from 'path';

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import {app, server} from './socket/socket.js'

import { connectToMongoDb } from "./db/connectToMongoDb.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// middlewares
app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body) allows json in requests
app.use(cookieParser()); // allows us to access the cookies
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// turn server on
server.listen(PORT, () => {
    connectToMongoDb();
    console.log(`Server running on port ${PORT}!`);
});