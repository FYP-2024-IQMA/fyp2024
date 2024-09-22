import { Request, Response } from "express";
import * as unitService from "../services/unitService";
import { errorMapping } from "../errors/errorMappings";
import handleError from "../errors/errorHandling";

/* READ */

export const getNoOfUnitPerSection = async (req: Request, res: Response) => {
    try {
        const unitCount = await unitService.getNoOfUnitPerSection(req.params.sectionID);
        res.status(200).json(unitCount);
    } catch (error: any) {
        const errorResponse = handleError(error);
        if(errorResponse){
            res.status(errorResponse.status).json(errorResponse);
        }
    }
};

export const getAllUnitsBySection = async (req: Request, res: Response) => {
    try {
        const units = await unitService.getAllUnitsBySection(req.params.sectionID);
        res.status(200).json(units);
    } catch (error: any) {
        const errorResponse = handleError(error);
        if(errorResponse){
            res.status(errorResponse.status).json(errorResponse);
        }
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
    } catch (error: any) {
        const errorResponse = handleError(error);
        if(errorResponse){
            res.status(errorResponse.status).json(errorResponse);
        }
    }
}
