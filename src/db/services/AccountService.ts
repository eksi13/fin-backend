import { AccountData, InsertAccountData, UpdateAccountData } from '../../models/AccountData.js';
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
        const result = await this.dbService.runQuery(sqlCreate);

        const sqlRead = `SELECT * FROM account_table WHERE id = ${result.lastID}`
        const result2 = await this.dbService.runQuery(sqlRead);

        return result2;
    };
    
    // read
    public async getAccountById(id: number): Promise<AccountData> {
        const sqlQuery = `SELECT * FROM account_table WHERE id = ${id}`
        const account = await this.dbService.runQuery(sqlQuery);

        return account;
    };
    

    public async getAllAccounts() {
        const sqlQuery = 'SELECT * FROM account_table'
        const accounts = await this.dbService.runQuery(sqlQuery);

        return accounts;
    };
    

    // update
    public async updateAccount(id: number, updates: UpdateAccountData) {
        let valueQuery = '';

        for (const [key, value] of Object.entries(updates)) {
            if (value !== undefined) {
                const subQuery = `${key} = '${value}'`;
                valueQuery = valueQuery.concat(subQuery.toString()).concat(', ');
            }
        }

        valueQuery = valueQuery.concat('lastUpdated = CURRENT_TIMESTAMP')        
        const sqlUpdate = `UPDATE account_table SET ${valueQuery} WHERE id = ${id}`;
        this.dbService.runQuery(sqlUpdate);

        const sqlRead = `SELECT * FROM account_table WHERE id = ${id}`;
        const accountUpdated = await this.dbService.runQuery(sqlRead);

        return accountUpdated;
    };

    
    // delete
    public async deleteAccount(id: number) {
        let sqlDelete = `DELETE FROM account_table WHERE id = ${id}`;
        const result  = await this.dbService.runQuery(sqlDelete);

        return result.changes > 0;
    };
};