import { CategoryData, InsertCategoryData, UpdateCategoryData } from '../models/CategoryData.js';
import CategoryRepository from '../db/repositories/CategoryRepository.js';

class CategoryService {
  private repository: CategoryRepository;

  public constructor(repository: CategoryRepository) {
    this.repository = repository;
  }

  // create
  public async createCategory(
    category: InsertCategoryData,
  ): Promise<CategoryData> {
    if (
      !category.name ||
      category.name === '' ||
      !(typeof category.name === 'string')
    ) {
      throw new Error(`Invalid account name: '${category.name}'`);
    }
    if (!category.budget || !(typeof category.budget === 'number')) {
      throw new Error(`Invalid account balance: '${category.budget}'`);
    }
    return await this.repository.createCategory(category);
  }

  // // read
  // public async getAccountById(id: number): Promise<AccountData> {
  //   return await this.repository.getAccountById(id);
  // }

  // public async getAllAccounts(): Promise<AccountData[]> {
  //   return await this.repository.getAllAccounts();
  // }

  // // update
  // public async updateAccount(
  //   id: number,
  //   changes: UpdateAccountData,
  // ): Promise<AccountData> {
  //   if (!changes || Object.keys(changes).length === 0) {
  //     throw new Error(`Invalid account updates: '${JSON.stringify(changes)}'`);
  //   }

  //   if (
  //     changes.name &&
  //     (!(typeof changes.name === 'string') || !(changes.name.length > 0))
  //   ) {
  //     throw new Error(`Name not allowed for updates: '${changes.name}'`);
  //   }

  //   if (changes.balance && !(typeof changes.balance === 'number')) {
  //     throw new Error(`Balance invalid for updates: '${changes.currency}'`);
  //   }

  //   if (changes.type && !Object.values(AccountType).includes(changes.type)) {
  //     throw new Error(`Type not allowed for updates: '${changes.type}'`);
  //   }

  //   if (
  //     changes.currency &&
  //     !Object.values(Currency).includes(changes.currency)
  //   ) {
  //     throw new Error(
  //       `Currency not allowed for updates: '${changes.currency}'`,
  //     );
  //   }

  //   return (await this.repository.updateAccount(id, changes)) as AccountData;
  // }

  // public async adjustBalance(
  //   id: number,
  //   amount: number,
  //   decrease: boolean,
  // ): Promise<AccountData> {
  //   if (!amount || !(typeof amount === 'number')) {
  //     throw new Error(`Invalid amount: '${amount}'`);
  //   }

  //   const account = await this.repository.getAccountById(id);
  //   account.balance += decrease ? -amount : amount;

  //   return (await this.repository.updateAccount(id, {
  //     balance: account.balance,
  //   })) as AccountData;
  // }

  // // delete
  // public async deleteAccount(id: number): Promise<boolean> {
  //   return await this.repository.deleteAccount(id);
  // }
}

export default CategoryService;
