import { CategoryData, InsertCategoryData, UpdateCategoryData} from '../../models/CategoryData.js';
import { TableRepository } from './TableRepository.js';

export class CategoryRepository {
    private static instance: CategoryRepository | null;
    private TableRepository: TableRepository;


    private constructor(TableRepository: TableRepository) {
        this.TableRepository = TableRepository;
    };


    public static getInstance(TableRepository: TableRepository): CategoryRepository {
        if(!CategoryRepository.instance) {
            CategoryRepository.instance = new CategoryRepository(TableRepository);
        }
        return CategoryRepository.instance;
    };


    public async createCategory(account: InsertCategoryData): Promise<CategoryData>  {
        return await this.TableRepository.create(account);
    };
    

    public async getCategoryById(id: number): Promise<CategoryData> {
        return await this.TableRepository.getById(id);
    };
    

    public async getAllCategories(): Promise<CategoryData[]> {
        return await this.TableRepository.getAll();
    };
    

    public async updateCategory(id: number, updates: UpdateCategoryData) {
        return await this.TableRepository.update(id, updates);
    };


    public async deleteCategory(id: number): Promise<boolean> {
        return await this.TableRepository.delete(id);
    };
};