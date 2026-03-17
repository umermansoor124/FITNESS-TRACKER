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
  console.log("uploads folder created!");
}

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use("/api/user", userRouter);
app.use("/api/workout", workoutRouter);

app.get("/", (req, res) => res.send("Fitness Tracker API Running"));

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});