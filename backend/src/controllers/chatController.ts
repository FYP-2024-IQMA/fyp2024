import * as chatService from "../services/chatService";

import { Request, Response } from "express";

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
	} catch (error) {
		res.status(500).json({
			error: `Failed to insert chat history`,
		});
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
	} catch (error) {
		res.status(500).json({ error: "Failed to retrieve chat history" });
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
	} catch (error) {
		res.status(500).json({ error: "Failed to delete chat history" });
	}
};
