import * as unitController from '../controllers/unitController';
import verifyToken from '../middleware/authMiddleware';

import { Router } from 'express';

const router = Router();

/* READ */
router.get("/gettotalunit/:sectionID",verifyToken, unitController.getNoOfUnitPerSection);

export default router;