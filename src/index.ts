import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';
import authRoute from './routes/auth.route';
import conversationRoute from './routes/conversation.route';
import fileRoute from './routes/file.route';
import messageRoute from './routes/message.route';
import postRoute from './routes/post.route';
import userRoute from './routes/users.route';

dotenv.config();

const app = express();
const PORT = 5000;

mongoose.connect(process.env.MONGO_URL as string, () => {
  console.log('Connected to MongoDb');
});

app.use('/images', express.static('public/images'));

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

app.use('/api/upload', fileRoute);
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);

app.use('/api/conversations', conversationRoute);
app.use('/api/messages', messageRoute);

app.listen(PORT, () => {
  console.log(`App listening on d the port ${PORT}`);
});
