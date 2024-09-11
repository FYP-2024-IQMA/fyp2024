import * as unitController from "../controllers/unitController";

import { Router } from "express";
import verifyToken from "../middleware/authMiddleware";

const router = Router();

/* READ */
router.get(
	"/gettotalunit/:sectionID",
	verifyToken,
	unitController.getNoOfUnitPerSection
);
router.get(
	"/getallunitsbysection/:sectionID",
	verifyToken,
	unitController.getAllUnitsBySection
);
router.get(
	"/getallunitsbysectionandunit/:sectionID/:unitID",
	verifyToken,
	unitController.getUnitDetailsBySectionAndUnit
);

export default router;
