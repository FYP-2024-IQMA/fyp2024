"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const accountsAffectiveRouter_1 = __importDefault(require("./routes/accountsAffectiveRouter"));
const accountsCognitiveRouter_1 = __importDefault(require("./routes/accountsCognitiveRouter"));
const accountsDemographicsRouter_1 = __importDefault(require("./routes/accountsDemographicsRouter"));
const accountsRouter_1 = __importDefault(require("./routes/accountsRouter"));
const accountsSocialRouter_1 = __importDefault(require("./routes/accountsSocialRouter"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const quizRouter_1 = __importDefault(require("./routes/quizRouter"));
const resultRouter_1 = __importDefault(require("./routes/resultRouter"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const port = 3000;
app.use(express_1.default.json());
// app.use(accountsRouter);
app.use('/accounts', accountsRouter_1.default);
app.use('/accountsaffective', accountsAffectiveRouter_1.default);
app.use('/accountscognitive', accountsCognitiveRouter_1.default);
app.use('/accountsdemographics', accountsDemographicsRouter_1.default);
app.use('/accountssocial', accountsSocialRouter_1.default);
app.use('/quiz', quizRouter_1.default);
app.use('/result', resultRouter_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
