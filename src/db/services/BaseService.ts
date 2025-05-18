import { table } from 'console';
import { AccountData, InsertAccountData, UpdateAccountData } from '../../models/AccountData.js';
import { DatabaseService } from './DatabaseService.js';


export class BaseService {
    private dbService: DatabaseService;
    private tableName: string;

    private constructor(dbService: DatabaseService, tableName: string) {
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

        const sqlQuery = `SELECT * FROM ${this.tableName}`;
        const resultList = await this.dbService.runQuery(sqlQuery);

        return resultList;

    };

    
    public async update<T extends object>(id: number, updates: T): Promise<T> {
        const keyList = Object.keys(updates).concat('lastUpdated').join(', ');
        const valueList = Object.values(updates).map( (key) => `'${key}'`).concat('CURRENT_TIMESTAMP').join(', ');

        //const query = `UPDATE ${this.tableName} SET ${valueQuery} WHERE id = ${id}`;

        // const query2 = `SELECT * FROM account_table WHERE id = ${id}`;
        // const result = await this.dbService.runQuery(query2);


        console.log(keyList, valueList);

        //return result 
    };



    public async foo<T extends object>(id: number, updates: T) {

        

    };




    public async delete() {};

}