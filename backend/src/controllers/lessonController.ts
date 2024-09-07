import * as lessonService from "../services/lessonService";

import { Request, Response } from "express";

/* READ */

export const getNoOfLessonPerUnit = async (req: Request, res: Response) => {
	try {
		const lessonCount = await lessonService.getNoOfLessonPerUnit(
			req.params.sectionID,
			req.params.unitID
		);
		res.status(200).json(lessonCount);
	} catch (error) {
		res.status(500).json({
			error: `Failed to retrieve no. of lesson per unit of ${req.params.unitID}`,
		});
	}
};

export const getLesson = async (req: Request, res: Response) => {
	try {
		const lesson = await lessonService.getLesson(
			req.params.sectionID,
			req.params.unitID,
			req.params.lessonID
		);
		res.status(200).json(lesson);
	} catch (error) {
		res.status(500).json({
			error: `Failed to retrieve lesson ${req.params.lessonID}`,
		});
	}
};

export const getAllLessons = async (req: Request, res: Response) => {
	try {
		const lessons = await lessonService.getAllLessons(
			req.params.sectionID,
			req.params.unitID
		);
		res.status(200).json(lessons);
	} catch (error) {
		res.status(500).json({
			error: `Failed to retrieve lessons of ${req.params.unitID}`,
		});
	}
};
