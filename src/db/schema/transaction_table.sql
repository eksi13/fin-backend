CREATE TABLE IF NOT EXISTS transaction_table (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  amount REAL NOT NULL,
  categoryId INTEGER NOT NULL,
  accountId INTEGER NOT NULL,
  type TEXT NOT NULL,
  description TEXT,
  date TEXT NOT NULL,
  lastUpdated DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(categoryId) REFERENCES category(id),
  FOREIGN KEY(accountId) REFERENCES account(id)
);