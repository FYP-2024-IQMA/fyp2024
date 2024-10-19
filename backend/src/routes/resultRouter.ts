import * as resultController from "../controllers/resultController";

import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";

const router = Router();

/* CREATE */
router.post("/createresult", verifyToken, resultController.createResult);

/* READ */
router.get("/getallresults", verifyToken, resultController.getAllResults);
router.get(
    "/checkifcompletedquiz/:userid/:quizid",
    verifyToken,
    resultController.checkIfCompletedQuiz
);
router.get(
    "/checkifcompletedsection/:userid/:sectionid",
    verifyToken,
    resultController.checkIfCompletedSection
);
router.get(
	"/getuserprogress/:userid/:sectionid?",
	verifyToken,
	resultController.getUserProgress
);
router.get(
	"/getcircularprogress/:userid/:sectionid/:unitid",
	verifyToken,
	resultController.getCircularProgress
);
router.get(
    "/getnoofcompletedlessons/:userid/:sectionid/:unitid",
    verifyToken,
    resultController.getNoOfCompletedLesson
);

export default router;
