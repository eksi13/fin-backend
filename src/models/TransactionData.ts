import { TransactionType } from '../types';

export interface TransactionData {
    id: string; // UUID
    amount: number;
    date: Date; // when it was booked
    categoryId: string; // e.g. health, food, transport
    accountId: string;
    type: TransactionType; // e.g. ausgabe / einnahme
    lastUpdated: Date;

    description?: string | null;
}