import { Request, Response } from "express";
import * as accountsAboutYouService from "../services/accountsAboutYouService";
import { errorMapping } from "../errors/errorMappings";
import handleError from "../errors/errorHandling";

/* CREATE */

export const createAccountAboutYou = async (req: Request, res: Response) => {
    const accountAboutYouBody = req.body;

    try {
        const accountAboutYou = await accountsAboutYouService.createAccountAboutYou(accountAboutYouBody);
        res.status(201).json({
            userID: accountAboutYou[0].userID,
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

export const getAccountAboutYouById = async (req: Request, res: Response) => {
    try {
        const accountAboutYou = await accountsAboutYouService.getAccountAboutYouById(req.params.id);
        res.status(200).json(accountAboutYou);
    } catch (error: any) {
        const errorResponse = handleError(error);
        if (errorResponse) {
            res.status(errorResponse.status).json(errorResponse);
        }
    }
};

/* UPDATE */

export const updateAccountAboutYou = async (req: Request, res: Response) => {
    const accountAboutYou = req.body;

    try {
        const response = await accountsAboutYouService.updateAccountAboutYou(accountAboutYou);
        res.status(200).json({
            status: 200,
            statusText: "Account About You Updated Successfully",
        });
    } catch (error: any) {
        const errorResponse = handleError(error);
        if (errorResponse) {
            res.status(errorResponse.status).json(errorResponse);
        }
    }
};

/* DELETE */

export const deleteAccountAboutYou = async (req: Request, res: Response) => {
    try {
        const response = await accountsAboutYouService.deleteAccountAboutYou(req.params.id);
        res.status(200).json({
            status: 200,
            statusText: "Account About You Deleted Successfully",
        });
    } catch (error: any) {
        const errorResponse = handleError(error);
        if (errorResponse) {
            res.status(errorResponse.status).json(errorResponse);
        }
    }
};