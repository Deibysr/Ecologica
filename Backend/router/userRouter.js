import express from "express";
import { registerUser } from "../controllers/User/register.js";
import { loginUser } from "../controllers/User/login.js";
import authToken from '../middleware/authToken.js';

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/ejemplo", authToken, (req, res) =>{
    console.log("Ruta ejemplo");
    res.json(req.user);
    
})

export default router