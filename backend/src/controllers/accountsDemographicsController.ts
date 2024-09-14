import { Request, Response } from "express";
import * as accountsDemographicsService from "../services/accountsDemographicsService";
import { errorMapping } from "../errors/errorMappings";
import handleError from "../errors/errorHandling";

/* CREATE */

export const createAccountDemographics = async (req: Request, res: Response) => {
    const accountBody = req.body;

    try {
        const account = await accountsDemographicsService.createAccountDemographics(accountBody);
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

export const getAccountDemographicsById = async (req: Request, res: Response) => {
    try {
        const account = await accountsDemographicsService.getAccountDemographicsById(req.params.id);
        res.status(200).json(account);
    } catch (error: any) {
        const errorResponse = handleError(error);
        if(errorResponse){
            res.status(errorResponse.status).json(errorResponse);
        }
    }
};

/* UPDATE */

export const updateAccountDemographics = async (req: Request, res: Response) => {
    const account = req.body;

    try {
        const response = await accountsDemographicsService.updateAccountCognitive(account);
        res.status(200).json({
            status: 200,
            statusText: "Account Demographics Updated Successfully",
        });
    } catch (error: any) {
        const errorResponse = handleError(error);
        if(errorResponse){
            res.status(errorResponse.status).json(errorResponse);
        }
    }
};

/* DELETE */

export const deleteAccountDemographics = async (req: Request, res: Response) => {
    try {
        const response = await accountsDemographicsService.deleteAccountDemographics(req.params.id);
        // response body will be empty
        res.status(200).json({
            status: 200,
            statusText: "Account Demographics Deleted Successfully",
        });
    } catch (error: any) {
        const errorResponse = handleError(error);
        if(errorResponse){
            res.status(errorResponse.status).json(errorResponse);
        }
    }
};
