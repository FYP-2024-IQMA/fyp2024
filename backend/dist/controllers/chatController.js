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
exports.deleteChat = exports.getChatHistory = exports.createChats = void 0;
const chatService = __importStar(require("../services/chatService"));
const errorHandling_1 = __importDefault(require("../errors/errorHandling"));
/* CREATE */
const createChats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const chatsBody = req.body;
    try {
        const chats = yield chatService.createChats(chatsBody);
        res.status(201).json({
            userID: chatsBody.userID,
            sectionID: chatsBody.sectionID,
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
exports.createChats = createChats;
/* READ */
const getChatHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userSection = {
        userID: req.params.userid,
        sectionID: req.params.sectionid,
    };
    try {
        if (req.params.unitid) {
            const chats = yield chatService.getUnitChatHistory(userSection, req.params.unitid);
            res.status(200).json(chats);
        }
        else {
            const chats = yield chatService.getChatHistory(userSection);
            res.status(200).json(chats);
        }
    }
    catch (error) {
        const errorResponse = (0, errorHandling_1.default)(error);
        if (errorResponse) {
            res.status(errorResponse.status).json(errorResponse);
        }
    }
});
exports.getChatHistory = getChatHistory;
/* DELETE */
const deleteChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userSection = {
        userID: req.params.userid,
        sectionID: req.params.sectionid,
    };
    try {
        const chat = yield chatService.deleteChat(userSection);
        res.status(200).json({
            status: 200,
            userID: req.params.userid,
            sectionID: req.params.sectionid,
            statusText: "Chat History Deleted Successfully",
        });
    }
    catch (error) {
        const errorResponse = (0, errorHandling_1.default)(error);
        if (errorResponse) {
            res.status(errorResponse.status).json(errorResponse);
        }
    }
});
exports.deleteChat = deleteChat;
