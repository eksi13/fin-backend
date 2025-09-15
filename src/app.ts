import express from 'express';
import config from './config/config.js';
import indexRouter from './routes/index.js';
import accountRouter from './routes/accountRoutes.js';
import cors from 'cors';
import categoryRouter from './routes/categoryRoutes.js';
import transactionRouter from './routes/transactionRoutes.js';

const app = express();

app.use(cors({origin: 'http://localhost:5173'}));
app.use('/', indexRouter);
app.use('/accounts', accountRouter);
app.use('/categories', categoryRouter);
app.use('/transactions', transactionRouter);

app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});
