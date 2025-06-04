import { AccountData, InsertAccountData, UpdateAccountData } from '../../models/AccountData.js';
import { TableRepository } from './TableRepository.js';

export class AccountRepository {
    private static instance: AccountRepository | null;
    private TableRepository: TableRepository;


    private constructor(TableRepository: TableRepository) {
        this.TableRepository = TableRepository;
    };


    public static getInstance(TableRepository: TableRepository): AccountRepository {
        if(!AccountRepository.instance) {
            AccountRepository.instance = new AccountRepository(TableRepository);
        }
        return AccountRepository.instance;
    };


    public async createAccount(account: InsertAccountData): Promise<AccountData>  {
        return await this.TableRepository.create(account);
    };
    

    public async getAccountById(id: number): Promise<AccountData> {
        return await this.TableRepository.getById(id);
    };
    

    public async getAllAccounts(): Promise<AccountData[]> {
        return await this.TableRepository.getAll();
    };
    

    public async updateAccount(id: number, updates: UpdateAccountData) {
        return await this.TableRepository.update(id, updates);
    };


    public async deleteAccount(id: number): Promise<boolean> {
        return await this.TableRepository.delete(id);
    };
};