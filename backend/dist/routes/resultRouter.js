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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resultController = __importStar(require("../controllers/resultController"));
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = (0, express_1.Router)();
/* CREATE */
router.post("/createresult", authMiddleware_1.default, resultController.createResult);
/* READ */
router.get("/getallresults", authMiddleware_1.default, resultController.getAllResults);
router.get("/checkifcompletedquiz/:userid/:quizid", authMiddleware_1.default, resultController.checkIfCompletedQuiz);
router.get("/checkifcompletedsection/:userid/:sectionid", authMiddleware_1.default, resultController.checkIfCompletedSection);
router.get("/getuserprogress/:userid/:sectionid?", authMiddleware_1.default, resultController.getUserProgress);
router.get("/getcircularprogress/:userid/:sectionid/:unitid", authMiddleware_1.default, resultController.getCircularProgress);
router.get("/getnoofcompletedlessons/:userid/:sectionid/:unitid", authMiddleware_1.default, resultController.getNoOfCompletedLesson);
exports.default = router;
