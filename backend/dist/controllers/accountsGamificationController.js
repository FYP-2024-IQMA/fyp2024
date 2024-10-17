"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function () { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function (o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function (o, v) {
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
exports.updateStreaksFromUnit = exports.updateStreaksFromLogin = exports.updatePoints = exports.getGamificationData = exports.getTop5Accounts = void 0;
exports.updatePoints = exports.getBadges = exports.getGamificationData = exports.getTop5Accounts = void 0;
const accountsGamificationService = __importStar(require("../services/accountsGamificationService"));
const errorHandling_1 = __importDefault(require("../errors/errorHandling"));
/* READ */
const getTop5Accounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accounts = yield accountsGamificationService.getTop5Accounts(req.params.userid);
        res.status(200).json(accounts);
    }
    catch (error) {
        const errorResponse = (0, errorHandling_1.default)(error);
        if (errorResponse) {
            res.status(errorResponse.status).json(errorResponse);
        }
    }
});
exports.getTop5Accounts = getTop5Accounts;
const getGamificationData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gamificationData = yield accountsGamificationService.getGamificationData(req.params.userid);
        res.status(200).json(gamificationData);
    }
    catch (error) {
        const errorResponse = (0, errorHandling_1.default)(error);
        if (errorResponse) {
            res.status(errorResponse.status).json(errorResponse);
        }
    }
});
exports.getGamificationData = getGamificationData;
const getBadges = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const badges = yield accountsGamificationService.getBadges(req.params.userid);
        res.status(200).json(badges);
    }
    catch (error) {
        const errorResponse = (0, errorHandling_1.default)(error);
        if (errorResponse) {
            res.status(errorResponse.status).json(errorResponse);
        }
    }
});
exports.getBadges = getBadges;
/* UPDATE */
const updatePoints = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID, points } = req.body;
    try {
        const updatedPoints = yield accountsGamificationService.updatePoints(userID, points);
        res.status(200).json({
            status: 200,
            statusText: "Points Updated Successfully",
        });
    }
    catch (error) {
        const errorResponse = (0, errorHandling_1.default)(error);
        if (errorResponse) {
            res.status(errorResponse.status).json(errorResponse);
        }
    }
});
exports.updatePoints = updatePoints;
const updateStreaksFromLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("in this login");
    const userID = req.params.userid;
    try {
        const updatedStreak = yield accountsGamificationService.updateStreaksFromLogin(userID);
        res.status(200).json({
            status: 200,
            statusText: "Streak Updated Successfully",
        });
    }
    catch (error) {
        const errorResponse = (0, errorHandling_1.default)(error);
        if (errorResponse) {
            res.status(errorResponse.status).json(errorResponse);
        }
    }
});
exports.updateStreaksFromLogin = updateStreaksFromLogin;
const updateStreaksFromUnit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("in this unit");
    console.log(req.params.userid, req.params.quizid);
    try {
        const updatedStreak = yield accountsGamificationService.updateStreaksFromUnit(req.params.userid, parseInt(req.params.quizid));
        res.status(200).json({
            status: 200,
            statusText: "Streak Updated Successfully",
        });
    }
    catch (error) {
        const errorResponse = (0, errorHandling_1.default)(error);
        if (errorResponse) {
            res.status(errorResponse.status).json(errorResponse);
        }
    }
});
exports.updateStreaksFromUnit = updateStreaksFromUnit;
