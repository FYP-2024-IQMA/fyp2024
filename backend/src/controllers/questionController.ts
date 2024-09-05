import { Request, Response } from "express";
import * as questionService from "../services/questionService";


/* READ */

export const getQuizQuestions = async (req: Request, res: Response) => {
    try {
        const questions = await questionService.getQuizQuestions(
            req.params.sectionid,
            req.params.unitid,
            req.params.lessonid
        );
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve questions" });
    }
};
