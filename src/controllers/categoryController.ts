import CategoryService from '../services/CategoryService.js';
import CategoryRepository from '../db/repositories/CategoryRepository.js';
import DbClient from '../db/client/DbClient.js';
import asyncHandler from 'express-async-handler';

const dbClient = await DbClient.getInstance();
const categoryRepository = CategoryRepository.getInstance(dbClient);
const categoryService = new CategoryService(categoryRepository);

export const categoryList = asyncHandler(async (req, res, next) => {
  const catrgories = { ...(await categoryService.getAllCategories()) };
  console.log(catrgories);
  res.json(catrgories);
});