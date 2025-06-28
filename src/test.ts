// import { DbClient } from './db/client/DbClient.js';
// import { AccountRepository } from './db/repositories/AccountRepository.js';
// import { TransactionRepository } from './db/repositories/TransactionRepository.js';
// import { TableRepository } from './db/repositories/TableRepository.js';
// import { CategoryRepository } from './db/repositories/CategoryRepository.js';
// import { AccountData, InsertAccountData, UpdateAccountData } from './models/AccountData.js';
// import { CategoryData, InsertCategoryData, UpdateCategoryData } from './models/CategoryData.js'
// import { AccountType, TransactionType } from './types/index.js';
// import { Currency } from './types/index.js';
// import { AccountService } from './db/services/AccountService.js'; 
// import { InsertTransactionData , UpdateTransactionData } from './models/TransactionData.js';
// import { TransactionService } from './db/services/TransactionService.js';


// const taData: InsertTransactionData = {
//   amount: 123,
//   date: new Date(Date.UTC(2025, 11, 13)),
//   categoryId: 3,
//   accountId: 3,
//   type: TransactionType.Ausgabe,
//   description: ''
// };

// const taDataUpdate: UpdateTransactionData = {
//   amount: 123,
//   date: new Date(Date.UTC(2025, 11, 13)),
//   categoryId: 3,
//   accountId: 3,
//   type: TransactionType.Ausgabe,
//   description: ''
// };


// // create database instance
// const dbClient = await DbClient.getInstance();
// dbClient.initDatabase();


// // create repositories for all of the object types
// const accountRepository = AccountRepository.getInstance(dbClient);
// const transactionRepository = TransactionRepository.getInstance(dbClient);
// const categoryRepository = CategoryRepository.getInstance(dbClient);


// const transactionService = new TransactionService(transactionRepository, accountRepository, categoryRepository);

// console.log(await transactionService.createTransaction(taData));



// // const transactionTableRepository = new TableRepository(dbClient, 'account_table');
// // const transactionRepository = TransactionRepository.getInstance(transactionTableRepository);

// // const accountService = new AccountService(accountRepository);
// // const transactionService = new TransactionService(transactionRepository);


// // console.log(await transactionRepository.createTransaction(taData));