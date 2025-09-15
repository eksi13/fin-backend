import { Router } from 'express';
import {
  accountDetail,
  accountList,
} from '../controllers/accountController.js';

const accountRouter = Router();

accountRouter.get('/', accountList);
accountRouter.get('/:id', accountDetail);

export default accountRouter;
