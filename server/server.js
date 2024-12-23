// server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/mongodb.js';

// Mevcut router’lar
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';
// Yeni eklediğimiz AI router
import aiRoutes from './routes/aiRoutes.js';

const PORT = process.env.PORT || 3000;
const app = express();

// Orta katmanlar (middleware)
app.use(express.json());
app.use(cors());

// API rotaları
app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);
app.use('/api/ai', aiRoutes);  // <--- Önemli!

// Basit bir GET
app.get('/', (req, res) => res.send("API Working"));

// Veritabanı bağlantısı ve sunucu başlatma
try {
  await connectDB();
  app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
  });
} catch (error) {
  console.error("Database connection failed. Server not started.", error);
  process.exit(1);
}
