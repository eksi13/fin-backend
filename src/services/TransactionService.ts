import { AccountData } from "../models/AccountData";
import { InsertTransactionData, TransactionData, UpdateTransactionData } from "../models/TransactionData";
import { TransactionType } from "../types/index.js";
import { assertIsDate, assertIsNumber, assertIsString, assertIsTransactionType, assertStringLenght, checkIfObjectHasKeys } from "../utils/validationHelpers.js";
import AccountRepository from "../db/repositories/AccountRepository";
import CategoryRepository from "../db/repositories/CategoryRepository";
import TransactionRepository from "../db/repositories/TransactionRepository";


class TransactionService {
    private repository: TransactionRepository;
    private accountRepository: AccountRepository;
    private categoryRepository: CategoryRepository;

    public constructor(repository: TransactionRepository, accountRepository: AccountRepository, categoryRepository: CategoryRepository) {
        this.repository = repository;
        this.accountRepository = accountRepository;
        this.categoryRepository = categoryRepository;
    };


    // create
    public async createTransaction(transaction: InsertTransactionData): Promise<TransactionData> {
        console.log(transaction);
        assertIsTransactionType(transaction);
        // await this.checkIfCategoryExists(transaction.categoryId);
        // await this.checkIfAccountExists(transaction.accountId);
        
        return await this.repository.createTransaction(transaction);
    };


    // read
    public async getTransactionById(id: number): Promise<TransactionData> {
        return await this.repository.getTransactionById(id);
    };

    public async getAllTransactions(): Promise<TransactionData[]> {
        return await this.repository.getAllTransactions();
    };


    // update 
    public async updateTransaction(transactionID: number, changes: UpdateTransactionData): Promise<TransactionData> {
        if (!changes || !checkIfObjectHasKeys(changes)) { 
            throw new Error(`Invalid transaction updates: '${JSON.stringify(changes)}'`);
        }
        if (changes.amount) {
            assertIsNumber(changes.amount);
            changes.amount = Math.abs(changes.amount);
        }
        if (changes.date) {
            assertIsDate(changes.date);
        }
        if (changes.categoryId) {
            assertIsNumber(changes.categoryId);
            await this.checkIfCategoryExists(changes.categoryId);
        }
        if (changes.accountId) {
            assertIsNumber(changes.accountId);
            await this.checkIfAccountExists(changes.accountId);
        }
        if (changes.type) {
            assertIsTransactionType(changes.type);
        }
        if (changes.description) {
            assertIsString(changes.description);
            assertStringLenght(changes.description);
        }
        return await this.repository.updateTransaction(transactionID, changes) as TransactionData;
    };


    // delete
    public async deleteTransaction(id: number): Promise<boolean> {
        return await this.repository.deleteTransaction(id);
    };



    // TODO business logic
    // get transactions by account / category / data
    // recurring transactions
    // undo / reverse transactions
    // bulk erxport

    public async transferBetweenAccounts(amount: number, date: Date, categoryId: number, fromAccountId: number, toAccountId: number): Promise<AccountData[]> {
        await this.checkIfAccountExists(fromAccountId);
        const fromAccount = await this.accountRepository.getAccountById(fromAccountId);

        await this.checkIfAccountExists(toAccountId);
        const toAccount = await this.accountRepository.getAccountById(toAccountId);

        await this.checkIfCategoryExists(categoryId);
        
        const transactionFrom = { 
            amount: Math.abs(amount), 
            date: date,
            categoryId: categoryId,
            accountId: fromAccountId,
            type: TransactionType.TransferMinus
        };
        await this.createTransaction(transactionFrom);

        const transactionTo = { 
            amount: Math.abs(amount),
            date: date,
            categoryId: categoryId,
            accountId: toAccountId,
            type: TransactionType.TransferPlus
        };
        await this.createTransaction(transactionTo);

       const account1 = await this.accountRepository.updateAccount(fromAccount.id, { balance: fromAccount.balance - transactionFrom.amount });
       const account2 = await this.accountRepository.updateAccount(toAccount.id, { balance: toAccount.balance - transactionTo.amount });

       return [account1, account2];
    };


    public async undoTransaction(id: number) {
        const transaction = await this.getTransactionById(id);
        const account = await this.accountRepository.getAccountById(transaction.accountId);

        let updatedAccountBalance = account.balance;

        if (transaction.type === TransactionType.Ausgabe || transaction.type === TransactionType.TransferMinus) {
            updatedAccountBalance += transaction.amount;
        } else if (transaction.type === TransactionType.Einnahme || transaction.type === TransactionType.TransferPlus) {
            updatedAccountBalance -= transaction.amount;
        }
        // TODO update transaction infromation to include transfer ids -> so we can delete transacions from both accounts at once!!
        await this.accountRepository.updateAccount(transaction.accountId, {balance: updatedAccountBalance} );
        await this.deleteTransaction(id);
    }


    // helpers
    private async checkIfAccountExists(accountID: number): Promise<void> {
        try {
            await this.accountRepository.getAccountById(accountID);
        } catch (error) {
            throw new Error(`Invalid account ID for transaction: ${accountID}`);
        }
    };

    private async checkIfCategoryExists(categoryID: number): Promise<void> {
        try {
            await this.categoryRepository.getCategoryById(categoryID);
        } catch (error) {
            throw new Error(`Invalid category ID for transaction: ${categoryID}`);
        }
    };

    // TODO maybe add helper functions to automatically check for types / validity of attributes
};

export default TransactionService;