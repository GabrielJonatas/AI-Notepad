import Router from 'express';
import { loginUser, signupUser } from '../controller/user';

export const userRouter = Router();

userRouter.post('/createUser', signupUser);

userRouter.post('/login', loginUser);