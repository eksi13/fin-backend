import { AccountData, InsertAccountData, UpdateAccountData } from '../../models/AccountData.js';
import { DbClient } from '../client/DbClient.js';
import { TableRepository } from './TableRepository.js';


export class AccountRepository {
    private static instance: AccountRepository | null;
    private dbClient: DbClient;
    private tableRepository: TableRepository;
    private static readonly TABLE_NAME = 'account_table';

    
    private constructor(dbClient: DbClient) {
        this.dbClient = dbClient;
        this.tableRepository = new TableRepository(this.dbClient, AccountRepository.TABLE_NAME);
    };


    public static getInstance(dbClient: DbClient): AccountRepository {
        if(!AccountRepository.instance) {
            AccountRepository.instance = new AccountRepository(dbClient);
        }
        return AccountRepository.instance;
    };


    public async createAccount(account: InsertAccountData): Promise<AccountData>  {
        return await this.tableRepository.create(account);
    };
    

    public async getAccountById(id: number): Promise<AccountData> {
        const result = await this.tableRepository.getById(id);
        if(!result) {
            throw new Error(`Account with ID ${id} not found`);
        }
        return await this.tableRepository.getById(id);
    };
    

    public async getAllAccounts(): Promise<AccountData[]> {
        const result = await this.tableRepository.getAll() as AccountData[];
        if (result.length === 0) {
            throw new Error('No accounts found in database');
        }
        return result;
    };
    

    public async updateAccount(id: number, updates: UpdateAccountData): Promise<AccountData> {
        const result =  await this.tableRepository.update(id, updates);
        if (!result) {
            throw new Error(`Could not update account with ID ${id}, account not found`);
        }
        return result as AccountData;
    };


    public async deleteAccount(id: number): Promise<boolean> {
        const result = await this.tableRepository.getById(id);
        if(!result) {
            throw new Error(`Could not delete account with ID ${id}, account not found`);
        }
        return await this.tableRepository.delete(id);
    };
};