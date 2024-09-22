import * as clickstreamController from "../controllers/clickstreamController";
import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";

const router = Router();

router.post("/sendMessage", verifyToken, clickstreamController.sendMessage);

export default router;