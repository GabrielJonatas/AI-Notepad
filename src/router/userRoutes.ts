import Router from 'express';
import { signupUser } from '../controller/user';

export const userRouter = Router();

userRouter.post('/createUser', signupUser);
