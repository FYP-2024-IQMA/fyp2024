import * as questionController from "../controllers/questionController";

import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";

const router = Router();

/* READ */
router.get(
	"/getquestions/:sectionid/:unitid?/:lessonid?",
	questionController.getQuizQuestions
);

export default router;
