import * as accountsGamificationController from '../controllers/accountsGamificationController';

import { Router } from 'express';
import verifyToken from '../middleware/authMiddleware';

const router = Router();

/* READ */
router.get('/gamificationdata/:userid', verifyToken, accountsGamificationController.getGamificationData);
router.get("/leaderboard/:userid", verifyToken, accountsGamificationController.getTop5Accounts);

/* UPDATE */
router.patch('/updatepoints', verifyToken, accountsGamificationController.updatePoints);

export default router;