import { InsertAccountData } from '../models/AccountData.js';
import { InsertCategoryData } from '../models/CategoryData.js';
import { InsertTransactionData } from '../models/TransactionData.js';
import { AccountType, Currency, TransactionType } from '../types/index.js';

// simple types
export function assertIsNumber(input: unknown): asserts input is number {
  if (typeof input !== 'number') {
    throw new TypeError(`Expected a number, but received: ${typeof input}`);
  }
}

export function assertIsString(input: unknown): asserts input is string {
  if (typeof input !== 'string') {
    throw new TypeError(`Expected a string, but received: ${typeof input}`);
  }
}

export function assertStringLength(input: unknown) {
  if (!((input as any).length > 0)) {
    throw new TypeError('Expected a string with at least 0 characters!');
  }
}

// complex types
export function checkIfObjectHasKeys(input: Object): boolean {
  if (Object.keys(input as Object).length === 0) {
    return false;
  } else {
    return true;
  }
}

export function assertIsDate(input: unknown): asserts input is Date {
  if (!(input instanceof Date)) {
    throw new TypeError(
      `Expected a Date, but received: ${Object.prototype.toString.call(input)}`
    );
  }
}

export function assertIsAccountType(
  input: unknown
): asserts input is AccountType {
  if (!Object.values(AccountType).includes(input as any)) {
    throw new TypeError(
      `Expected a AccountType, but received: ${Object.prototype.toString.call(input)}`
    );
  }
}

export function assertIsCurrency(input: unknown): asserts input is Currency {
  if (!Object.values(Currency).includes(input as any)) {
    throw new TypeError(
      `Expected a Currency, but received: ${Object.prototype.toString.call(input)}`
    );
  }
}

// transactions
export function assertIsTransactionType(
  input: unknown
): asserts input is TransactionType {
  if (!Object.values(TransactionType).includes(input as any)) {
    throw new TypeError(
      `Expected a TransactionType, but received: ${Object.prototype.toString.call(input)}`
    );
  }
}

export function assertInsertTransaction(
  input: InsertTransactionData
): asserts input is InsertTransactionData {
  const required: (keyof InsertTransactionData)[] = [
    'amount',
    'date',
    'categoryId',
    'accountId',
    'type',
  ];
  for (const key of required) {
    if (!input[key]) {
      throw new Error(
        `InsertTransactionData is missing required attribute: ${key}`
      );
    }
  }
  assertIsNumber(input.amount);
  assertIsDate(input.date);
  assertIsNumber(input.categoryId);
  assertIsNumber(input.accountId);
  assertIsTransactionType(input.type);

  if (input.description) {
    assertIsString(input.description);
    assertStringLength(input.description);
  }
}

export function assertInsertAccount(
  input: InsertAccountData
): asserts input is InsertAccountData {
  const required: (keyof InsertAccountData)[] = [
    'name',
    'balance',
    'type',
    'currency',
  ];
  for (const key of required) {
    if (!input[key]) {
      throw new Error(
        `InsertAccountData is missing required attribute: ${key}`
      );
    }
  }
  assertIsString(input.name);
  assertIsNumber(input.balance);
  assertIsAccountType(input.type);
  assertIsCurrency(input.currency);
}

export function assertInsertCategory(
  input: InsertCategoryData
): asserts input is InsertCategoryData {
  const required: (keyof InsertCategoryData)[] = ['name', 'budget'];
  for (const key of required) {
    if (!input[key]) {
      throw new Error(
        `InsertCategoryData is missing required attribute: ${key}`
      );
    }
  }
  assertIsString(input.name);
  assertIsNumber(input.budget);
}
