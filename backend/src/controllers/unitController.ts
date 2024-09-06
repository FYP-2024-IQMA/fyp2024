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

export const getAllUnitsBySection = async (req: Request, res: Response) => {
    try {
        const units = await unitService.getAllUnitsBySection(req.params.sectionID);
        res.status(200).json(units);
    } catch (error) {
        res.status(500).json({ error: `Failed to retrieve all of units of ${req.params.sectionID}` });
    }
}

export const getUnitDetailsBySectionAndUnit = async (req: Request, res: Response) => {

    const SectionUnit = {
        sectionID: req.params.sectionID,
        unitID: req.params.unitID
    };

    try {
        const units = await unitService.getUnitDetailsBySectionAndUnit(SectionUnit);
        res.status(200).json(units);
    } catch (error) {
        res.status(500).json({ error: `Failed to retrieve all of units of ${req.params.sectionID} and ${req.params.unitID}` });
    }
}
