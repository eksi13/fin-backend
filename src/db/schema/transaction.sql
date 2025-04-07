CREATE TABLE IF NOT EXISTS transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  amount REAL NOT NULL,
  date TEXT NOT NULL,
  categoryId INTEGER NOT NULL,
  accountId INTEGER NOT NULL,
  type TEXT NOT NULL,
  lastUpdated DATETIME NOT NULL,
  description TEXT,
  FOREIGN KEY(categoryId) REFERENCES category(id),
  FOREIGN KEY(accountId) REFERENCES account(id)
);