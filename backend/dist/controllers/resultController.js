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
exports.getCircularProgress = exports.getUserProgress = exports.getResultByUserId = exports.getAllResults = exports.createResult = void 0;
const resultService = __importStar(require("../services/resultService"));
const lessonService = __importStar(require("../services/lessonService"));
/* CREATE */
const createResult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resultBody = req.body;
    try {
        const result = yield resultService.createResult(resultBody);
        res.status(201).json({
            userID: result[0].userID,
            status: 201,
            statusText: "Created",
        });
    }
    catch (error) {
        res.status(500).json({
            error: `Failed to create ${resultBody.userID} Result`,
        });
    }
});
exports.createResult = createResult;
/* READ */
const getAllResults = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield resultService.getAllResults();
        res.status(200).json(results);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve Results" });
    }
});
exports.getAllResults = getAllResults;
const getResultByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield resultService.getResultByUserId(req.params.userid);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve Result" });
    }
});
exports.getResultByUserId = getResultByUserId;
const getUserProgress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userProgress = yield resultService.getUserProgress(req.params.userid, req.params.sectionid);
        res.status(200).json(userProgress);
    }
    catch (error) {
        res.status(500).json({
            error: `Failed to retrieve ${req.params.userid}'s progress`,
        });
    }
});
exports.getUserProgress = getUserProgress;
const getCircularProgress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userid, sectionid, unitid } = req.params;
    try {
        const userProgress = yield resultService.getUserProgress(userid, sectionid, unitid);
        const totalLessons = yield lessonService.getNoOfLessonPerUnit(sectionid, unitid);
        // totalLessons + 1 to account for unit assessment
        res.status(200).json(userProgress / (totalLessons + 1));
    }
    catch (error) {
        res.status(500).json({
            error: `Failed to retrieve ${req.params.userid}'s progress`,
        });
    }
});
exports.getCircularProgress = getCircularProgress;
