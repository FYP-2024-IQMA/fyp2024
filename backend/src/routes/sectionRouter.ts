import * as sectionController from "../controllers/sectionController";

import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";

const router = Router();

/* READ */
router.get("/sectiondetails", verifyToken, sectionController.getAllSections);
router.get(
	"/sectiondetails/:sectionID",
	verifyToken,
	sectionController.getSectionDetails
);

export default router;
