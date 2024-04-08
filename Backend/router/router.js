import express from "express";
import { registerUser } from "../controllers/userController.js";


const router = express.Router()

router.get("/", (req, res) => {
    res.send("Hola Mundo")
})

router.post("/user/register", registerUser)

export default router