import { createMessage } from "../controllers/Message/createMessage.js";
import express from "express";
import createForum from "../controllers/Forum/createForum.js";
import authToken from "../middleware/authToken.js";
import checkIsAdmin from "../middleware/checkIsAdmin.js";
import getAllForums from "../controllers/Forum/getAllForums.js";
import deleteForum from "../controllers/Forum/deleteForum.js";
import getAllMessages from "../controllers/Message/getAllMessages.js";

const router = express.Router();

router.post("/create", authToken, checkIsAdmin, createForum);
router.delete('/:forumIdDelete', authToken, checkIsAdmin, deleteForum);
router.post('/:forumId/message', authToken, createMessage);
router.get('/:forumId/getAllMessages', getAllMessages);
router.get("/getAll", getAllForums);

export default router;