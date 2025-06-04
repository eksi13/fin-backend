import { DbClient } from './db/client/DbClient.js';
import { AccountRepository } from './db/repositories/AccountRepository.js';
import { TableRepository } from './db/repositories/TableRepository.js';
import { CategoryRepository } from './db/repositories/CategoryRepository.js';
import { AccountData, InsertAccountData, UpdateAccountData } from './models/AccountData.js';
import { CategoryData, InsertCategoryData, UpdateCategoryData } from './models/CategoryData.js'
import { AccountType } from './types/index.js';
import { Currency } from './types/index.js';


const accountdata1: InsertAccountData = {
  name: 'Savings Account',
  balance: 1500.50,
  type: AccountType.Girokonto,
  currency: Currency.EUR
};


const accUpdate: UpdateAccountData = {
  name: 'xxxx',
  balance: 1111,
  type: AccountType.Bargeld,
  currency: Currency.EUR
};

const categordydata1: InsertCategoryData = {
  name: 'Groceries',
  budget: 500
};


// create database instance
const dbClient = await DbClient.getInstance();
dbClient.initDatabase();


// create repositories for all of the object types
const accountTableRepository = new TableRepository(dbClient, 'account_table');
const accountRepository = AccountRepository.getInstance(accountTableRepository);

const account = await accountRepository.createAccount(accountdata1);
console.log(account);


const categoryTableRepository = new TableRepository(dbClient, 'category_table');
const categoryRepository = CategoryRepository.getInstance(categoryTableRepository);

const category = await categoryRepository.createCategory(categordydata1);
console.log(category);

// const account = await accountRepository.createAccount(accountdata1);
//const accountWithID = await accountRepository.getAccountById(9);


// const accounts = await accountRepository.getAllAccounts();
// const newAcc = await accountRepository.updateAccount(2, accUpdate);
const delAcc = await accountRepository.deleteAccount(2);