import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number },
  weight: { type: Number },
  height: { type: Number },
  gender: { type: String, enum: ["male", "female", "other"] },
  profilePic: { type: String, default: "" },
}, { timestamps: true });

export default mongoose.model("User", userSchema);