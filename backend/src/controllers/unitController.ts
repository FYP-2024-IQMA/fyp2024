import { Request, Response } from "express";
import * as unitService from "../services/unitService";

/* READ */

export const getNoOfUnitPerSection = async (req: Request, res: Response) => {
    try {
        const unitCount = await unitService.getNoOfUnitPerSection(req.params.sectionID);
        res.status(200).json(unitCount);
    } catch (error) {
        res.status(500).json({ error: `Failed to retrieve no. of unit of ${req.params.sectionID}` });
    }
};