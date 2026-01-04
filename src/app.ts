import express from 'express';
import { notesRouter } from './router/notesRoutes';
import { userRouter } from './router/userRoutes';

const app = express();

app.use(express.json());

app.use('/notes', notesRouter);

app.use('/user', userRouter);

app.get('/health', (req, res) => {
  res.status(200);
  res.send('Hello World!');
})

export default app;