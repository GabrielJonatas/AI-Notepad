import dotenv from 'dotenv';
import app from './app';

dotenv.config();
const PORT = parseInt(process.env.PORT || '3001');

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
