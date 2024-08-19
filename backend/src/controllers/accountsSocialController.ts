import { Request, Response } from "express";
import * as accountsSocialService from "../services/accountsSocialService";

/* CREATE */

export const createAccountSocial = async (req: Request, res: Response) => {
    const accountBody = req.body;

    try {
        const account = await accountsSocialService.createAccountSocial(accountBody);
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

export const getAccountSocialById = async (req: Request, res: Response) => {
    try {
        const account = await accountsSocialService.getAccountSocialById(req.params.id);
        res.status(200).json(account);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve account" });
    }
};

/* UPDATE */

export const updateAccountSocial = async (req: Request, res: Response) => {
    const account = req.body;

    try {
        const response = await accountsSocialService.updateAccountSocial(account);
        res.status(200).json({
            status: 200,
            statusText: "Account Social Updated Successfully",
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to update account" });
    }
};

/* DELETE */

export const deleteAccountSocial = async (req: Request, res: Response) => {
    try {
        const response = await accountsSocialService.deleteAccountSocial(req.params.id);
        // response body will be empty
        res.status(200).json({
            status: 200,
            statusText: "Account Social Deleted Successfully",
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete account" });
    }
};
