CREATE TABLE IF NOT EXISTS transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  amount INTEGER,
  date TEXT,
  categoryId INTEGER,
  accountId INTEGER,
  type TEXT,
  lastUpdated TEXT,
  description TEXT,
  FOREIGN KEY(categoryId) REFERENCES category(id),
  FOREIGN KEY(accountId) REFERENCES account(id)
);