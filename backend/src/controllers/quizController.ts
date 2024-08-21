import * as QuizService from "../services/quizService";

import { Request, Response } from "express";

/* CREATE */

export const createQuiz = async (req: Request, res: Response) => {
    const QuizBody = req.body;

    try {
        const Quiz = await QuizService.createQuiz(QuizBody);
        res.status(201).json({
            quizID: Quiz[0].quizID,
            status: 201,
            statusText: "Created",
        });
    } catch (error) {
        res.status(500).json({
            error: `Failed to create ${QuizBody.role} Quiz`,
        });
    }
};

/* READ */

export const getAllQuizzes = async (req: Request, res: Response) => {
    try {
        const Quizzes = await QuizService.getAllQuizzes();
        res.status(200).json(Quizzes);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve Quizzes" });
    }
};

export const getQuizById = async (req: Request, res: Response) => {
    try {
        const Quiz = await QuizService.getQuizByUserId(req.params.id);
        res.status(200).json(Quiz);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve Quiz" });
    }
};

export const getNumberOfCompletedQuizzes = async (req: Request, res: Response) => {
    try {
        const Quizs = await QuizService.getNumberOfCompletedQuizzes(req.params.userID);
        res.status(200).json(Quizs);
    } catch (error) {
        res.status(500).json({
            error: `Failed to retrieve number of ${req.params.userID}'s completed quizzes`,
        });
    }
};


/* UPDATE */

export const updateQuiz = async (req: Request, res: Response) => {
    const Quiz = req.body;

    try {
        const response = await QuizService.updateQuiz(Quiz);
        res.status(200).json({
            status: 200,
            statusText: "Quiz Updated Successfully",
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to update Quiz" });
    }
};

/* DELETE */

// export const deleteQuiz = async (req: Request, res: Response) => {
//     try {
//         const response = await QuizService.deleteQuiz(req.params.id);
//         // response body will be empty
//         res.status(200).json({
//             status: 200,
//             statusText: "Quiz Deleted Successfully",
//         });
//     } catch (error) {
//         res.status(500).json({ error: "Failed to delete Quiz" });
//     }
// };
