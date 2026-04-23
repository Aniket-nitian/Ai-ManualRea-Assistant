import express from "express";
import uploadRoutes from "./api/routes/upload.routes.js";
import chatRoutes from "./api/routes/chat.routes.js";
import dotenv from "dotenv";

const app = express();

dotenv.config();
app.use(express.json());

app.use("/api/upload", uploadRoutes);
app.use("/api/chat", chatRoutes);

export default app;
