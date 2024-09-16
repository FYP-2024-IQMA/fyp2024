import { Request, Response } from "express";
import * as questionService from "../services/questionService";
import handleError from "../errors/errorHandling";


/* READ */

export const getQuizQuestions = async (req: Request, res: Response) => {
    try {
        const questions = await questionService.getQuizQuestions(
            req.params.sectionid,
            req.params.unitid,
            req.params.lessonid
        );
        res.status(200).json(questions);
    } catch (error: any) {
        const errorResponse = handleError(error);
        if(errorResponse){
            res.status(errorResponse.status).json(errorResponse);
        }
    }
};
