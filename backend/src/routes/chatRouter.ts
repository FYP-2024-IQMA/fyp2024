import { Router } from "express";
import * as chatController from "../controllers/chatController";

const router = Router();

/* CREATE */
router.post("/createchathistory", chatController.createChats);

/* READ */
router.get("/getchathistory", chatController.getChatHistory);

/* DELETE */
router.delete("/deletechathistory", chatController.deleteChat);

export default router;
