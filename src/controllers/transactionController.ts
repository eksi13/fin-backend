import TransactionService from '../services/TransactionService.js';
import TransactionRepository from '../db/repositories/TransactionRepository.js';
import DbClient from '../db/client/DbClient.js';
import asyncHandler from 'express-async-handler';
import AccountRepository from '../db/repositories/AccountRepository.js';
import CategoryRepository from '../db/repositories/CategoryRepository.js';

const dbClient = await DbClient.getInstance();
const transactionRepository = TransactionRepository.getInstance(dbClient);
const accountRepository = AccountRepository.getInstance(dbClient);
const categoryRepository = CategoryRepository.getInstance(dbClient);

const transactionService = new TransactionService(transactionRepository, accountRepository, categoryRepository);

export const transactionList = asyncHandler(async (req, res, next) => {
  const transactions = { ...(await transactionService.getAllTransactions()) };
  console.log(transactions);
  res.json(transactions);
});