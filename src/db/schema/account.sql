CREATE TABLE IF NOT EXISTS account (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    balance INTEGER,
    type TEXT,
    currency TEXT,
    lastUpdated TEXT
);