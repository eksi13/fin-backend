import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, '../../../../database/db.sqlite');

export class DatabaseService {
    // singleton design pattern!
    private static instance: DatabaseService;
    private db: sqlite3.Database;

    private constructor() {
        this.db = new sqlite3.Database(dbPath);
    };

    public static getInstance(): DatabaseService {
        // checks if a instance of this class already exists, and if not, creates one
        if(!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService();
        }
        return DatabaseService.instance;
    };

    

}
















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