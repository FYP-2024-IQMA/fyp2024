import { Request, Response } from "express";
import * as accountsMotivationService from "../services/accountsMotivationService";
import { errorMapping } from "../errors/errorMappings";
import handleError from "../errors/errorHandling";

/* CREATE */

export const createAccountMotivation = async (req: Request, res: Response) => {
    const accountMotivationBody = req.body;

    try {
        const accountMotivation = await accountsMotivationService.createAccountMotivation(accountMotivationBody);
        res.status(201).json({
            userID: accountMotivation[0].userID,
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

export const getAccountMotivationById = async (req: Request, res: Response) => {
    try {
        const accountMotivation = await accountsMotivationService.getAccountMotivationById(req.params.id);
        res.status(200).json(accountMotivation);
    } catch (error: any) {
        const errorResponse = handleError(error);
        if (errorResponse) {
            res.status(errorResponse.status).json(errorResponse);
        }
    }
};

/* UPDATE */

export const updateAccountMotivation = async (req: Request, res: Response) => {
    const accountMotivation = req.body;

    try {
        const response = await accountsMotivationService.updateAccountMotivation(accountMotivation);
        res.status(200).json({
            status: 200,
            statusText: "Account Motivation Updated Successfully",
        });
    } catch (error: any) {
        const errorResponse = handleError(error);
        if (errorResponse) {
            res.status(errorResponse.status).json(errorResponse);
        }
    }
};

/* DELETE */

export const deleteAccountMotivation = async (req: Request, res: Response) => {
    try {
        const response = await accountsMotivationService.deleteAccountMotivation(req.params.id);
        res.status(200).json({
            status: 200,
            statusText: "Account Motivation Deleted Successfully",
        });
    } catch (error: any) {
        const errorResponse = handleError(error);
        if (errorResponse) {
            res.status(errorResponse.status).json(errorResponse);
        }
    }
};