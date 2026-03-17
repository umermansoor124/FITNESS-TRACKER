import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./connection/connect.js";
import userRouter from "./Router/userrouter.js";
import workoutRouter from "./Router/workoutrouter.js";
import fs from "fs";
import path from "path";

dotenv.config();
const app = express();

// uploads folder auto-create
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// CORS fix
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://umer-fitness-tracker.netlify.app",
    "https://rad-cactus-940a78.netlify.app",
    "https://euphonious-alfajores-903c6f.netlify.app",
  ],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use("/api/user", userRouter);
app.use("/api/workout", workoutRouter);

app.get("/", (req, res) => res.send("Fitness Tracker API Running"));

connectDB().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
  });
});