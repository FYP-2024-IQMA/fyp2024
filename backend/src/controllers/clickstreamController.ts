import { Request, Response } from "express";
import * as clickstreamService from "../services/clickstreamService";
import handleError from "../errors/errorHandling";

export const sendMessage = async (req: Request, res: Response) => {
    const messageBody = req.body;

    try {
        const message = await clickstreamService.sendMessage(messageBody);
        res.status(200).json({ message: 'Published message successfully' });
    } catch (error: any) {
        const errorResponse = handleError(error);
        if(errorResponse){
            res.status(errorResponse.status).json(errorResponse);
        }
    }
}