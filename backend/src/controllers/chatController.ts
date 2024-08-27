import { Request, Response } from "express";
import * as chatService from "../services/chatService";

/* CREATE */

export const createChats = async (req: Request, res: Response) => {
    const chatsBody = req.body;

    try {
        const chats = await chatService.createChats(chatsBody);
        res.status(201).json({
            userID: chatsBody[0].userID,
            sectionID: chatsBody[0].sectionID,
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
    const chatsBody = req.body;
    try {
        const chats = await chatService.getChatHistory(chatsBody);
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve chat history" });
    }
};

/* DELETE */

export const deleteChat = async (req: Request, res: Response) => {
    const chatsBody = req.body;
    try {
        const chat = await chatService.deleteChat(chatsBody);
        res.status(200).json({
            status: 200,
            userID: chatsBody.userID,
            sectionID: chatsBody.sectionID,
            statusText: "Chat History Deleted Successfully",
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete chat history" });
    }
};
