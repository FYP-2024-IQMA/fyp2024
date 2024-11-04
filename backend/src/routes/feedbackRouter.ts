import * as feedbackController from '../controllers/feedbackController';
import { Router } from 'express';
import verifyToken from '../middleware/authMiddleware';

const router = Router();

router.post('/sendFeedback', verifyToken, feedbackController.sendFeedback);

export default router;