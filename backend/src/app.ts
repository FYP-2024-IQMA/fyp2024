import express from 'express';
import cors from 'cors';
import accountsRouter from './routes/accountsRouter';
import chatRouter from './routes/chatRouter';
import accountsAffectiveRouter from './routes/accountsAffectiveRouter';
import accountsCognitiveRouter from './routes/accountsCognitiveRouter';
import accountsDemographicsRouter from './routes/accountsDemographicsRouter';
import accountsSocialRouter from './routes/accountsSocialRouter';

const app = express();
app.use(cors());
const port = 3000;

app.use(express.json());

app.use('/accounts', accountsRouter);
app.use('/accountsaffective', accountsAffectiveRouter);
app.use('/accountscognitive', accountsCognitiveRouter);
app.use('/accountsdemographics', accountsDemographicsRouter);
app.use('/accountssocial', accountsSocialRouter);
app.use("/chat", chatRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});