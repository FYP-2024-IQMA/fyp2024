import * as chatController from "../controllers/chatController";

import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";

const router = Router();

/* CREATE */
router.post("/createchathistory", verifyToken, chatController.createChats);

/* READ */
router.get(
	"/getchathistory/:userid/:sectionid",
	verifyToken,
	chatController.getChatHistory
);

/* DELETE */
router.delete(
	"/deletechathistory/:userid/:sectionid",
	verifyToken,
	chatController.deleteChat
);

export default router;
