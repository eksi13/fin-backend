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


    public async createAccount(account: InsertAccountData): Promise<AccountData> {
        const { name, balance, type, currency } = account;
        const sqlCreate = `INSERT INTO account_table (name, balance, type, currency) VALUES ('${name}', '${balance}', '${type}', '${currency}') RETURNING *`;
        const result = await this.dbService.runQuery(sqlCreate);

        const sqlRead = `SELECT * FROM account_table WHERE id = ${result.lastID}`;
        const result2 = await this.dbService.runQuery(sqlRead);

        return result2;
    };
    

    public async getAccountById(id: number): Promise<AccountData> {
        const sqlQuery = `SELECT * FROM account_table WHERE id = ${id}`
        const account = await this.dbService.runQuery(sqlQuery);

        return account;
    };
    

    public async getAllAccounts(): Promise<AccountData[]> {
        const sqlQuery = 'SELECT * FROM account_table'
        const accounts = await this.dbService.runQuery(sqlQuery);

        return accounts;
    };
    

    public async updateAccount(id: number, updates: UpdateAccountData) {
        let valueQuery = '';

        for (const [key, value] of Object.entries(updates)) {
            if (value !== undefined) {
                const subQuery = `${key} = '${value}'`;
                valueQuery = valueQuery.concat(subQuery.toString()).concat(', ');
            };
        };

        valueQuery = valueQuery.concat('lastUpdated = CURRENT_TIMESTAMP')        
        const sqlUpdate = `UPDATE account_table SET ${valueQuery} WHERE id = ${id}`;
        this.dbService.runQuery(sqlUpdate);

        const sqlRead = `SELECT * FROM account_table WHERE id = ${id}`;
        const accountUpdated = await this.dbService.runQuery(sqlRead);

        return accountUpdated;
    };


    public async deleteAccount(id: number) {
        let sqlDelete = `DELETE FROM account_table WHERE id = ${id}`;
        const result  = await this.dbService.runQuery(sqlDelete);

        return result.changes > 0;
    };



    public async foo<T extends object>(id: number, updates: T) {
        const keyList = Object.keys(updates).concat('lastUpdated = CURRENT_TIMESTAMP').join(' = ? , ');

        const valueList = Object.values(updates).map( (key) => `'${key}'`).join(', ');

        const query = `UPDATE table SET ${keyList} WHERE id = ${id}`;

        // const query2 = `SELECT * FROM account_table WHERE id = ${id}`;
        // const result = await this.dbService.runQuery(query2);


        console.log(keyList);
        console.log(query);

        //return result 
    };
};