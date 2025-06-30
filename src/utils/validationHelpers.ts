import { InsertTransactionData } from "../models/TransactionData";
import { AccountType, TransactionType } from "../types";


// simple types
export function assertIsNumber(input: unknown): asserts input is number {
    if (!(typeof input !== 'number') ) {
        throw new TypeError(`Expected a number, but received: ${typeof input}`);
    } 
};


export function assertIsString(input: unknown): asserts input is string {
    if (!(typeof input !== 'string') ) {
        throw new TypeError(`Expected a string, but received: ${typeof input}`);
    } 
};


export function assertStringLenght(input: unknown) {
    if (!((input as any).length > 0)) {
        throw new TypeError('Expected a string with at least 0 characters!');
    }
};


// complex types
export function checkIfObjectHasKeys(input: unknown): boolean {
    if((Object.keys(input as Object).length === 0)) { 
        return true; // object has keys -> true
    } else {
        return false; // object has keys -> false
    }
};


export function assertIsDate(input: unknown): asserts input is Date {
    if (!(input instanceof Date) ) {
        throw new TypeError(`Expected a Date, but received: ${Object.prototype.toString.call(input)}`);
    } 
};


export function assertIsAccountType(input: unknown): asserts input is AccountType {
    if (!(Object.values(AccountType).includes(input as any)) ) {
        throw new TypeError(`Expected a AccountTpye, but received: ${Object.prototype.toString.call(input)}`);
    } 
};


// transactions
export function assertIsTransactionType(input: unknown): asserts input is TransactionType {
    if (!(Object.values(TransactionType).includes(input as any)) ) {
        throw new TypeError(`Expected a TransactionType, but received: ${Object.prototype.toString.call(input)}`);
    } 
};


// TODO maybe mmove somewhere else more fitting?
export function assertInsertTransaction(input: InsertTransactionData): asserts input is InsertTransactionData {
    if (!input.amount || !input.date || !input.categoryId || !input.accountId || !input.type) {
        throw new Error('InsertTransactionData is missing an attribute');
    }
    assertIsNumber(input.amount);
    assertIsDate(input.date);
    assertIsNumber(input.categoryId);
    assertIsNumber(input.accountId);
    assertIsNumber(input.amount);
    assertIsTransactionType(input.type);
    
    if(input.description) {
        assertIsString(input.description);
        assertStringLenght(input.description);
    }
};
