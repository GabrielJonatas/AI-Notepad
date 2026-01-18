import type DatabaseService from "../database/service";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { AuthPayload } from "../types/middleware";

export default class UserService {
    constructor (private readonly databaseService?: DatabaseService) {}
    
    async getUserByEmail(email: string) {
        if(!this.databaseService) {
            throw new Error('Database service not initialized.');
        }

        return await this.databaseService.getUnique({ email: email });
    }

    async createUser(userData: { email: string; password: string; }) {
        if(!this.databaseService) {
            throw new Error('Database service not initialized.');
        }

        return await this.databaseService.create(userData);
    }

    async encryptPassword(password: string) {
        const newPassword = await bcrypt.hash(password, 10);
        return newPassword;
    }

    async comparePassword(password: string, hashedPassword: string) {
        return await bcrypt.compare(password, hashedPassword);
    }

    async createJwtToken(payload: AuthPayload) {
        try {
            const genToken = jwt.sign(payload, process.env.JWT_SECRET_KEY as string, { expiresIn: '1h' });
            return genToken;
        } catch (err) {
            throw new Error('Failed to generate JWT token.');
        }
    }

    async verifyJwtToken(token: string) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
            return decoded;
        } catch (err) {
            throw new Error('Invalid or expired JWT token.');
        }
    }
}