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
exports.getAllLessons = exports.getLesson = exports.getNoOfLessonPerUnit = void 0;
const lessonService = __importStar(require("../services/lessonService"));
/* READ */
const getNoOfLessonPerUnit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lessonCount = yield lessonService.getNoOfLessonPerUnit(req.params.sectionID, req.params.unitID);
        res.status(200).json(lessonCount);
    }
    catch (error) {
        res.status(500).json({
            error: `Failed to retrieve no. of lesson per unit of ${req.params.unitID}`,
        });
    }
});
exports.getNoOfLessonPerUnit = getNoOfLessonPerUnit;
const getLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lesson = yield lessonService.getLesson(req.params.sectionID, req.params.unitID, req.params.lessonID);
        res.status(200).json(lesson);
    }
    catch (error) {
        res.status(500).json({
            error: `Failed to retrieve lesson ${req.params.lessonID}`,
        });
    }
});
exports.getLesson = getLesson;
const getAllLessons = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lessons = yield lessonService.getAllLessons(req.params.sectionID, req.params.unitID);
        res.status(200).json(lessons);
    }
    catch (error) {
        res.status(500).json({
            error: `Failed to retrieve lessons of ${req.params.unitID}`,
        });
    }
});
exports.getAllLessons = getAllLessons;
