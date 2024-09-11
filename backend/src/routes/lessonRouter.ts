import * as lessonController from "../controllers/lessonController";

import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";

const router = Router();

/* READ */
router.get(
	"/getnumberoflessons/:sectionID/:unitID",
	verifyToken,
	lessonController.getNoOfLessonPerUnit
);
router.get(
	"/getlesson/:sectionID/:unitID/:lessonID",
	verifyToken,
	lessonController.getLesson
);
router.get(
	"/getalllessons/:sectionID/:unitID",
	verifyToken,
	lessonController.getAllLessons
);

export default router;
