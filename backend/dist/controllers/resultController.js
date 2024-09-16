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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNoOfCompletedLesson = exports.getCircularProgress = exports.getUserProgress = exports.getIfCompletedQuiz = exports.getAllResults = exports.createResult = void 0;
const resultService = __importStar(require("../services/resultService"));
const lessonService = __importStar(require("../services/lessonService"));
const errorHandling_1 = __importDefault(require("../errors/errorHandling"));
/* CREATE */
const createResult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resultBody = req.body;
    try {
        const result = yield resultService.createResult(resultBody);
        res.status(201).json({
            userID: result,
            status: 201,
            statusText: "Created",
        });
    }
    catch (error) {
        const errorResponse = (0, errorHandling_1.default)(error);
        if (errorResponse) {
            res.status(errorResponse.status).json(errorResponse);
        }
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
        const errorResponse = (0, errorHandling_1.default)(error);
        if (errorResponse) {
            res.status(errorResponse.status).json(errorResponse);
        }
    }
});
exports.getAllResults = getAllResults;
const getIfCompletedQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield resultService.getIfCompletedQuiz(req.params.userid, req.params.quizid);
        res.status(200).json(result);
    }
    catch (error) {
        const errorResponse = (0, errorHandling_1.default)(error);
        if (errorResponse) {
            res.status(errorResponse.status).json(errorResponse);
        }
    }
});
exports.getIfCompletedQuiz = getIfCompletedQuiz;
const getUserProgress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userProgress = yield resultService.getUserProgress(req.params.userid, req.params.sectionid);
        res.status(200).json(userProgress);
    }
    catch (error) {
        const errorResponse = (0, errorHandling_1.default)(error);
        if (errorResponse) {
            res.status(errorResponse.status).json(errorResponse);
        }
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
        const errorResponse = (0, errorHandling_1.default)(error);
        if (errorResponse) {
            res.status(errorResponse.status).json(errorResponse);
        }
    }
});
exports.getCircularProgress = getCircularProgress;
const getNoOfCompletedLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userProgress = yield resultService.getNoOfCompletedLesson(req.params.userid, req.params.sectionid, req.params.unitid);
        res.status(200).json(userProgress);
    }
    catch (error) {
        res.status(500).json({
            error: `Failed to retrieve ${req.params.userid}'s progress`,
        });
    }
});
exports.getNoOfCompletedLesson = getNoOfCompletedLesson;
