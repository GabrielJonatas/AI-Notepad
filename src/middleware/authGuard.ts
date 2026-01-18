import type { Request, Response, NextFunction } from 'express';
import UserService from '../service/user';

const userService = new UserService();

export async function authGuard(req: Request, res: Response, next: NextFunction): Promise<void> {
    const header = req.headers['authorization'];
    if (!header) {
        res.status(401).json({ error: 'Unauthorized: No authorization header provided.' });
        return;
    }

    const token = header.split(' ')[1];
    if (!token) {
        res.status(401).json({ error: 'Unauthorized: No token provided.' });
        return;
    }

    let payload = null;

    try {
        payload = await userService.verifyJwtToken(token);
    } catch (error) {
        res.status(500).json({ error: 'Failed to verify token.' });
        return;
    }

    if (!payload) {
        res.status(401).json({ error: 'Unauthorized: Invalid or expired token.' });
        return;
    }

    res.locals.user = payload;

    next();
}