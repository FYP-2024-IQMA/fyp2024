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
exports.updateQuiz = exports.getNumberOfCompletedQuizzes = exports.getNumberOfQuizzesPerUnit = exports.getQuizzesBySectionId = exports.getAllQuizzes = exports.createQuiz = void 0;
const QuizService = __importStar(require("../services/quizService"));
/* CREATE */
const createQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const QuizBody = req.body;
    try {
        const Quiz = yield QuizService.createQuiz(QuizBody);
        res.status(201).json({
            quizID: Quiz[0].quizID,
            status: 201,
            statusText: "Created",
        });
    }
    catch (error) {
        res.status(500).json({
            error: `Failed to create ${QuizBody.unitID} Quiz for ${QuizBody.quizType}`,
        });
    }
});
exports.createQuiz = createQuiz;
/* READ */
const getAllQuizzes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Quizzes = yield QuizService.getAllQuizzes();
        res.status(200).json(Quizzes);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve Quizzes" });
    }
});
exports.getAllQuizzes = getAllQuizzes;
const getQuizzesBySectionId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Quiz = yield QuizService.getQuizzesBySectionId(req.params.id);
        res.status(200).json(Quiz);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve Quiz" });
    }
});
exports.getQuizzesBySectionId = getQuizzesBySectionId;
const getNumberOfQuizzesPerUnit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Quizzes = yield QuizService.getNumberOfQuizzesPerUnit(req.params.id);
        res.status(200).json(Quizzes);
    }
    catch (error) {
        res.status(500).json({
            error: `Failed to retrieve number of quizzes for ${req.params.id}`,
        });
    }
});
exports.getNumberOfQuizzesPerUnit = getNumberOfQuizzesPerUnit;
const getNumberOfCompletedQuizzes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Quizzes = yield QuizService.getNumberOfCompletedQuizzes(req.params.unitid, req.params.userid);
        res.status(200).json(Quizzes);
    }
    catch (error) {
        res.status(500).json({
            error: `Failed to retrieve number of ${req.params.userid}'s completed quizzes`,
        });
    }
});
exports.getNumberOfCompletedQuizzes = getNumberOfCompletedQuizzes;
/* UPDATE */
const updateQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Quiz = req.body;
    try {
        const response = yield QuizService.updateQuiz(Quiz);
        res.status(200).json({
            status: 200,
            statusText: "Quiz Updated Successfully",
        });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update Quiz" });
    }
});
exports.updateQuiz = updateQuiz;
/* DELETE */
// export const deleteQuiz = async (req: Request, res: Response) => {
//     try {
//         const response = await QuizService.deleteQuiz(req.params.id);
//         // response body will be empty
//         res.status(200).json({
//             status: 200,
//             statusText: "Quiz Deleted Successfully",
//         });
//     } catch (error) {
//         res.status(500).json({ error: "Failed to delete Quiz" });
//     }
// };
