import accountsAffectiveRouter from './routes/accountsAffectiveRouter';
import accountsCognitiveRouter from './routes/accountsCognitiveRouter';
import accountsDemographicsRouter from './routes/accountsDemographicsRouter';
import accountsRouter from './routes/accountsRouter';
import accountsSocialRouter from './routes/accountsSocialRouter';
import cors from 'cors';
import express from 'express';
import quizRouter from './routes/quizRouter';
import resultRouter from './routes/resultRouter';
import unitRouter from './routes/unitRouter';
import chatRouter from "./routes/chatRouter";
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors());
app.use(cookieParser());

const port = 3000;

app.use(express.json());

app.use('/accounts', accountsRouter);
app.use('/accountsaffective', accountsAffectiveRouter);
app.use('/accountscognitive', accountsCognitiveRouter);
app.use('/accountsdemographics', accountsDemographicsRouter);
app.use('/accountssocial', accountsSocialRouter);
app.use('/quiz', quizRouter);
app.use('/result', resultRouter);
app.use('/unit', unitRouter);
app.use("/chat", chatRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});