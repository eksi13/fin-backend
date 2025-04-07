import sqlite3 from 'sqlite3'
import { open } from 'sqlite'


const db = await open({
    filename: './database/db.sqlite', // Specify the database file
    driver: sqlite3.Database,
  });
  
console.log(db)

