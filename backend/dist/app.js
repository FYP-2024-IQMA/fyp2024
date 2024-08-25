"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const accountsAffectiveRouter_1 = __importDefault(require("./routes/accountsAffectiveRouter"));
const accountsCognitiveRouter_1 = __importDefault(require("./routes/accountsCognitiveRouter"));
const accountsDemographicsRouter_1 = __importDefault(require("./routes/accountsDemographicsRouter"));
const accountsRouter_1 = __importDefault(require("./routes/accountsRouter"));
const express_oauth2_jwt_bearer_1 = require("express-oauth2-jwt-bearer");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const accountsSocialRouter_1 = __importDefault(require("./routes/accountsSocialRouter"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const quizRouter_1 = __importDefault(require("./routes/quizRouter"));
const resultRouter_1 = __importDefault(require("./routes/resultRouter"));
const unitRouter_1 = __importDefault(require("./routes/unitRouter"));
const chatRouter_1 = __importDefault(require("./routes/chatRouter"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const port = 3000;
app.use(express_1.default.json());
const checkJwt = (0, express_oauth2_jwt_bearer_1.auth)({
    audience: process.env.AUDIENCE,
    issuerBaseURL: process.env.ISSUERBASEURL,
});
app.use(checkJwt);
app.use('/accounts', accountsRouter_1.default);
app.use('/accountsaffective', accountsAffectiveRouter_1.default);
app.use('/accountscognitive', accountsCognitiveRouter_1.default);
app.use('/accountsdemographics', accountsDemographicsRouter_1.default);
app.use('/accountssocial', accountsSocialRouter_1.default);
app.use('/quiz', quizRouter_1.default);
app.use('/result', resultRouter_1.default);
app.use('/unit', unitRouter_1.default);
app.use("/chat", chatRouter_1.default);
// Custom error handler middleware
function customErrorHandler(err, req, res, next) {
    if (err && err.status === 401) {
        return res.status(401).json({ message: 'Unauthorized Access' });
    }
    next(err);
}
// Use the custom error handler
app.use(customErrorHandler);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
