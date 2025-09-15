import CategoryService from '../services/CategoryService.js';
import CategoryRepository from '../db/repositories/CategoryRepository.js';
import DbClient from '../db/client/DbClient.js';
import asyncHandler from 'express-async-handler';

const dbClient = await DbClient.getInstance();
const categoryRepository = CategoryRepository.getInstance(dbClient);
const categoryService = new CategoryService(categoryRepository);

export const categoryList = asyncHandler(async (req, res, next) => {
  const categories = { ...(await categoryService.getAllCategories()) };
  res.json(categories);
});

export const categoryDetail = asyncHandler(async (req, res, next) => {
  console.log(Number(req.params.id));
  const category = await categoryService.getCategoryById(Number(req.params.id));
  res.json(category);
});