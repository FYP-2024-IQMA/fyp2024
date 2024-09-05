import * as quizController from '../controllers/quizController';
import verifyToken from '../middleware/authMiddleware';

import { Router } from 'express';

const router = Router();

/* READ */
router.get('/getallquizzes', verifyToken,quizController.getAllQuizzes);
router.get('/getquizzesbysectionid/:id', verifyToken,quizController.getQuizzesBySectionId);

export default router;