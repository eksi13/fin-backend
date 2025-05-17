import fs, { copyFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SCHEMA_FILES } from '../config.js';

import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.resolve(__dirname, '../../../../database/db.sqlite');
const SCHEMA_PATH = path.resolve(__dirname, '../../../../src/db/schema/');


export class DatabaseService {
    // singleton design pattern!
    private static instance: DatabaseService | null = null;
    private db!: Database; 

    private constructor() {};

    public static async getInstance(): Promise<DatabaseService> {
        if (!DatabaseService.instance) {
        const instance = new DatabaseService();
        instance.db = await open({
            filename: DB_PATH,
            driver: sqlite3.Database,
        });
        DatabaseService.instance = instance;
        }
        return DatabaseService.instance;
    };


    public async runQuery(sqlQuery: string): Promise<any> {
        let result: any;

        if (sqlQuery.trim().toUpperCase().startsWith('SELECT')) {
            result = await this.db.all(sqlQuery);

        } else if (
            sqlQuery.trim().toUpperCase().startsWith('INSERT') 
            || sqlQuery.trim().toUpperCase().startsWith('UPDATE') 
            || sqlQuery.trim().toUpperCase().startsWith('DELETE')
        ) {
            result = await this.db.run(sqlQuery);
        } else { // needs to be removed
            result = await this.db.all('SELECT 1');
            console.log("fallback"); 
        }
        return result;
    };


    public async initDatabase() {
        for (var filename of Object.values(SCHEMA_FILES)) {
            const schema_path = path.join(SCHEMA_PATH, filename);
            const schema_content = fs.readFileSync(schema_path).toString();
            await this.db.exec(schema_content)
        };
    };


    public async closeConnection(): Promise<void> {
        try {
            // wait for the database to be closed
            // if it succeeds, the db instace will be set to null (singleton pattern)
            // if does not, it will (sometime in the future) throw an error
            await new Promise<void>((resolve, reject) => {
                this.db.close(
                    //(err) => { if(err) { reject(err); } else { resolve(); } }
                );
            });
            DatabaseService.instance = null;
        } catch(error) {
            console.error('Error closing database connection:', error);
            throw error;
        }
    };


    public isConnected(): boolean {
        // add advanced checks here later
        return !!DatabaseService.instance;
    };
};