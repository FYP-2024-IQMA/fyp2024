import * as sectionController from "../controllers/sectionController";

import { Router } from "express";

const router = Router();

/* READ */
router.get("/sectiondetails", sectionController.getAllSections);
router.get("/sectiondetails/:sectionID", sectionController.getSectionDetails);

export default router;
