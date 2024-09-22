import * as quizController from "../controllers/quizController";

import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";

const router = Router();

/* READ */
router.get("/getallquizzes", verifyToken, quizController.getAllQuizzes);
router.get(
	"/getquizzesbysectionid/:id",
	verifyToken,
	quizController.getQuizzesBySectionId
);

export default router;
