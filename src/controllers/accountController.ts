import AccountService from '../services/AccountService.js';
import AccountRepository from '../db/repositories/AccountRepository.js';
import DbClient from '../db/client/DbClient.js';
import asyncHandler from 'express-async-handler';

const dbClient = await DbClient.getInstance();
const accountRepository = AccountRepository.getInstance(dbClient);
const accountService = new AccountService(accountRepository);

// get by id - done
// get all - done
// create
// delete
// update
export const accountList = asyncHandler(async (req, res, next) => {
  const accounts = { ...(await accountService.getAllAccounts()) };
  res.json(accounts);
});

export const accountDetail = asyncHandler(async (req, res, next) => {
  console.log(Number(req.params.id));
  const account = await accountService.getAccountById(Number(req.params.id));
  res.json(account);
});