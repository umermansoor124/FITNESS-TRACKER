import express from "express";
import { addWorkout, getWorkouts, deleteWorkout, getStats } from "../controller/workoutcontroller.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", authMiddleware, addWorkout);
router.get("/all", authMiddleware, getWorkouts);
router.delete("/:id", authMiddleware, deleteWorkout);
router.get("/stats", authMiddleware, getStats);

export default router;