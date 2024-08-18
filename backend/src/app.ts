import express from 'express';
import cors from 'cors';
import accountsRouter from './routes/accountsRouter';
import chatRouter from './routes/chatRouter';

const app = express();
app.use(cors());
const port = 3000;

app.use(express.json());

app.use('/accounts', accountsRouter);
app.use("/chat", chatRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});