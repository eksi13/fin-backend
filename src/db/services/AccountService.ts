import { AccountData, InsertAccountData } from '../../models/AccountData.js';
import { DatabaseService } from './DatabaseService.js';

export class AccountService {
    private dbService: DatabaseService;
    private static instance: AccountService | null;


    private constructor(dbService: DatabaseService) {
        this.dbService = dbService;
    };

    public static getInstance(dbService: DatabaseService): AccountService {
        if(!AccountService.instance) {
            AccountService.instance = new AccountService(dbService);
        }
        return AccountService.instance;
    };

    // methods

    // CRUD : create, read, update and delete
    // all are async
    
    // create
    public async createAccount(account: InsertAccountData): Promise<AccountData> {
        const { name, balance, type, currency } = account;
        const sqlCreate = `INSERT INTO account_table (name, balance, type, currency) VALUES ('${name}', '${balance}', '${type}', '${currency}') RETURNING *`;

        const result = this.dbService.runQuery(sqlCreate);

        const sqlRead = 'SELECT * FROM account_table ORDER BY lastUpdated DESC LIMIT 1'
        const result2 = await this.dbService.runQuery(sqlRead);
        // console.log(...result2);

        return result2;
    };
    
    // read
    public async getAccountById() {};
    
    public async getAllAccounts() {}; // maybe unnessecary ?
    
    // update
    public async updateAccount() {};
    
    // delete
    public async deleteAccount() {};
};