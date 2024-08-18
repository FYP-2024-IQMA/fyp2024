"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const accountsRouter_1 = __importDefault(require("./routes/accountsRouter"));
const chatRouter_1 = __importDefault(require("./routes/chatRouter"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const port = 3000;
app.use(express_1.default.json());
app.use('/accounts', accountsRouter_1.default);
app.use("/chat", chatRouter_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
