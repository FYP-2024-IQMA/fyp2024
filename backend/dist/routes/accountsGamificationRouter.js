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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const accountsGamificationController = __importStar(require("../controllers/accountsGamificationController"));
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = (0, express_1.Router)();
/* READ */
router.get("/gamificationdata/:userid", authMiddleware_1.default, accountsGamificationController.getGamificationData);
router.get("/leaderboard/:userid", authMiddleware_1.default, accountsGamificationController.getTop5Accounts);
router.get("/badges/:userid", authMiddleware_1.default, accountsGamificationController.getBadges);
router.get("/getlatestbadge/:sectionid/:unitid", authMiddleware_1.default, accountsGamificationController.getLatestBadge);
/* UPDATE */
router.patch("/updatepoints", authMiddleware_1.default, accountsGamificationController.updatePoints);
router.patch("/updateloginstreaks/:userid", authMiddleware_1.default, accountsGamificationController.updateStreaksFromLogin);
router.patch("/updateunitstreaks/:userid/:quizid", authMiddleware_1.default, accountsGamificationController.updateStreaksFromUnit);
exports.default = router;
