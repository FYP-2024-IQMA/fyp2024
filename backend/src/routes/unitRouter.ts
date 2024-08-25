import * as unitController from '../controllers/unitController';

import { Router } from 'express';

const router = Router();

/* READ */
router.get("/gettotalunit/:sectionID", unitController.getNoOfUnitPerSection);

export default router;