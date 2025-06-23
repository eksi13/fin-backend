import { TransactionType } from '../types';
import { TransactionData } from '../models/TransactionData'


export class Transaction implements TransactionData {
    private _id: number;
    private _amount: number;
    private _date: Date; // when it was booked
    private _categoryId: number; // e.g. health, food, transport
    private _accountId: number;
    private _type: TransactionType; // e.g. ausgabe / einnahme
    private _lastUpdated: Date;
    private _description: string | null ;

    constructor(data: TransactionData) {
        this._id = data.id;
        this._amount = data.amount;
        this._date = data.date;
        this._categoryId = data.categoryId;
        this._accountId  = data.accountId;
        this._type = data.type;
        this._lastUpdated = data.lastUpdated || new Date();
        this._description = data.description ?? null;
    }

    public get id(): number { return this._id }

    public get amount(): number { return this._amount }

    public get date(): Date { return this._date }

    public get categoryId(): number { return this._categoryId }
    
    public get accountId(): number { return this._accountId }
    
    public get type(): TransactionType { return this._type }
    
    public get lastUpdated(): Date { return this._lastUpdated }

    public get description(): string | null { return this._description }


    public updateAmount(newAmount: number): void { 
        this._amount = newAmount;
        this._lastUpdated = new Date();
    }

    public updateDate(newDate: Date): void { 
        this._date = newDate;
        this._lastUpdated = new Date();
    }

    public updateCategoryId(newCategoryId: number): void { 
        this._categoryId = newCategoryId;
        this._lastUpdated = new Date();
    }

    public updateAccountId(newAccountId: number): void { 
        this._accountId = newAccountId;
        this._lastUpdated = new Date();
    }

    public updateType(newType: TransactionType): void { 
        this._type = newType;
        this._lastUpdated = new Date();
    }

    public updateDescription(newDescription: string): void { 
        this._description = newDescription;
        this._lastUpdated = new Date();
    }
}