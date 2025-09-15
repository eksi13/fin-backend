import { Router } from 'express';
import { transactionList } from '../controllers/transactionController.js';

const transactionRouter = Router();

transactionRouter.get('/', transactionList);

export default transactionRouter;
