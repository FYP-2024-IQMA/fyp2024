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
exports.createChats = createChats;
exports.getChatHistory = getChatHistory;
exports.getChatHistoryLimit = getChatHistoryLimit;
exports.deleteChat = deleteChat;
const supabaseConfig_1 = __importDefault(require("../config/supabaseConfig"));
const chatModel = __importStar(require("../models/chatModel"));
function validateQueryPair(queryPair) {
    return (typeof queryPair === "object" &&
        queryPair !== null &&
        Object.values(chatModel.Role).includes(queryPair.role) &&
        (typeof queryPair.content === "string" || queryPair.content === null));
}
/* CREATE */
function createChats(chats) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const chat of chats) {
            for (const text of chat.queryPair) {
                if (!validateQueryPair(text)) {
                    console.error(`Invalid QueryPair object: ${JSON.stringify(text)}`);
                    throw new Error(`Invalid QueryPair object: ${JSON.stringify(text)}`);
                }
            }
        }
        const formattedChats = chats.map((chat) => (Object.assign(Object.assign({}, chat), { queryPair: chat.queryPair })));
        const { data, error } = yield supabaseConfig_1.default
            .from("chat")
            .insert(formattedChats)
            .select();
        if (error) {
            console.error(error);
            throw error;
        }
        else {
            return data;
        }
    });
}
/* READ */
function getChatHistory(userSection) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userID, sectionID } = userSection;
        const { data, error } = yield supabaseConfig_1.default
            .from("chat")
            .select("dateCreated, queryPair")
            .eq("userID", userID)
            .eq("sectionID", sectionID);
        // .order("dateCreated", { ascending: false }); // Order by date created (latest first);
        if (error) {
            console.error(error);
            throw error;
        }
        return data;
    });
}
function getChatHistoryLimit(userSection) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userID, sectionID, n } = userSection;
        const { data, error } = yield supabaseConfig_1.default
            .from("chat")
            .select("chattext, datecreated")
            .eq("userID", userID)
            .eq("sectionID", sectionID)
            .order("dateCreated", { ascending: false }) // Order by date created (latest first)
            .limit(n);
        if (error) {
            console.error(error);
            throw error;
        }
        return data.reverse();
    });
}
/* DELETE */
function deleteChat(userSection) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userID, sectionID } = userSection;
        const { status, statusText, error } = yield supabaseConfig_1.default
            .from("chat")
            .delete()
            .eq("userID", userID)
            .eq("sectionID", sectionID);
        if (error) {
            console.error(error);
            throw error;
        }
        else {
            return { status, statusText };
        }
    });
}
