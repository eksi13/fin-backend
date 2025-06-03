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

        valueQuery = valueQuery.concat('lastUpdated = CURRENT_TIMESTAMP');        
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


    public async foo<T extends object>(data: T): Promise<T> {
        const keyList = Object.keys(data).join(', ');
        const valueList = Object.values(data).map( (key) => `'${key}'`).join(', ');

        const query = `INSERT INTO account_table ( ${keyList} ) VALUES  ( ${valueList} ) RETURNING *;`;

        const result = await this.dbService.runQuery(query);

        const query1 = `SELECT * FROM account_table WHERE id = ${result.lastID}`;
        const result2 = await this.dbService.runQuery(query1);

        return result2;
    };
};