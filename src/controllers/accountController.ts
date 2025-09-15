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

// export const accountCreateGet = asyncHandler(async (req, res, next) => {
//   res.send('NOT IMPLEMENTED: Account create GET');
// });

// export const accountCreatePost = asyncHandler(async (req, res, next) => {
//   res.send('NOT IMPLEMENTED: Account create POST');
// });

// export const accountDeleteGet = asyncHandler(async (req, res, next) => {
//   res.send('NOT IMPLEMENTED: Account delete GET');
// });

// export const accountDeletePost = asyncHandler(async (req, res, next) => {
//   res.send('NOT IMPLEMENTED: Account delete POST');
// });

// export const accountUpdateGet = asyncHandler(async (req, res, next) => {
//   res.send('NOT IMPLEMENTED: Account update GET');
// });

// export const accountUpdatePost = asyncHandler(async (req, res, next) => {
//   res.send('NOT IMPLEMENTED: Account updare POST');
// });
