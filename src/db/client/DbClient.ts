import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {SCHEMA_FILES} from '../config/config.js';

import sqlite3 from 'sqlite3';
import {open, Database} from 'sqlite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.resolve(__dirname, '../../../database/db.sqlite');
const SCHEMA_PATH = path.resolve(__dirname, '../../../src/db/schema/');

class DbClient {
  // singleton design pattern!
  private static instance: DbClient | null = null;
  private db!: Database;

  private constructor() {}

  public static async getInstance(): Promise<DbClient> {
    if (!DbClient.instance) {
      const instance = new DbClient();
      instance.db = await open({
        filename: DB_PATH,
        driver: sqlite3.Database,
      });
      DbClient.instance = instance;
    }
    return DbClient.instance;
  }

  public async runQuery(sqlQuery: string, parameters?: string[]): Promise<any> {
    let result: any;

    if (sqlQuery.trim().toUpperCase().startsWith('SELECT')) {
      result = await this.db.all(sqlQuery);
    } else if (
      sqlQuery.trim().toUpperCase().startsWith('INSERT') ||
      sqlQuery.trim().toUpperCase().startsWith('DELETE') ||
      sqlQuery.trim().toUpperCase().startsWith('UPDATE')
    ) {
      result = await this.db.run(sqlQuery);
    } else {
      // TODO needs to be removed
      result = await this.db.all('SELECT 1');
      console.log('fallback');
    }
    return result;
  }

  public async initDatabase() {
    for (var filename of Object.values(SCHEMA_FILES)) {
      const schema_path = path.join(SCHEMA_PATH, filename);
      const schema_content = fs.readFileSync(schema_path).toString();
      await this.db.exec(schema_content);
    }
  }

  public async closeConnection(): Promise<void> {
    try {
      // wait for the database to be closed
      // if it succeeds, the db instace will be set to null (singleton pattern)
      // if does not, it will (sometime in the future) throw an error
      await new Promise<void>((resolve, reject) => {
        this.db
          .close
          //(err) => { if(err) { reject(err); } else { resolve(); } }
          ();
      });
      DbClient.instance = null;
    } catch (error) {
      console.error('Error closing database connection:', error);
      throw error;
    }
  }

  public isConnected(): boolean {
    // add advanced checks here later
    return !!DbClient.instance;
  }
}

export default DbClient;
