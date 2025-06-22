import { InsertTransactionData, TransactionData, UpdateTransactionData } from "../../models/TransactionData";
import { TransactionType } from "../../types/index.js";
import { AccountRepository } from "../repositories/AccountRepository";
import { CategoryRepository } from "../repositories/CategoryRepository";
import { TransactionRepository } from "../repositories/TransactionRepository";


export class TransactionService {
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
        if (!transaction.amount || !(typeof transaction.amount === 'number')) {
            throw new Error(`Invalid transaction amount: '${transaction.amount}'`);
        }

        if (!transaction.date || !(transaction.date instanceof Date)) {
            throw new Error(`Invalid transaction date: '${transaction.date}'`);
        }

        if (!transaction.categoryId || !(typeof transaction.categoryId === 'number')) {
            throw new Error(`Invalid transaction categoryID: '${transaction.categoryId}'`);
        } else if (transaction.categoryId) {
            await this.checkIfCategoryExists(transaction.categoryId);
        }
        
        if (!transaction.accountId || !(typeof transaction.accountId === 'number')) {
            throw new Error(`Invalid transaction accountID: '${transaction.accountId}'`);
        } else if (transaction.accountId) {
            await this.checkIfAccountExists(transaction.accountId);
        }

        if (!transaction.type || !Object.values(TransactionType).includes(transaction.type)) {
            throw new Error(`Invalid transaction type: '${transaction.type}'`);
        }

        if (transaction.description && (!(typeof transaction.description === 'string') || !(transaction.description.length > 0))) {
            throw new Error(`Invalid transaction description: '${transaction.description}'`);
        }
        
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
        if (!changes || (Object.keys(changes).length === 0)) { 
            throw new Error(`Invalid transaction updates: '${JSON.stringify(changes)}'`);
        }

        if (changes.amount && ( !(typeof changes.amount === 'number' ) || (changes.amount < 0) )) {
            throw new Error(`Amount invalid for updates: '${changes.amount}'`);
        }

        if (changes.date && !(changes.date instanceof Date)) {
            throw new Error(`Invalid transaction date: '${changes.date}'`);
        }

        if (changes.categoryId) {
            if (!(typeof changes.categoryId === 'number' )) {
                throw new Error(`Invalid category ID for updates: '${changes.categoryId}'`);
            } 
            await this.checkIfCategoryExists(changes.categoryId);
        }

        if (changes.accountId) {
            if (!(typeof changes.accountId === 'number' )) {
                throw new Error(`Invalid account ID for updates: '${changes.accountId}'`);
            } 
            await this.checkIfAccountExists(changes.accountId);
        }

        if (changes.type && !Object.values(TransactionType).includes(changes.type)) {
            throw new Error(`Invalid transaction type: '${changes.type}'`);
        }

        if (changes.description && (!(typeof changes.description === 'string') || !(changes.description.length > 0))) {
            throw new Error(`Invalid transaction description: '${changes.description}'`);
        }

        return await this.repository.updateTransaction(transactionID, changes) as TransactionData;
    };


    // delete
    public async deleteTransaction(id: number): Promise<Boolean> {
        return await this.repository.deleteTransaction(id);
    };


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

};