import { Request, Response } from "express";
import * as accountsService from "../services/accountsService";
import { errorMapping } from "../errors/errorMappings";
import handleError from "../errors/errorHandling";

/* CREATE */

export const createAccount = async (req: Request, res: Response) => {
    const accountBody = req.body;

    try {
        const account = await accountsService.createAccount(accountBody);
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

export const getAllAccounts = async (req: Request, res: Response) => {
    try {
        const accounts = await accountsService.getAllAccounts();
        res.status(200).json(accounts);
    } catch (error: any) {

        const errorResponse = handleError(error);
        if(errorResponse){
            res.status(errorResponse.status).json(errorResponse);
        }

    }
};

export const getAccountById = async (req: Request, res: Response) => {
    try {
        const account = await accountsService.getAccountById(req.params.id);
        res.status(200).json(account);
    } catch (error: any) {

        const errorResponse = handleError(error);
        if(errorResponse){
            res.status(errorResponse.status).json(errorResponse);
        }

    }
};

export const getAccountsByRole = async (req: Request, res: Response) => {
    try {
        const accounts = await accountsService.getAccountsByRole(req.params.role);
        res.status(200).json(accounts);
    } catch (error: any) {

        const errorResponse = handleError(error);
        if(errorResponse){
            res.status(errorResponse.status).json(errorResponse);
        }
    }
};


/* UPDATE */

export const updateAccount = async (req: Request, res: Response) => {
    const account = req.body;

    try {
        const response = await accountsService.updateAccount(account);
        res.status(200).json({
            status: 200,
            statusText: "Account Updated Successfully",
        });
    } catch (error: any) {

        const errorResponse = handleError(error);
        if(errorResponse){
            res.status(errorResponse.status).json(errorResponse);
        }

    }
};

/* DELETE */

export const deleteAccount = async (req: Request, res: Response) => {
    try {
        const response = await accountsService.deleteAccount(req.params.id);
        // response body will be empty
        res.status(200).json({
            status: 200,
            statusText: "Account Deleted Successfully",
        });
    } catch (error: any) {

        const errorResponse = handleError(error);
        if(errorResponse){
            res.status(errorResponse.status).json(errorResponse);
        }
    }
};
