import * as QuizController from '../controllers/quizController';

import { Router } from 'express';

const router = Router();

/* CREATE */
router.post("/createquiz", QuizController.createQuiz);

/* READ */
router.get('/getallquizzes', QuizController.getAllQuizzes);
router.get('/getquizbyid/:id', QuizController.getQuizById);
router.get("/getquizsbyrole/:role", QuizController.getNumberOfCompletedQuizzes);

/* UPDATE */
router.patch('/updatequiz', QuizController.updateQuiz);

/* DELETE */
// router.delete('/deleteQuiz/:id', QuizController.deleteQuiz);

export default router;