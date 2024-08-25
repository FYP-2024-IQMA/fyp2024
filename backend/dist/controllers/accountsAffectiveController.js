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
exports.deleteAccountAffective = exports.updateAccountAffective = exports.getAccountAffectiveById = exports.createAccountAffective = void 0;
const accountsAffectiveService = __importStar(require("../services/accountsAffectiveService"));
/* CREATE */
const createAccountAffective = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accountBody = req.body;
    try {
        const account = yield accountsAffectiveService.createAccountAffective(accountBody);
        res.status(201).json({
            userID: account[0].userID,
            status: 201,
            statusText: "Created",
        });
    }
    catch (error) {
        res.status(500).json({
            error: `Failed to create Account Affective`,
        });
    }
});
exports.createAccountAffective = createAccountAffective;
/* READ */
const getAccountAffectiveById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const account = yield accountsAffectiveService.getAccountAffectiveById(req.params.id);
        res.status(200).json(account);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve Account Affective" });
    }
});
exports.getAccountAffectiveById = getAccountAffectiveById;
/* UPDATE */
const updateAccountAffective = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const account = req.body;
    try {
        const response = yield accountsAffectiveService.updateAccountAffective(account);
        res.status(200).json({
            status: 200,
            statusText: "Account Affective Updated Successfully",
        });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update Account Affective" });
    }
});
exports.updateAccountAffective = updateAccountAffective;
/* DELETE */
const deleteAccountAffective = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield accountsAffectiveService.deleteAccountAffective(req.params.id);
        // response body will be empty
        res.status(200).json({
            status: 200,
            statusText: "Account Affective Deleted Successfully",
        });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete Account Affective" });
    }
});
exports.deleteAccountAffective = deleteAccountAffective;
