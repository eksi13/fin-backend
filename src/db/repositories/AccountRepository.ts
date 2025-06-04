import { AccountData, InsertAccountData, UpdateAccountData } from '../../models/AccountData.js';
import { DbClient } from '../client/DbClient.js';
import { TableRepository } from './TableRepository.js';

export class AccountRepository {
    private dbService: DbClient;
    private static instance: AccountRepository | null;
    private TableRepository: TableRepository;


    private constructor(dbService: DbClient, TableRepository: TableRepository) {
        this.dbService = dbService;
        this.TableRepository = TableRepository;
    };


    public static getInstance(dbService: DbClient, TableRepository: TableRepository): AccountRepository {
        if(!AccountRepository.instance) {
            AccountRepository.instance = new AccountRepository(dbService, TableRepository);
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