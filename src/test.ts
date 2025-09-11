import DbClient from './db/client/DbClient.js';
import AccountRepository from './db/repositories/AccountRepository.js';
import TransactionRepository from './db/repositories/TransactionRepository.js';
import TableRepository from './db/repositories/TableRepository.js';
import CategoryRepository from './db/repositories/CategoryRepository.js';

import AccountService from './services/AccountService.js';
import TransactionService from './services/TransactionService.js';
import CategoryService from './services/CategoryService.js';

import {
  AccountData,
  InsertAccountData,
  UpdateAccountData,
} from './models/AccountData.js';
import {
  CategoryData,
  InsertCategoryData,
  UpdateCategoryData,
} from './models/CategoryData.js';
import {AccountType, TransactionType} from './types/index.js';
import {Currency} from './types/index.js';

import {
  InsertTransactionData,
  UpdateTransactionData,
} from './models/TransactionData.js';

const taData: InsertTransactionData = {
  amount: 123,
  date: new Date(),
  categoryId: 3,
  accountId: 3,
  type: TransactionType.Ausgabe,
  description: '',
};

const taDataUpdate: UpdateTransactionData = {
  amount: 123,
  date: new Date(),
  categoryId: 3,
  accountId: 3,
  type: TransactionType.Ausgabe,
  description: '',
};

const accData: InsertAccountData = {
  name: 'Account Test',
  balance: 100,
  type: AccountType.Bargeld,
  currency: Currency.EUR,
};

const accDataUpdate: UpdateAccountData = {
  balance: 9999,
};

const insertCat: InsertCategoryData = {
  name: 'Category Test',
  budget: 500,
};

// create database instance
const dbClient = await DbClient.getInstance();
dbClient.initDatabase();

// create repositories for all of the object types
// const accountRepository = AccountRepository.getInstance(dbClient);
// const accountService = new AccountService(accountRepository);

const categoryRepository = CategoryRepository.getInstance(dbClient);
const categoryService = new CategoryService(categoryRepository);

console.log(await categoryService.createCategory(insertCat));

// const transactionRepository = TransactionRepository.getInstance(dbClient);
// const transactionService = new TransactionService(
//   transactionRepository,
//   accountRepository,
//   cate,
// );

// const transactionRepository = TransactionRepository.getInstance(dbClient);

// const transactionService = new TransactionService(transactionRepository, accountRepository, categoryRepository);

// transactionService.createTransaction(taData);

// const transactionTableRepository = new TableRepository(dbClient, 'account_table');
// const transactionRepository = TransactionRepository.getInstance(transactionTableRepository);

// const transactionService = new TransactionService(transactionRepository);

// console.log(await transactionRepository.createTransaction(taData));
