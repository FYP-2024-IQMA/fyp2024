"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateResult = exports.getResultByUserId = exports.getAllResults = exports.createResult = void 0;
const ResultService = __importStar(require("../services/resultService"));
/* CREATE */
const createResult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ResultBody = req.body;
    try {
        const Result = yield ResultService.createResult(ResultBody);
        res.status(201).json({
            userID: Result[0].userID,
            status: 201,
            statusText: "Created",
        });
    }
    catch (error) {
        res.status(500).json({
            error: `Failed to create ${ResultBody.role} Result`,
        });
    }
});
exports.createResult = createResult;
/* READ */
const getAllResults = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Results = yield ResultService.getAllResults();
        res.status(200).json(Results);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve Results" });
    }
});
exports.getAllResults = getAllResults;
const getResultByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Result = yield ResultService.getResultByUserId(req.params.id);
        res.status(200).json(Result);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve Result" });
    }
});
exports.getResultByUserId = getResultByUserId;
/* UPDATE */
const updateResult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Result = req.body;
    try {
        const response = yield ResultService.updateResult(Result);
        res.status(200).json({
            status: 200,
            statusText: "Result Updated Successfully",
        });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update Result" });
    }
});
exports.updateResult = updateResult;
/* DELETE */
// export const deleteResult = async (req: Request, res: Response) => {
//     try {
//         const response = await ResultService.deleteResult(req.params.id);
//         // response body will be empty
//         res.status(200).json({
//             status: 200,
//             statusText: "Result Deleted Successfully",
//         });
//     } catch (error) {
//         res.status(500).json({ error: "Failed to delete Result" });
//     }
// };
