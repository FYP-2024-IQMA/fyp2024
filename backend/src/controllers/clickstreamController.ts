import { Request, Response } from "express";
import * as clickstreamService from "../services/clickstreamService";

export const sendMessage = async (req: Request, res: Response) => {
    const messageBody = req.body;

    try {
        const message = await clickstreamService.sendMessage(messageBody);
        res.status(200).json(message);
    } catch (e) {
        res.status(500).json({ error: "Failed to send data" , e});
    }
}