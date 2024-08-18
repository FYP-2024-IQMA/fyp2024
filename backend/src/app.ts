import express from 'express';
import cors from 'cors';
import accountsRouter from './routes/accountsRouter';

const app = express();
app.use(cors());
const port = 3000;

app.use(express.json());

// app.use(accountsRouter);
app.use('/accounts', accountsRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});