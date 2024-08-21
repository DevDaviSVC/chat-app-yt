import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import { connectToMongoDb } from "./db/connectToMongoDb.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body) allows json in requests
app.use(cookieParser()); // allows us to access the cookies

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);


// turn server on
app.listen(PORT, () => {
    connectToMongoDb();
    console.log(`Server running on port ${PORT}!`);
});