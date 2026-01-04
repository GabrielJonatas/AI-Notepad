import type DatabaseService from "../database/service";
import bcrypt from 'bcrypt';

export default class UserService {
    constructor (private readonly databaseService: DatabaseService) {}
    
    async getUserByEmail(email: string) {
        return await this.databaseService.getUnique({ email: email });
    }

    async createUser(userData: { email: string; password: string; }) {
        return await this.databaseService.create(userData);
    }

    async encryptPassword(password: string) {
        const newPassword = await bcrypt.hash(password, 10);
        return newPassword;
    }
}