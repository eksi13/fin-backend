import { DatabaseService } from './db/services/DatabaseService.js';
import { AccountService } from './db/services/AccountService.js';
import { AccountData, InsertAccountData, UpdateAccountData } from './models/AccountData.js';
import { AccountType } from './types/index.js';
import { Currency } from './types/index.js';


const accountdata1: InsertAccountData = {
  name: 'Savings Account',
  balance: 1500.50,
  type: AccountType.Girokonto,
  currency: Currency.EUR
};

const databaseService = await DatabaseService.getInstance();
databaseService.initDatabase();

const accountService = AccountService.getInstance(databaseService);

// const account = await accountService.createAccount(accountdata1);

// const accountWithID = await accountService.getAccountById(3);

// const accounts = await accountService.getAllAccounts();

const accUpdate: UpdateAccountData = {
  name: 'emma',
  balance: 9999,
  type: AccountType.Depot,
  currency: Currency.USD
};

const test = accountService.foo(1, accUpdate);









// const newAcc = await accountService.updateAccount(2, accUpdate);

// const delAcc = await accountService.deleteAccount(2);

