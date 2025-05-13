import { CategoryData } from '../models/CategoryData';

export class Category implements CategoryData {
    private _id: string; // UUID
    private _name: string;
    private _lastUpdated: Date;
    private _budget: number | null;
    
    constructor(data: CategoryData) {
        this._id = data.id!;
        this._name = data.name;
        this._lastUpdated = data.lastUpdated!;
        this._budget = data.budget ?? null;
    }

    public get id(): string { return this._id }

    public get name(): string { return this._name }

    public get lastUpdated(): Date { return this._lastUpdated }

    public get budget(): number | null { return this._budget }

    public updateBudget(newBudget: number): void {
        this._budget = newBudget;
        this._lastUpdated = new Date();
    } 

    public increaseBudget(amount: number): void {
        if (amount < 0 ) { 
            throw new Error("Amount must be positive");
        }
        if (this._budget !== null) {
            this._budget += amount;
        } else {
            this._budget = amount;
        }
        this._lastUpdated = new Date();
    } 

    public decreaseBudget(amount: number): void {
        if (amount < 0 ) { 
            throw new Error("Amount must be positive");
        }
        if (this._budget == null) {
            throw new Error("Cannot decrease: Budget not set");
        }
        if (this._budget < amount) {
            throw new Error(`Insufficient budget: Cannot decrease by ${amount}. Current budget is ${this._budget}`);
        }
        this._budget -= amount;
        this._lastUpdated = new Date();
    }
}

