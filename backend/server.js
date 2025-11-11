import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bugRoutes from './routes/bugRoutes.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Intentional bug for debugging demo (remove in production)
// app.use((req, res, next) => { nonexistentVar.toString(); });

app.use('/api/bugs', bugRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/bugtracker')
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log(err));