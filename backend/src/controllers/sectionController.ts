import * as sectionService from "../services/sectionService";

import { Request, Response } from "express";

/* READ */
export const getAllSections = async (req: Request, res: Response) => {
	try {
		const sectionDetails = await sectionService.getAllSections();
		console.log(sectionDetails);
		res.status(200).json(sectionDetails);
	} catch (error) {
		res.status(500).json({
			error: `Failed to retrieve section details of ${req.params.sectionID}`,
		});
	}
};

export const getSectionDetails = async (req: Request, res: Response) => {
	try {
		const sectionDetails = await sectionService.getSectionDetails(
			req.params.sectionID
		);
		console.log(sectionDetails);
		res.status(200).json(sectionDetails);
	} catch (error) {
		res.status(500).json({
			error: `Failed to retrieve section details of ${req.params.sectionID}`,
		});
	}
};
