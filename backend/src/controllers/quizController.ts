import * as quizService from "../services/quizService";
import { Request, Response } from "express";
import { errorMapping } from "../errors/errorMappings";
import handleError from "../errors/errorHandling";

/* READ */

export const getAllQuizzes = async (req: Request, res: Response) => {
    try {
        const quizzes = await quizService.getAllQuizzes();
        res.status(200).json(quizzes);
    } catch (error: any) {
        const errorResponse = handleError(error);
        if(errorResponse){
            res.status(errorResponse.status).json(errorResponse);
        }
    }
};

export const getQuizzesBySectionId = async (req: Request, res: Response) => {
    try {
        const quiz = await quizService.getQuizzesBySectionId(req.params.id);
        res.status(200).json(quiz);
    } catch (error: any) {
        const errorResponse = handleError(error);
        if(errorResponse){
            res.status(errorResponse.status).json(errorResponse);
        }
    }
};

