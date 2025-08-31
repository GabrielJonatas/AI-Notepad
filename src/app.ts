import express from 'express';
import { router } from './router/notesRoutes';
const app = express();

app.use(express.json());

app.use('/notes', router);

app.get('/health', (req, res) => {
  res.status(200);
  res.send('Hello World!');
})

export default app;