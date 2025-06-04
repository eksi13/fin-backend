import { TransactionData, InsertTransactionData, UpdateTransactionData } from '../../models/TransactionData.js';
import { TableRepository } from './TableRepository.js';

export class TransactionRepository {
    private static instance: TransactionRepository | null;
    private TableRepository: TableRepository;


    private constructor(TableRepository: TableRepository) {
        this.TableRepository = TableRepository;
    };


    public static getInstance(TableRepository: TableRepository): TransactionRepository {
        if(!TransactionRepository.instance) {
            TransactionRepository.instance = new TransactionRepository(TableRepository);
        }
        return TransactionRepository.instance;
    };


    public async createAccount(account: InsertTransactionData): Promise<TransactionData>  {
        return await this.TableRepository.create(account);
    };
    

    public async getAccountById(id: number): Promise<TransactionData> {
        return await this.TableRepository.getById(id);
    };
    

    public async getAllAccounts(): Promise<TransactionData[]> {
        return await this.TableRepository.getAll();
    };
    

    public async updateAccount(id: number, updates: UpdateTransactionData) {
        return await this.TableRepository.update(id, updates);
    };


    public async deleteAccount(id: number): Promise<boolean> {
        return await this.TableRepository.delete(id);
    };
};