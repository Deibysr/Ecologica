import express from "express";
import createForum from "../controllers/Forum/create.js";
import authToken from "../middleware/authToken.js";

const router = express.Router()

router.post("/create", authToken, createForum)

export default router