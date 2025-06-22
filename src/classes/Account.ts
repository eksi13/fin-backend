import { AccountType, Currency } from '../types';
import { AccountData } from '../models/AccountData';

export class Account implements AccountData {
    private _id: string; // UUID
    private _name: string;
    private _balance: number;
    private _type: AccountType;
    private _currency: Currency;
    private _lastUpdated: Date;

    constructor(data: AccountData) {
        this._id = data.id;
        this._name = data.name;
        this._balance = data.balance;
        this._type = data.type;
        this._currency = data.currency || Currency.EUR;
        this._lastUpdated = data.lastUpdated || new Date();
    }

    public get id(): string { return this._id }

    public get name(): string { return this._name }

    public get balance(): number { return this._balance }

    public get type(): AccountType { return this._type }

    public get currency(): Currency { return this._currency }

    public get lastUpdated(): Date { return this._lastUpdated }

    public updateName(newName: string): void {
        this._name = newName;
        this._lastUpdated = new Date();
    } 

    public updateBalance(newBalance: number): void {
        this._balance = newBalance;
        this._lastUpdated = new Date();
    }

    public increaseBalance(amount: number): void {
        if (amount < 0 ) { 
            throw new Error("Amount must be positive");
        }
        this._balance += amount;
        this._lastUpdated = new Date();
    }

    public decreaseBalance(amount: number): void {
        if (amount < 0 ) { 
            throw new Error("Amount must be positive");
        }
        this._balance -= amount;
        this._lastUpdated = new Date();
    }
}