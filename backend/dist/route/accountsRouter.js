"use strict";
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
const express_1 = __importDefault(require("express"));
const accountsdb_1 = require("../accountsdb");
const accountsRouter = express_1.default.Router();
accountsRouter.get('/getallaccounts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accounts = yield (0, accountsdb_1.getAllAccounts)();
    if (accounts) {
        res.status(200);
        res.json(accounts);
    }
    else {
        res.status(500);
        res.json({ error: "Failed to retrieve accounts" });
    }
}));
exports.default = accountsRouter;
