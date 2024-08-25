import * as quizController from '../controllers/quizController';

import { Router } from 'express';

const router = Router();

/* READ */
router.get('/getallquizzes', quizController.getAllQuizzes);
router.get('/getquizzesbysectionid/:id', quizController.getQuizzesBySectionId);

export default router;