import * as userProgressController from "../controllers/userProgressController";

import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";

const router = Router();

router.get(
	"/getuserprogressbyidandsection/:sectionID/:userID",
	verifyToken,
	userProgressController.getUserProgressBySection
);

export default router;