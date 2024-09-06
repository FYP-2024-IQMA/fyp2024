import * as lessonController from "../controllers/lessonController";

import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";

const router = Router();

/* READ */
router.get(
	"/getnumberoflessons/:sectionID/:unitID",
	lessonController.getNoOfLessonPerUnit
);
router.get(
	"/getlesson/:sectionID/:unitID/:lessonID",
	lessonController.getLesson
);
router.get("/getalllessons/:sectionID/:unitID", lessonController.getAllLessons);

export default router;
