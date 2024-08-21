import * as ResultService from "../services/resultService";

import { Request, Response } from "express";

/* CREATE */

export const createResult = async (req: Request, res: Response) => {
    const ResultBody = req.body;

    try {
        const Result = await ResultService.createResult(ResultBody);
        res.status(201).json({
            userID: Result[0].userID,
            status: 201,
            statusText: "Created",
        });
    } catch (error) {
        res.status(500).json({
            error: `Failed to create ${ResultBody.role} Result`,
        });
    }
};

/* READ */

export const getAllResults = async (req: Request, res: Response) => {
    try {
        const Results = await ResultService.getAllResults();
        res.status(200).json(Results);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve Results" });
    }
};

export const getResultById = async (req: Request, res: Response) => {
    try {
        const Result = await ResultService.getResultById(req.params.id);
        res.status(200).json(Result);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve Result" });
    }
};

export const getNumberOfCompletedQuizzes = async (req: Request, res: Response) => {
    try {
        const Results = await ResultService.getNumberOfCompletedQuizzes(req.params.userID);
        res.status(200).json(Results);
    } catch (error) {
        res.status(500).json({
            error: `Failed to retrieve number of ${req.params.userID}'s completed quizzes`,
        });
    }
};


/* UPDATE */

export const updateResult = async (req: Request, res: Response) => {
    const Result = req.body;

    try {
        const response = await ResultService.updateResult(Result);
        res.status(200).json({
            status: 200,
            statusText: "Result Updated Successfully",
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to update Result" });
    }
};

/* DELETE */

// export const deleteResult = async (req: Request, res: Response) => {
//     try {
//         const response = await ResultService.deleteResult(req.params.id);
//         // response body will be empty
//         res.status(200).json({
//             status: 200,
//             statusText: "Result Deleted Successfully",
//         });
//     } catch (error) {
//         res.status(500).json({ error: "Failed to delete Result" });
//     }
// };
