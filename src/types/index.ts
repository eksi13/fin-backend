import { AccountData } from "../models/AccountData";
import { Category } from "../models/CategoryData";

export type TransactionType = 'Ausgabe' | 'Einnahme';

export type AccountType = 'Girokonto' | 'Tagesgeld' | 'Bargeld' | 'Depot';
// export type Accounts = AccountData[];

// export type Categories = Category[];