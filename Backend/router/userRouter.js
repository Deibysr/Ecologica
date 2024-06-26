import express from "express";
import { registerUser } from "../controllers/User/register.js";
import { loginUser } from "../controllers/User/login.js";

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)

export default router