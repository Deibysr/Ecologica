import { createMessage } from "../controllers/Message/createMessage.js";
import express from "express";
import createForum from "../controllers/Forum/createForum.js";
import authToken from "../middleware/authToken.js";

const router = express.Router()

router.post("/create", authToken, createForum)
router.post('/:forumId/messages', authToken, createMessage);



export default router