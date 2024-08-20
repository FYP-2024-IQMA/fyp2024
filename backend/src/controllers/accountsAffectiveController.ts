import { Request, Response } from "express";
import * as accountsAffectiveService from "../services/accountsAffectiveService";

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
    } catch (error) {
        res.status(500).json({
            error: `Failed to create Account Affective`,
        });
    }
};

/* READ */

export const getAccountAffectiveById = async (req: Request, res: Response) => {
    try {
        const account = await accountsAffectiveService.getAccountAffectiveById(req.params.id);
        res.status(200).json(account);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve Account Affective" });
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
    } catch (error) {
        res.status(500).json({ error: "Failed to update Account Affective" });
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
    } catch (error) {
        res.status(500).json({ error: "Failed to delete Account Affective" });
    }
};
