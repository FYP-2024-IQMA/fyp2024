import * as chatService from "../services/chatService";

import { Request, Response } from "express";

import { errorMapping } from "../errors/errorMappings";
import handleError from "../errors/errorHandling";

/* CREATE */

export const createChats = async (req: Request, res: Response) => {
	const chatsBody = req.body;

	try {
		const chats = await chatService.createChats(chatsBody);
		res.status(201).json({
			userID: chatsBody.userID,
			sectionID: chatsBody.sectionID,
			status: 201,
			statusText: "Created",
		});
	} catch (error: any) {
		const errorResponse = handleError(error);
		if (errorResponse) {
			res.status(errorResponse.status).json(errorResponse);
		}
	}
};

/* READ */

export const getChatHistory = async (req: Request, res: Response) => {
	const userSection: {
		userID: string;
		sectionID: string;
		unitID?: string;
	} = {
		userID: req.params.userid,
		sectionID: req.params.sectionid,
	};
	try {
		if (req.params.unitid) {
			const chats = await chatService.getUnitChatHistory(
				userSection,
				req.params.unitid
			);
			res.status(200).json(chats);
		} else {
			const chats = await chatService.getChatHistory(userSection);
			res.status(200).json(chats);
		}
	} catch (error: any) {
		const errorResponse = handleError(error);
		if (errorResponse) {
			res.status(errorResponse.status).json(errorResponse);
		}
	}
};

/* DELETE */

export const deleteChat = async (req: Request, res: Response) => {
	const userSection = {
		userID: req.params.userid,
		sectionID: req.params.sectionid,
	};
	try {
		const chat = await chatService.deleteChat(userSection);
		res.status(200).json({
			status: 200,
			userID: req.params.userid,
			sectionID: req.params.sectionid,
			statusText: "Chat History Deleted Successfully",
		});
	} catch (error: any) {
		const errorResponse = handleError(error);
		if (errorResponse) {
			res.status(errorResponse.status).json(errorResponse);
		}
	}
};
