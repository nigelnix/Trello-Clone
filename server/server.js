import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import boardRoutes from "./routes/board.js";
import columnRoutes from "./routes/column.js";
import cardRoutes from "./routes/card.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/columns", columnRoutes);
app.use("/api/cards", cardRoutes);

// Uniform Resource Identifies (the mongo bd link)
console.log("Attempting MongoDB connection...");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(5000, () => console.log("🚀 Server on 5000"));
  })
  .catch((err) => console.error("❌ Mongo error:", err));
