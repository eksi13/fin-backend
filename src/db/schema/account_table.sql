CREATE TABLE IF NOT EXISTS account_table (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    balance REAL NOT NULL,
    type TEXT NOT NULL,
    currency TEXT NOT NULL,
    lastUpdated DATETIME NOT NULL
);