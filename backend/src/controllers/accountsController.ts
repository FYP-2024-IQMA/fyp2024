import { Request, Response } from "express";
import * as accountsService from "../services/accountsService";

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
    } catch (error) {
        res.status(500).json({
            error: `Failed to create ${accountBody.role} account`,
        });
    }
};

/* READ */

export const getAllAccounts = async (req: Request, res: Response) => {
    try {
        const accounts = await accountsService.getAllAccounts();
        res.status(200).json(accounts);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve accounts" });
    }
};

export const getAccountById = async (req: Request, res: Response) => {
    try {
        const account = await accountsService.getAccountById(req.params.id);
        res.status(200).json(account);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve account" });
    }
};

export const getAccountsByRole = async (req: Request, res: Response) => {
    try {
        const accounts = await accountsService.getAccountsByRole(req.params.role);
        res.status(200).json(accounts);
    } catch (error) {
        res.status(500).json({
            error: `Failed to retrieve all ${req.params.role} accounts`,
        });
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
    } catch (error) {
        res.status(500).json({ error: "Failed to update account" });
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
    } catch (error) {
        res.status(500).json({ error: "Failed to delete account" });
    }
};
