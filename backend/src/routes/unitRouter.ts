import * as unitController from '../controllers/unitController';
import verifyToken from '../middleware/authMiddleware';

import { Router } from 'express';

const router = Router();

/* READ */
router.get("/gettotalunit/:sectionID",verifyToken, unitController.getNoOfUnitPerSection);
router.get("/getallunitsbysection/:sectionID",verifyToken, unitController.getAllUnitsBySection);
router.get("/getallunitsbysectionandunit/:sectionID/:unitID",verifyToken, unitController.getUnitDetailsBySectionandUnit);

export default router;