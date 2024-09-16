import * as resultService from "../services/resultService";
import * as lessonService from "../services/lessonService";
import { Request, Response } from "express";
import { errorMapping } from "../errors/errorMappings";
import handleError from "../errors/errorHandling";

/* CREATE */

export const createResult = async (req: Request, res: Response) => {
    const resultBody = req.body;

    try {
        const result = await resultService.createResult(resultBody);
        res.status(201).json({
            userID: result,
            status: 201,
            statusText: "Created",
        });
    } catch (error: any) {
        const errorResponse = handleError(error);
        if(errorResponse){
            res.status(errorResponse.status).json(errorResponse);
        }
    }
};

/* READ */

export const getAllResults = async (req: Request, res: Response) => {
    try {
        const results = await resultService.getAllResults();
        res.status(200).json(results);
    } catch (error: any) {
        const errorResponse = handleError(error);
        if(errorResponse){
            res.status(errorResponse.status).json(errorResponse);
        }
    }
};

export const getIfCompletedQuiz = async (req: Request, res: Response) => {
    try {
        const result = await resultService.getIfCompletedQuiz(
            req.params.userid,
            req.params.quizid
        );
        res.status(200).json(result);
    } catch (error: any) {
        const errorResponse = handleError(error);
        if (errorResponse) {
            res.status(errorResponse.status).json(errorResponse);
        }
    }
};

export const getUserProgress = async (req: Request, res: Response) => {
    try {
        const userProgress = await resultService.getUserProgress(
            req.params.userid,
            req.params.sectionid
        );
        res.status(200).json(userProgress);
    } catch (error: any) {
        const errorResponse = handleError(error);
        if(errorResponse){
            res.status(errorResponse.status).json(errorResponse);
        }
    }
};

export const getCircularProgress = async (req: Request, res: Response) => {

    const { userid, sectionid, unitid } = req.params;

    try {
        const userProgress = await resultService.getUserProgress(
            userid,
            sectionid,
            unitid
        );

        const totalLessons = await lessonService.getNoOfLessonPerUnit(sectionid, unitid);

        // totalLessons + 1 to account for unit assessment
        res.status(200).json(userProgress/ (totalLessons + 1));
    } catch (error: any) {
        const errorResponse = handleError(error);
        if(errorResponse){
            res.status(errorResponse.status).json(errorResponse);
        }
    }
};   


export const getNoOfCompletedLesson = async (req: Request, res: Response) => {
    try {
        const userProgress = await resultService.getNoOfCompletedLesson(
            req.params.userid,
            req.params.sectionid,
            req.params.unitid
        );
        res.status(200).json(userProgress);
    } catch (error) {
        res.status(500).json({
            error: `Failed to retrieve ${req.params.userid}'s progress`,
        });
    }
};