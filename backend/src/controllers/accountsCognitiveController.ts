import { Request, Response } from "express";
import * as accountsCognitiveService from "../services/accountsCognitiveService";

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
    } catch (error) {
        res.status(500).json({
            error: `Failed to create ${accountBody.role} account`,
        });
    }
};

/* READ */

export const getAccountCognitiveById = async (req: Request, res: Response) => {
    try {
        const account = await accountsCognitiveService.getAccountCognitiveById(req.params.id);
        res.status(200).json(account);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve Account Cognitive" });
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
    } catch (error) {
        res.status(500).json({ error: "Failed to update account" });
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
    } catch (error) {
        res.status(500).json({ error: "Failed to delete account" });
    }
};
