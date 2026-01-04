import DatabaseService from "../database/service";
import UserService from "../service/user";
import { ValidateUserSchema } from "../zod/userSchema";
import type { Request, Response } from 'express';

const userService = new UserService(new DatabaseService('user'));

export const signupUser = async (req: Request, res: Response) => {
    const user = ValidateUserSchema.safeParse(req.body);

    if(!user.success) {
        return res.status(400).json({
            error: user.error.issues[0]?.message ?? 'Unknown error'
        })
    }

    const existingUser = await userService.getUserByEmail(user.data.email);

    if(existingUser) {
        return res.status(409).json({ error: 'User with this email already exists.' });
    }
    
    try {
        user.data.password = await userService.encryptPassword(user.data.password);
        const createdUser = await userService.createUser(user.data);
        const { email } = createdUser; 
        return res.status(201).send(email);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to create user.' });
    }
}


// export const loginUser = async (req: Request, res: Response) {
    
// }