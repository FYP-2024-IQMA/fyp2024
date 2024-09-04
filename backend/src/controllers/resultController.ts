import * as resultService from "../services/resultService";
import * as lessonService from "../services/lessonService";
import { Request, Response } from "express";

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
    } catch (error) {
        res.status(500).json({
            error: `Failed to create ${resultBody.userID} Result`,
        });
    }
};

/* READ */

export const getAllResults = async (req: Request, res: Response) => {
    try {
        const results = await resultService.getAllResults();
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve Results" });
    }
};

export const getResultByUserId = async (req: Request, res: Response) => {
    try {
        const result = await resultService.getResultByUserId(req.params.userid);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve Result" });
    }
};

export const getUserProgress = async (req: Request, res: Response) => {
    try {
        const userProgress = await resultService.getUserProgress(
            req.params.userid,
            req.params.sectionid
        );
        res.status(200).json(userProgress);
    } catch (error) {
        res.status(500).json({
            error: `Failed to retrieve ${req.params.userid}'s progress`,
        });
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
    } catch (error) {
        res.status(500).json({
            error: `Failed to retrieve ${req.params.userid}'s progress`,
        });
    }
};   