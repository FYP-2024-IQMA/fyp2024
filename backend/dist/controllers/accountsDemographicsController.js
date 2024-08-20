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
exports.deleteAccountDemographics = exports.updateAccountDemographics = exports.getAccountDemographicsById = exports.createAccountDemographics = void 0;
const accountsDemographicsService = __importStar(require("../services/accountsDemographicsService"));
/* CREATE */
const createAccountDemographics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accountBody = req.body;
    try {
        const account = yield accountsDemographicsService.createAccountDemographics(accountBody);
        res.status(201).json({
            userID: account[0].userID,
            status: 201,
            statusText: "Created",
        });
    }
    catch (error) {
        res.status(500).json({
            error: `Failed to create ${accountBody.role} account`,
        });
    }
});
exports.createAccountDemographics = createAccountDemographics;
/* READ */
const getAccountDemographicsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const account = yield accountsDemographicsService.getAccountDemographicsById(req.params.id);
        res.status(200).json(account);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve account" });
    }
});
exports.getAccountDemographicsById = getAccountDemographicsById;
/* UPDATE */
const updateAccountDemographics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const account = req.body;
    try {
        const response = yield accountsDemographicsService.updateAccountCognitive(account);
        res.status(200).json({
            status: 200,
            statusText: "Account Demographics Updated Successfully",
        });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update account" });
    }
});
exports.updateAccountDemographics = updateAccountDemographics;
/* DELETE */
const deleteAccountDemographics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield accountsDemographicsService.deleteAccountDemographics(req.params.id);
        // response body will be empty
        res.status(200).json({
            status: 200,
            statusText: "Account Demographics Deleted Successfully",
        });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete account" });
    }
});
exports.deleteAccountDemographics = deleteAccountDemographics;
