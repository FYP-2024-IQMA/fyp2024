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
exports.deleteAccount = exports.updateAccount = exports.getAllAdminAccounts = exports.getAllLearnerAccounts = exports.getAccountById = exports.getAllAccounts = exports.createAdminAccount = exports.createLearnerAccount = void 0;
const accountsService = __importStar(require("../services/accountsService"));
/* CREATE */
const createLearnerAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const learner = req.body;
    try {
        const account = yield accountsService.createLearnerAccount(learner);
        res.status(201).json({
            userid: account[0].userid,
            status: 201,
            statusText: "Created",
        });
    }
    catch (error) {
        res.status(500).json({
            error: "Failed to create Learner account",
        });
        console.log(error);
    }
});
exports.createLearnerAccount = createLearnerAccount;
const createAdminAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = req.body;
    try {
        const account = yield accountsService.createAdminAccount(admin);
        res.status(201).json({
            userid: account[0].userid,
            status: 201,
            statusText: "Created",
        });
    }
    catch (error) {
        res.status(500).json({
            error: "Failed to create Admin account",
        });
        console.log(error);
    }
});
exports.createAdminAccount = createAdminAccount;
/* READ */
const getAllAccounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accounts = yield accountsService.getAllAccounts();
        res.status(200).json(accounts);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve accounts" });
    }
});
exports.getAllAccounts = getAllAccounts;
const getAccountById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const account = yield accountsService.getAccountById(req.params.id);
        res.status(200).json(account);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve account" });
    }
});
exports.getAccountById = getAccountById;
const getAllLearnerAccounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accounts = yield accountsService.getAllLearnerAccounts();
        res.status(200).json(accounts);
    }
    catch (error) {
        res.status(500).json({
            error: "Failed to retrieve all learner accounts",
        });
    }
});
exports.getAllLearnerAccounts = getAllLearnerAccounts;
const getAllAdminAccounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accounts = yield accountsService.getAllAdminAccounts();
        res.status(200).json(accounts);
    }
    catch (error) {
        res.status(500).json({
            error: "Failed to retrieve all admin accounts",
        });
    }
});
exports.getAllAdminAccounts = getAllAdminAccounts;
/* UPDATE */
const updateAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const account = req.body;
    try {
        const response = yield accountsService.updateAccount(account);
        res.status(200).json({
            status: response.status,
            statusText: "Account Updated Successfully",
        });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update account" });
    }
});
exports.updateAccount = updateAccount;
/* DELETE */
const deleteAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield accountsService.deleteAccount(req.params.id);
        res.status(200).json({
            status: response.status,
            statusText: "Account deleted Successfully",
        });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete account" });
    }
});
exports.deleteAccount = deleteAccount;
