import { Request, Response } from "express";
import * as accountsSocialAndTechHabitsService from "../services/accountsSocialAndTechHabitsService";
import handleError from "../errors/errorHandling";

/* CREATE */

export const createAccountSocialAndTechHabits = async (req: Request, res: Response) => {
    const accountSocialAndTechHabitsBody = req.body;

    try {
        const accountSocialAndTechHabits = await accountsSocialAndTechHabitsService.createAccountSocialAndTechHabits(accountSocialAndTechHabitsBody);
        res.status(201).json({
            userID: accountSocialAndTechHabits[0].userID,
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

export const getAccountSocialAndTechHabitsById = async (req: Request, res: Response) => {
    try {
        const accountSocialAndTechHabits = await accountsSocialAndTechHabitsService.getAccountSocialAndTechHabitsById(req.params.id);
        res.status(200).json(accountSocialAndTechHabits);
    } catch (error: any) {
        const errorResponse = handleError(error);
        if (errorResponse) {
            res.status(errorResponse.status).json(errorResponse);
        }
    }
};

/* UPDATE */

export const updateAccountSocialAndTechHabits = async (req: Request, res: Response) => {
    const accountSocialAndTechHabits = req.body;

    try {
        const response = await accountsSocialAndTechHabitsService.updateAccountSocialAndTechHabits(accountSocialAndTechHabits);
        res.status(200).json({
            status: 200,
            statusText: "Account Social And Tech Habits Updated Successfully",
        });
    } catch (error: any) {
        const errorResponse = handleError(error);
        if (errorResponse) {
            res.status(errorResponse.status).json(errorResponse);
        }
    }
};

/* DELETE */

export const deleteAccountSocialAndTechHabits = async (req: Request, res: Response) => {
    try {
        const response = await accountsSocialAndTechHabitsService.deleteAccountSocialAndTechHabits(req.params.id);
        res.status(200).json({
            status: 200,
            statusText: "Account Social And Tech Habits Deleted Successfully",
        });
    } catch (error: any) {
        const errorResponse = handleError(error);
        if (errorResponse) {
            res.status(errorResponse.status).json(errorResponse);
        }
    }
};