import { Router } from 'express';
import { categoryList, categoryDetail } from '../controllers/categoryController.js';

const categoryRouter = Router();

categoryRouter.get('/', categoryList);
categoryRouter.get('/:id', categoryDetail);

export default categoryRouter;
