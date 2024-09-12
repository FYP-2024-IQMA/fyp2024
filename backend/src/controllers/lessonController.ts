import * as lessonService from "../services/lessonService";

import { Request, Response } from "express";
import handleError from "../errors/errorHandling";

/* READ */

export const getNoOfLessonPerUnit = async (req: Request, res: Response) => {
	try {
		const lessonCount = await lessonService.getNoOfLessonPerUnit(
			req.params.sectionID,
			req.params.unitID
		);
		res.status(200).json(lessonCount);
	} catch (error: any) {
		const errorResponse = handleError(error);
        if(errorResponse){
            res.status(errorResponse.status).json(errorResponse);
        }
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
	} catch (error: any) {
		const errorResponse = handleError(error);
        if(errorResponse){
            res.status(errorResponse.status).json(errorResponse);
        }
	}
};

export const getAllLessons = async (req: Request, res: Response) => {
	try {
		const lessons = await lessonService.getAllLessons(
			req.params.sectionID,
			req.params.unitID
		);
		res.status(200).json(lessons);
	} catch (error: any) {
		const errorResponse = handleError(error);
        if(errorResponse){
            res.status(errorResponse.status).json(errorResponse);
        }
	}
};
