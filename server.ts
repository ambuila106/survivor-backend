import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import survivorRoutes from './routes/survivorRoutes';
import playerRoutes from './routes/playerRoutes';
import seedSurvivors from './seeds/seedData';
import adminRoutes from './routes/adminRoutes';
import leaderboardRoutes from './routes/leaderBoardRoutes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/survivor')
  .then(() => {
    console.log('✅ Connected to MongoDB');
    seedSurvivors();
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
  });

app.use('/api/survivor', survivorRoutes);
app.use('/api/players', playerRoutes);

app.use('/api/admin', adminRoutes);

app.use('/api/leaderboard', leaderboardRoutes);


const PORT = process.env.PORT || 4300;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));