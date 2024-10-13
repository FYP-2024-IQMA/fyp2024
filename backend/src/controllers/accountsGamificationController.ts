import * as accountsGamificationService from "../services/accountsGamificationService";

import { Request, Response } from "express";

import { errorMapping } from "../errors/errorMappings";
import handleError from "../errors/errorHandling";

/* READ */

export const getTop5Accounts = async (req: Request, res: Response) => {
	try {
		const accounts = await accountsGamificationService.getTop5Accounts(
			req.params.userid
		);
		res.status(200).json(accounts);
	} catch (error: any) {
		const errorResponse = handleError(error);
		if (errorResponse) {
			res.status(errorResponse.status).json(errorResponse);
		}
	}
};

export const getGamificationData = async (req: Request, res: Response) => {
	try {
		const gamificationData =
			await accountsGamificationService.getGamificationData(req.params.userid);
		res.status(200).json(gamificationData);
	} catch (error: any) {
		const errorResponse = handleError(error);
		if (errorResponse) {
			res.status(errorResponse.status).json(errorResponse);
		}
	}
};

/* UPDATE */

export const updatePoints = async (req: Request, res: Response) => {
	const { userID, points } = req.body;

	try {
		const updatedPoints = await accountsGamificationService.updatePoints(
			userID,
			points
		);
		res.status(200).json({
			status: 200,
			statusText: "Points Updated Successfully",
		});
	} catch (error: any) {
		const errorResponse = handleError(error);
		if (errorResponse) {
			res.status(errorResponse.status).json(errorResponse);
		}
	}
};

export const updateStreaksFromLogin = async (req: Request, res: Response) => {
	console.log("in this login");
	const userID = req.params.userid;

	try {
		const updatedStreak =
			await accountsGamificationService.updateStreaksFromLogin(userID);
		res.status(200).json({
			status: 200,
			statusText: "Streak Updated Successfully",
		});
	} catch (error: any) {
		const errorResponse = handleError(error);
		if (errorResponse) {
			res.status(errorResponse.status).json(errorResponse);
		}
	}
};

export const updateStreaksFromUnit = async (req: Request, res: Response) => {
	console.log("in this unit");
	console.log(req.params.userid, req.params.quizid);
	try {
		const updatedStreak =
			await accountsGamificationService.updateStreaksFromUnit(
				req.params.userid,
				parseInt(req.params.quizid)
			);
		res.status(200).json({
			status: 200,
			statusText: "Streak Updated Successfully",
		});
	} catch (error: any) {
		const errorResponse = handleError(error);
		if (errorResponse) {
			res.status(errorResponse.status).json(errorResponse);
		}
	}
};
