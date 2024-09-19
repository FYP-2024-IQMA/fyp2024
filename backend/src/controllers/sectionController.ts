import * as sectionService from "../services/sectionService";

import { Request, Response } from "express";

import handleError from "../errors/errorHandling";

/* READ */
export const getAllSections = async (req: Request, res: Response) => {
	try {
		const sectionDetails = await sectionService.getAllSections();
		res.status(200).json(sectionDetails);
	} catch (error: any) {
		const errorResponse = handleError(error);
		if (errorResponse) {
			res.status(errorResponse.status).json(errorResponse);
		}
	}
};

export const getSectionDetails = async (req: Request, res: Response) => {
	try {
		const sectionDetails = await sectionService.getSectionDetails(
			req.params.sectionID
		);
		res.status(200).json(sectionDetails);
	} catch (error: any) {
		const errorResponse = handleError(error);
		if (errorResponse) {
			res.status(errorResponse.status).json(errorResponse);
		}
	}
};
