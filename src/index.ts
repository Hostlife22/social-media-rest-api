import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';
import authRoute from './routes/auth.route';
import userRoute from './routes/users.route';

dotenv.config();

const app = express();
const PORT = 8080;

mongoose.connect(process.env.MONGO_URL as string, () => {
  console.log('Connected to MongoDb');
});

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);

app.listen(PORT, () => {
  console.log(`App listening on d the port ${PORT}`);
});
