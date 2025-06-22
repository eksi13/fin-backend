import { TransactionData, InsertTransactionData, UpdateTransactionData } from '../../models/TransactionData.js';
import { DbClient } from '../client/DbClient.js';
import { TableRepository } from './TableRepository.js';

export class TransactionRepository {
    private static instance: TransactionRepository | null;
    private dbClient: DbClient;
    private tableRepository: TableRepository;
    private static readonly TABLE_NAME = 'transaction_table';


    private constructor(dbClient: DbClient) {
        this.dbClient = dbClient;
        this.tableRepository = new TableRepository(this.dbClient, TransactionRepository.TABLE_NAME);
    };


    public static getInstance(dbClient: DbClient): TransactionRepository {
        if(!TransactionRepository.instance) {
            TransactionRepository.instance = new TransactionRepository(dbClient);
        }
        return TransactionRepository.instance;
    };


    public async createTransaction(transaction: InsertTransactionData): Promise<TransactionData>  {
        return await this.tableRepository.create(transaction);
    };
    

    public async getTransactionById(id: number): Promise<TransactionData> {
        const result = await this.tableRepository.getById(id);
        if(!result) {
            throw new Error(`Transaction with ID ${id} not found`);
        }
        return await this.tableRepository.getById(id);
    };
    

    public async getAllTransactions(): Promise<TransactionData[]> {
        const result = await this.tableRepository.getAll() as TransactionData[];
        if (result.length === 0) {
            throw new Error('No transactions found in database');
        }
        return result;
    };
    

    public async updateTransaction(id: number, updates: UpdateTransactionData) {
        const result =  await this.tableRepository.update(id, updates);
        if (!result) {
            throw new Error(`Could not update transaction with ID ${id}, transaction not found`);
        }
        return result as TransactionData;
    };


    public async deleteTransaction(id: number): Promise<boolean> {
        const result = await this.tableRepository.getById(id);
        if(!result) {
            throw new Error(`Could not delete transaction with ID ${id}, transaction not found`);
        }
        return await this.tableRepository.delete(id);
    };
};