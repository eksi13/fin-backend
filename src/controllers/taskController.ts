import { Database, Statement } from 'sqlite';

class Controller {
    private db: Database;

    constructor(db: Database) {
        this.db = db;
    }

    //async createTask(task: Task): Promise<Task> {}

    // async createTask<Type>(){}

    async updateTask<Type>(){}

    async getTaskById<Type>(){}

    async getAllTasks<Type>(){}

    async deleteTask<Type>(){}


}