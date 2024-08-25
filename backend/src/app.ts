import accountsAffectiveRouter from './routes/accountsAffectiveRouter';
import accountsCognitiveRouter from './routes/accountsCognitiveRouter';
import accountsDemographicsRouter from './routes/accountsDemographicsRouter';
import accountsRouter from './routes/accountsRouter';
import { auth } from "express-oauth2-jwt-bearer";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

dotenv.config();
import accountsSocialRouter from './routes/accountsSocialRouter';
import cors from 'cors';
import express from 'express';
import quizRouter from './routes/quizRouter';
import resultRouter from './routes/resultRouter';
import unitRouter from './routes/unitRouter';
import chatRouter from "./routes/chatRouter";

const app = express();
app.use(cors());
const port = 3000;

app.use(express.json());

const checkJwt = auth({
    audience: process.env.AUDIENCE!,
    issuerBaseURL: process.env.ISSUERBASEURL!,
});

app.use(checkJwt)

app.use('/accounts', accountsRouter);
app.use('/accountsaffective', accountsAffectiveRouter);
app.use('/accountscognitive', accountsCognitiveRouter);
app.use('/accountsdemographics', accountsDemographicsRouter);
app.use('/accountssocial', accountsSocialRouter);
app.use('/quiz', quizRouter);
app.use('/result', resultRouter);
app.use('/unit', unitRouter);
app.use("/chat", chatRouter);

// Custom error handler middleware
function customErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
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