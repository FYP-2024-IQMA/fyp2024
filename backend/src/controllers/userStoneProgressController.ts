import { Request, Response } from "express";
import * as userStoneProgressService from "../services/userStoneProgressService";
import handleError from "../errors/errorHandling";

/* CREATE */
export const createUserStoneProgress = async (req: Request, res: Response) => {
    const { userID, last_completed_stone_index, current_stone_index, current_screen_index } = req.body;

    try {
        const result = await userStoneProgressService.createUserStoneProgress(userID, last_completed_stone_index, current_stone_index, current_screen_index);
        res.status(201).json({
            userID: result[0].userID,
            status: 201,
            statusText: "Created"
        });
    } catch (error: any) {
        const errorResponse = handleError(error);
        if (errorResponse) {
            res.status(errorResponse.status).json(errorResponse);
        }
    }
};

/* READ */
export const getUserStoneProgressByUserId = async (req: Request, res: Response) => {
    try {
        const result = await userStoneProgressService.getUserStoneProgressByUserId(req.params.id);
        res.status(200).json(result);
    } catch (error: any) {
        const errorResponse = handleError(error);
        if (errorResponse) {
            res.status(errorResponse.status).json(errorResponse);
        }
    }
};

export const getAllUserStoneProgress = async (_req: Request, res: Response) => {
    try {
        const result = await userStoneProgressService.getAllUserStoneProgress();
        res.status(200).json(result);
    } catch (error: any) {
        const errorResponse = handleError(error);
        if (errorResponse) {
            res.status(errorResponse.status).json(errorResponse);
        }
    }
};

/* UPDATE */
export const updateUserStoneProgress = async (req: Request, res: Response) => {
    const { userID, last_completed_stone_index, current_stone_index, current_screen_index } = req.body;

    try {
        const result = await userStoneProgressService.updateUserStoneProgress(userID, last_completed_stone_index, current_stone_index, current_screen_index);
        res.status(200).json({
            status: 200,
            statusText: "User Progress Updated Successfully",
        });
    } catch (error: any) {
        const errorResponse = handleError(error);
        if (errorResponse) {
            res.status(errorResponse.status).json(errorResponse);
        }
    }
};

/* DELETE */
export const deleteUserStoneProgress = async (req: Request, res: Response) => {
    try {
        const result = await userStoneProgressService.deleteUserStoneProgress(req.params.id);
        res.status(200).json({
            status: 200,
            statusText: "User Progress Deleted Successfully",
        });
    } catch (error: any) {
        const errorResponse = handleError(error);
        if (errorResponse) {
            res.status(errorResponse.status).json(errorResponse);
        }
    }
};
