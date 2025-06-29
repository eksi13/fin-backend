import AccountService from "../services/AccountService.js";
import AccountRepository from "../db/repositories/AccountRepository.js";
import DbClient from "../db/client/DbClient.js";
import { RequestHandler, response } from 'express';
import asyncHandler from "express-async-handler";

const dbClient = await DbClient.getInstance();
const accountRepository = AccountRepository.getInstance(dbClient);
const accountService = new AccountService(accountRepository);


export const account_list = asyncHandler(async (req, res, next) => {
    const accounts = await accountService.getAllAccounts();
    console.log(accounts);
    const accountsObject = { ... accounts};
    console.log(accountsObject);
    res.json(accountsObject);
});
