import express from "express";
import { register, login, getProfile, updateProfile } from "../controller/usercontroller.js";
import authMiddleware from "../middlewares/auth.js";
import upload from "../middlewares/multerimg.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, upload.single("profilePic"), updateProfile);

export default router;