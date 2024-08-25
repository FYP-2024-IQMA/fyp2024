import * as quizService from "../services/quizService";

import { Request, Response } from "express";

/* READ */

export const getAllQuizzes = async (req: Request, res: Response) => {
    try {
        const quizzes = await quizService.getAllQuizzes();
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve Quizzes" });
    }
};

export const getQuizzesBySectionId = async (req: Request, res: Response) => {
    try {
        const quiz = await quizService.getQuizzesBySectionId(req.params.id);
        res.status(200).json(quiz);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve Quiz" });
    }
};

