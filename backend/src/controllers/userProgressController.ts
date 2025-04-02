import { Request, Response } from "express";
import * as userProgressService from "../services/userProgressService";
import { errorMapping } from "../errors/errorMappings";
import handleError from "../errors/errorHandling";
import jwt from "jsonwebtoken";
import { Section } from "../models/sectionModel";

export const getUserProgressBySection = async (req: Request, res: Response) => {
  try {
    const account = await userProgressService.getUserProgressBySection(
      req.params.sectionID,
      req.params.userID
    );
    res.status(200).json(account);
  } catch (error: any) {
    const errorResponse = handleError(error);
    if (errorResponse) {
      res.status(errorResponse.status).json(errorResponse);
    }
  }
};
