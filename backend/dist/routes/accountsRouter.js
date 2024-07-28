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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const accountsController = __importStar(require("../controllers/accountsController"));
const router = (0, express_1.Router)();
/* CREATE */
router.post('/createlearneraccount', accountsController.createLearnerAccount);
router.post('/createadminaccount', accountsController.createAdminAccount);
/* READ */
router.get('/getallaccounts', accountsController.getAllAccounts);
router.get("/getaccountbyid/:id", accountsController.getAccountById);
router.get('/getalllearneraccounts', accountsController.getAllLearnerAccounts);
router.get('/getalladminaccounts', accountsController.getAllAdminAccounts);
/* UPDATE */
router.patch("/updateaccount", accountsController.updateAccount);
/* DELETE */
router.delete("/deleteaccount/:id", accountsController.deleteAccount);
exports.default = router;
