import { Router } from 'express';
import { categoryList } from '../controllers/categoryController.js';

const categoryRouter = Router();

categoryRouter.get('/', categoryList);

export default categoryRouter;
