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
Object.defineProperty(exports, "__esModule", { value: true });
const QuizController = __importStar(require("../controllers/quizController"));
const express_1 = require("express");
const router = (0, express_1.Router)();
/* CREATE */
router.post("/createquiz", QuizController.createQuiz);
/* READ */
router.get('/getallquizzes', QuizController.getAllQuizzes);
router.get('/getquizzesbysectionid/:id', QuizController.getQuizzesBySectionId);
router.get("/getnumberofquizzesperunit/:id", QuizController.getNumberOfQuizzesPerUnit);
router.get("/getnumberofcompletedquizzes/:userid/:unitid", QuizController.getNumberOfCompletedQuizzes);
/* UPDATE */
router.patch('/updatequiz', QuizController.updateQuiz);
/* DELETE */
// router.delete('/deleteQuiz/:id', QuizController.deleteQuiz);
exports.default = router;
