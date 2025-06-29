import { CategoryData, InsertCategoryData, UpdateCategoryData} from '../../models/CategoryData.js';
import TableRepository from './TableRepository.js';
import DbClient from '../client/DbClient.js';


class CategoryRepository {
    private static instance: CategoryRepository | null;
    private dbClient: DbClient;
    private tableRepository: TableRepository;
    private static readonly TABLE_NAME = 'category_table';


    private constructor(dbClient: DbClient) {
        this.dbClient = dbClient;
        this.tableRepository = new TableRepository(this.dbClient, CategoryRepository.TABLE_NAME);
    };


    public static getInstance(dbClient: DbClient): CategoryRepository {
        if(!CategoryRepository.instance) {
            CategoryRepository.instance = new CategoryRepository(dbClient);
        };
        return CategoryRepository.instance;
    };


    public async createCategory(category: InsertCategoryData): Promise<CategoryData>  {
        return await this.tableRepository.create(category);
    };
    

    public async getCategoryById(id: number): Promise<CategoryData> {
        const result = await this.tableRepository.getById(id);
        if(!result) {
            throw new Error(`Category with ID ${id} not found`);
        };
        return await this.tableRepository.getById(id);
    };
    

    public async getAllCategories(): Promise<CategoryData[]> {
        const result = await this.tableRepository.getAll() as CategoryData[];
        if (result.length === 0) {
            throw new Error('No categories found in database');
        };
        return result;
    };
    

    public async updateCategory(id: number, updates: UpdateCategoryData) {
        const result =  await this.tableRepository.update(id, updates);
        if (!result) {
            throw new Error(`Could not update category with ID ${id}, category not found`);
        }
        return result as CategoryData;
    };


    public async deleteCategory(id: number): Promise<boolean> {
        const result = await this.tableRepository.getById(id);
        if(!result) {
            throw new Error(`Could not delete category with ID ${id}, category not found`);
        };
        return await this.tableRepository.delete(id);
    };
};

export default CategoryRepository;