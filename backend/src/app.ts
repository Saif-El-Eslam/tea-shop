import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import cors from "cors";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.use(cors());

// Add routes with /api prefix
app.use("/api/auth", authRoutes);

export default app;
