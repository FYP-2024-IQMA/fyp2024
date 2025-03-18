import { Request, Response } from "express";
import * as accountsLearningStyleAndSkillsService from "../services/accountsLearningStyleAndSkillsService";
import handleError from "../errors/errorHandling";

/* CREATE */

export const createAccountLearningStyleAndSkills = async (req: Request, res: Response) => {
    const accountLearningStyleAndSkillsBody = req.body;

    try {
        const accountLearningStyleAndSkills = await accountsLearningStyleAndSkillsService.createAccountLearningStyleAndSkills(accountLearningStyleAndSkillsBody);
        res.status(201).json({
            userID: accountLearningStyleAndSkills[0].userID,
            status: 201,
            statusText: "Created",
        });
    } catch (error: any) {
        const errorResponse = handleError(error);
        if (errorResponse) {
            res.status(errorResponse.status).json(errorResponse);
        }
    }
};

/* READ */

export const getAccountLearningStyleAndSkillsById = async (req: Request, res: Response) => {
    try {
        const accountLearningStyleAndSkills = await accountsLearningStyleAndSkillsService.getAccountLearningStyleAndSkillsById(req.params.id);
        res.status(200).json(accountLearningStyleAndSkills);
    } catch (error: any) {
        const errorResponse = handleError(error);
        if (errorResponse) {
            res.status(errorResponse.status).json(errorResponse);
        }
    }
};

/* UPDATE */

export const updateAccountLearningStyleAndSkills = async (req: Request, res: Response) => {
    const accountLearningStyleAndSkills = req.body;

    try {
        const response = await accountsLearningStyleAndSkillsService.updateAccountLearningStyleAndSkills(accountLearningStyleAndSkills);
        res.status(200).json({
            status: 200,
            statusText: "Account Learning Style And Skills Updated Successfully",
        });
    } catch (error: any) {
        const errorResponse = handleError(error);
        if (errorResponse) {
            res.status(errorResponse.status).json(errorResponse);
        }
    }
};

/* DELETE */

export const deleteAccountLearningStyleAndSkills = async (req: Request, res: Response) => {
    try {
        const response = await accountsLearningStyleAndSkillsService.deleteAccountLearningStyleAndSkills(req.params.id);
        res.status(200).json({
            status: 200,
            statusText: "Account Learning Style And Skills Deleted Successfully",
        });
    } catch (error: any) {
        const errorResponse = handleError(error);
        if (errorResponse) {
            res.status(errorResponse.status).json(errorResponse);
        }
    }
};