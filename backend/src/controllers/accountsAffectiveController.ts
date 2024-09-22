import { Request, Response } from "express";
import * as accountsAffectiveService from "../services/accountsAffectiveService";
import { errorMapping } from "../errors/errorMappings";
import handleError from "../errors/errorHandling";

/* CREATE */

export const createAccountAffective = async (req: Request, res: Response) => {
    const accountBody = req.body;

    try {
        const account = await accountsAffectiveService.createAccountAffective(accountBody);
        res.status(201).json({
            userID: account[0].userID,
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

export const getAccountAffectiveById = async (req: Request, res: Response) => {
    try {
        const account = await accountsAffectiveService.getAccountAffectiveById(req.params.id);
        res.status(200).json(account);
    } catch (error: any) {
        const errorResponse = handleError(error);
        if(errorResponse){
            res.status(errorResponse.status).json(errorResponse);
        }
    }
};

/* UPDATE */

export const updateAccountAffective = async (req: Request, res: Response) => {
    const account = req.body;

    try {
        const response = await accountsAffectiveService.updateAccountAffective(account);
        res.status(200).json({
            status: 200,
            statusText: "Account Affective Updated Successfully",
        });
    } catch (error: any) {
        const errorResponse = handleError(error);
        if(errorResponse){
            res.status(errorResponse.status).json(errorResponse);
        }
    }
};

/* DELETE */

export const deleteAccountAffective = async (req: Request, res: Response) => {
    try {
        const response = await accountsAffectiveService.deleteAccountAffective(req.params.id);
        // response body will be empty
        res.status(200).json({
            status: 200,
            statusText: "Account Affective Deleted Successfully",
        });
    } catch (error: any) {
        const errorResponse = handleError(error);
        if(errorResponse){
            res.status(errorResponse.status).json(errorResponse);
        }
    }
};
