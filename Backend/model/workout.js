import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  category: {
    type: String,
    enum: ["Cardio", "Strength", "Flexibility", "Balance"],
    required: true
  },
  duration: { type: Number, required: true },
  calories: { type: Number, required: true },
  sets: { type: Number, default: 0 },
  reps: { type: Number, default: 0 },
  notes: { type: String, default: "" },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model("Workout", workoutSchema);