import { Request, Response } from "express";
import * as accountsDemographicsService from "../services/accountsDemographicsService";

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
    } catch (error) {
        res.status(500).json({
            error: `Failed to create ${accountBody.role} account`,
        });
    }
};

/* READ */

export const getAccountDemographicsById = async (req: Request, res: Response) => {
    try {
        const account = await accountsDemographicsService.getAccountDemographicsById(req.params.id);
        res.status(200).json(account);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve account" });
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
    } catch (error) {
        res.status(500).json({ error: "Failed to update account" });
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
    } catch (error) {
        res.status(500).json({ error: "Failed to delete account" });
    }
};
