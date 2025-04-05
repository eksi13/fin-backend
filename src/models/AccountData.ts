import { AccountType } from '../types';

export interface AccountData {
    id: string; // UUID
    name: string;
    balance: number;
    type: AccountType;
    currency: string;
    lastUpdated: Date;
}