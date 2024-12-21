import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoutes.js';
import connectDB from './configs/mongodb.js';
import imageRouter from './routes/imageRoutes.js';

const PORT = process.env.PORT || 5000;
const app = express();

// Orta katmanlar
app.use(express.json());
app.use(cors());

// API rotaları
app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);

app.get('/', (req, res) => res.send("API Working"));

try {
  await connectDB();
  app.listen(PORT, () => console.log('Server running on port ' + PORT));
} catch (error) {
  console.error("Database connection failed. Server not started.", error);
  process.exit(1);
}
