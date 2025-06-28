import { AccountData, InsertAccountData, UpdateAccountData } from "../models/AccountData";
import { AccountType, Currency } from "../types/index.js";
import { AccountRepository } from "../db/repositories/AccountRepository";


// service layer, used for business logic
// interactions with transactions

// change currency -> hole aktuellen umrechenkurs?



// how do AccountData & AccountService interact?

// TODO currency conversion: https://www.npmjs.com/package/easy-currencies



export class AccountService {
    private repository: AccountRepository;    

    public constructor(repository: AccountRepository) {
        this.repository = repository;
    };

    // create
    public async createAccount(account: InsertAccountData): Promise<AccountData> {
        if (!account.name || account.name === '' || !(typeof account.name === 'string')) {
            throw new Error(`Invalid account name: '${account.name}'`);
        }
        if (!account.balance || !(typeof account.balance === 'number')) {
            throw new Error(`Invalid account balance: '${account.balance}'`);
        }
        if (!account.type || !Object.values(AccountType).includes(account.type)) {
            throw new Error(`Invalid account type: '${account.type}'`);
        }
        if (!account.currency || !Object.values(Currency).includes(account.currency)) {
            throw new Error(`Invalid account currency: '${account.currency}'`);
        }
        // TODO add try and catch for db functions / repositories
        return await this.repository.createAccount(account);
    };


    // read
    public async getAccountById(id: number): Promise<AccountData> {
        return await this.repository.getAccountById(id);
    };

    public async getAllAccounts(): Promise<AccountData[]> {
        return await this.repository.getAllAccounts();
    };


    // update 
    public async updateAccount(id: number, changes: UpdateAccountData): Promise<AccountData> {
        if (!changes || (Object.keys(changes).length === 0)) { 
            throw new Error(`Invalid account updates: '${JSON.stringify(changes)}'`);
        }
        
        if (changes.name && (!(typeof changes.name === 'string' ) || !(changes.name.length > 0))) {
            throw new Error(`Name not allowed for updates: '${changes.name}'`);
        }

        if (changes.balance && (!(typeof changes.balance === 'number' ))) {
            throw new Error(`Balance invalid for updates: '${changes.currency}'`);
        }

        if (changes.type && !Object.values(AccountType).includes(changes.type)) {
            throw new Error(`Type not allowed for updates: '${changes.type}'`);
        } 

        if (changes.currency && !Object.values(Currency).includes(changes.currency)) {
            throw new Error(`Currency not allowed for updates: '${changes.currency}'`);
        }

        return await this.repository.updateAccount(id, changes) as AccountData;
    };


    public async adjustBalance(id: number, amount: number, decrease: boolean): Promise<AccountData> {
        if (!amount || (!(typeof amount === 'number' ))) {
            throw new Error(`Invalid amount: '${amount}'`);
        };



        const account = await this.repository.getAccountById(id);
        account.balance += decrease ? -amount : amount;

        return await this.repository.updateAccount(id, {balance: account.balance}) as AccountData;
    };

    
    // delete
    public async deleteAccount(id: number): Promise<boolean> {
        return await this.repository.deleteAccount(id);
    };


    // future
    /*
    - currency conversion service
    - format account summary
    - account error class in a seperate file AccountErrors.ts ??
    - archiving
    - account locking (what even is this?)
    */

};