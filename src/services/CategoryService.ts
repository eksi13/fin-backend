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

  // read
  public async getCategoryById(id: number): Promise<CategoryData> {
    return await this.repository.getCategoryById(id);
  }

  public async getAllCategories(): Promise<CategoryData[]> {
    return await this.repository.getAllCategories();
  }

  // update
  public async updateCategory(
    id: number,
    changes: UpdateCategoryData,
  ): Promise<CategoryData> {
    if (!changes || Object.keys(changes).length === 0) {
      throw new Error(`Invalid account updates: '${JSON.stringify(changes)}'`);
    }

    if (
      changes.name &&
      (!(typeof changes.name === 'string') || !(changes.name.length > 0))
    ) {
      throw new Error(`Name not allowed for updates: '${changes.name}'`);
    }

    if (changes.budget && !(typeof changes.budget === 'number')) {
      throw new Error(`Budget invalid for updates: '${changes.budget}'`);
    }

    return (await this.repository.updateCategory(id, changes)) as CategoryData;
  }

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

  // delete
  public async deleteCategory(id: number): Promise<boolean> {
    return await this.repository.deleteCategory(id);
  }
}

export default CategoryService;
