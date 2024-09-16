import { Request, Response } from "express";
import * as accountsCognitiveService from "../services/accountsCognitiveService";
import { errorMapping } from "../errors/errorMappings";
import handleError from "../errors/errorHandling";

/* CREATE */

export const createAccountCognitive = async (req: Request, res: Response) => {
    const accountBody = req.body;

    try {
        const account = await accountsCognitiveService.createAccountCognitive(accountBody);
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

export const getAccountCognitiveById = async (req: Request, res: Response) => {
    try {
        const account = await accountsCognitiveService.getAccountCognitiveById(req.params.id);
        res.status(200).json(account);
    } catch (error: any) {
        const errorResponse = handleError(error);
        if(errorResponse){
            res.status(errorResponse.status).json(errorResponse);
        }
    }
};

/* UPDATE */

export const updateAccountCognitive = async (req: Request, res: Response) => {
    const account = req.body;

    try {
        const response = await accountsCognitiveService.updateAccountCognitive(account);
        res.status(200).json({
            status: 200,
            statusText: "Account Cognitive Updated Successfully",
        });
    } catch (error: any) {
        const errorResponse = handleError(error);
        if(errorResponse){
            res.status(errorResponse.status).json(errorResponse);
        }
    }
};

/* DELETE */

export const deleteAccountCognitive = async (req: Request, res: Response) => {
    try {
        const response = await accountsCognitiveService.deleteAccountCognitive(req.params.id);
        // response body will be empty
        res.status(200).json({
            status: 200,
            statusText: "Account Cognitive Deleted Successfully",
        });
    } catch (error: any) {
        const errorResponse = handleError(error);
        if(errorResponse){
            res.status(errorResponse.status).json(errorResponse);
        }
    }
};
