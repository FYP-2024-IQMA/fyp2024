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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAccount = exports.updateAccount = exports.getAccountsByRole = exports.getAccountById = exports.getAllAccounts = exports.logout = exports.getJwtToken = exports.createAccount = void 0;
const accountsService = __importStar(require("../services/accountsService"));
const errorHandling_1 = __importDefault(require("../errors/errorHandling"));
/* CREATE */
const createAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accountBody = req.body;
    try {
        const account = yield accountsService.createAccount(accountBody);
        res.status(201).json({
            userID: account[0].userID,
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
exports.createAccount = createAccount;
const getJwtToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1]; // Get the token part after 'Bearer '
    console.log('Received Token:', token);
    // Set the token as an HTTP-only cookie
    res.cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Ensure the cookie is sent over HTTPS
        sameSite: 'strict', // Helps mitigate CSRF attacks
    });
    res.json({ message: 'Token Obtained Successfully' });
});
exports.getJwtToken = getJwtToken;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('authToken');
    res.json({ message: 'Logged out successfully!' });
});
exports.logout = logout;
/* READ */
const getAllAccounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accounts = yield accountsService.getAllAccounts();
        console.log(" Iam here ");
        res.status(200).json(accounts);
    }
    catch (error) {
        const errorResponse = (0, errorHandling_1.default)(error);
        if (errorResponse) {
            res.status(errorResponse.status).json(errorResponse);
        }
    }
});
exports.getAllAccounts = getAllAccounts;
const getAccountById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const account = yield accountsService.getAccountById(req.params.id);
        res.status(200).json(account);
    }
    catch (error) {
        const errorResponse = (0, errorHandling_1.default)(error);
        if (errorResponse) {
            res.status(errorResponse.status).json(errorResponse);
        }
    }
});
exports.getAccountById = getAccountById;
const getAccountsByRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accounts = yield accountsService.getAccountsByRole(req.params.role);
        res.status(200).json(accounts);
    }
    catch (error) {
        const errorResponse = (0, errorHandling_1.default)(error);
        if (errorResponse) {
            res.status(errorResponse.status).json(errorResponse);
        }
    }
});
exports.getAccountsByRole = getAccountsByRole;
/* UPDATE */
const updateAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const account = req.body;
    try {
        const response = yield accountsService.updateAccount(account);
        res.status(200).json({
            status: 200,
            statusText: "Account Updated Successfully",
        });
    }
    catch (error) {
        const errorResponse = (0, errorHandling_1.default)(error);
        if (errorResponse) {
            res.status(errorResponse.status).json(errorResponse);
        }
    }
});
exports.updateAccount = updateAccount;
/* DELETE */
const deleteAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield accountsService.deleteAccount(req.params.id);
        // response body will be empty
        res.status(200).json({
            status: 200,
            statusText: "Account Deleted Successfully",
        });
    }
    catch (error) {
        const errorResponse = (0, errorHandling_1.default)(error);
        if (errorResponse) {
            res.status(errorResponse.status).json(errorResponse);
        }
    }
});
exports.deleteAccount = deleteAccount;
