import * as QuizController from '../controllers/quizController';

import { Router } from 'express';

const router = Router();

/* CREATE */
router.post("/createquiz", QuizController.createQuiz);

/* READ */
router.get('/getallquizzes', QuizController.getAllQuizzes);
router.get('/getquizzesbysectionid/:id', QuizController.getQuizzesBySectionId);
router.get("/getnumberofquizzesperunit/:id", QuizController.getNumberOfQuizzesPerUnit);
router.get("/getnumberofcompletedquizzes/:userid/:unitid", QuizController.getNumberOfCompletedQuizzes);

/* UPDATE */
router.patch('/updatequiz', QuizController.updateQuiz);

/* DELETE */
// router.delete('/deleteQuiz/:id', QuizController.deleteQuiz);

export default router;