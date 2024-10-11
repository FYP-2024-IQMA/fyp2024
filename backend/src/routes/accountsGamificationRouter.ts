import * as accountsGamificationController from '../controllers/accountsGamificationController';

import { Router } from 'express';
import verifyToken from '../middleware/authMiddleware';

const router = Router();

/* READ */
router.get('/gamificationdata/:userid', accountsGamificationController.getGamificationData);
router.get('/leaderboard/:userid', accountsGamificationController.getTop5Accounts);

/* UPDATE */
router.patch('/updatepoints', accountsGamificationController.updatePoints);

export default router;