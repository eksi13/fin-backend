import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SCHEMA_FILES } from '../config.js';


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.resolve(__dirname, '../../../../database/db.sqlite');
const SCHEMA_PATH = path.resolve(__dirname, '../../../../src/db/schema/');


export class DatabaseService {
    // singleton design pattern!
    private static instance: DatabaseService | null;
    private db: sqlite3.Database;


    private constructor() {
        this.db = new sqlite3.Database(DB_PATH);
    };


    public static getInstance(): DatabaseService {
        // checks if a instance of this class already exists, and if not, creates one
        if(!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService();
        }
        return DatabaseService.instance;
    };


    public async initDatabase(): Promise<void> {
        for (var filename of Object.values(SCHEMA_FILES)) {
            const schema_path = path.join(SCHEMA_PATH, filename);
            const schema_content = fs.readFileSync(schema_path).toString();
            this.db.exec(schema_content);
        }
    };


    public async closeConnection(): Promise<void> {
        try {
            // wait for the database to be closed
            // if it succeeds, the db instace will be set to null (singleton pattern)
            // if does not, it will (sometime in the future) throw an error
            await new Promise<void>((resolve, reject) => {
                this.db.close(
                    (err) => { if(err) { reject(err); } else { resolve(); } }
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
















/*

import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const dbPath = path.resolve(__dirname, '../../database/db.sqlite');
const schemaPath = path.resolve(__dirname, '../../src/db/schema/account.sql');

const db = new sqlite3.Database(dbPath);

db.exec(fs.readFileSync(schemaPath).toString());



db.exec(fs.readFileSync(dbPath).toString());

console.log(schemaPath)





import sqlite3 from 'sqlite3'
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const schemaPath = path.resolve(__dirname, '../../src/db/schema/account.sql');


const db = new sqlite3.Database('db.sqlite');

db.get(
  'SELECT RANDOM() % 100 as result',
  (_, res) => console.log(res)
);

db.exec(fs.readFileSync(schemaPath).toString());

*/