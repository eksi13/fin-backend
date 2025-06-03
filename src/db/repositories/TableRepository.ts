import { table } from 'console';
import { AccountData, InsertAccountData, UpdateAccountData } from '../../models/AccountData.js';
import { DbClient } from '../client/DbClient.js';


export class TableRepository {
    private dbService: DbClient;
    private tableName: string;


    public constructor(dbService: DbClient, tableName: string) {
        this.dbService = dbService;
        this.tableName = tableName;
    };


    public async create<T extends object>(data: T): Promise<T> {
        const keyList = Object.keys(data).join(', ');
        const valueList = Object.values(data).map( (key) => `'${key}'`).join(', ');

        const query = `INSERT INTO ${this.tableName} ( ${keyList} ) VALUES  ( ${valueList} ) RETURNING *;`;

        const result = await this.dbService.runQuery(query);

        const query1 = `SELECT * FROM ${this.tableName} WHERE id = ${result.lastID}`;
        const result2 = await this.dbService.runQuery(query1);

        return result2;
    };


    public async getById<T extends object>(id: number): Promise<T> {
        const query = `SELECT * FROM ${this.tableName} WHERE id = ${id}`
        const result = await this.dbService.runQuery(query);

        return result;
    };


    public async getAll<T extends object>(): Promise<T[]> {
        const query = `SELECT * FROM ${this.tableName}`;
        const resultList = await this.dbService.runQuery(query);

        return resultList;
    };


    public async update<T extends object>(id: number, updates: T): Promise<T> {
        let subQuery = '';

        for (const [key, value] of Object.entries(updates)) {
            subQuery = subQuery.concat(`${key} = '${value}', `);
        };

        subQuery = subQuery.concat('lastUpdated = CURRENT_TIMESTAMP');
        let query = `UPDATE ${this.tableName} SET ${subQuery} WHERE id = ${id};`;
        console.log(query);

        this.dbService.runQuery(query);

        const sqlRead = `SELECT * FROM ${this.tableName} WHERE id = ${id}`;
        const accountUpdated = await this.dbService.runQuery(sqlRead);

        return accountUpdated;
    };



    public async delete(id: number): Promise<boolean> {
        let query = `DELETE FROM ${this.tableName} WHERE id = ${id}`;

        const result  = await this.dbService.runQuery(query);

        return result.changes > 0;
    };

}