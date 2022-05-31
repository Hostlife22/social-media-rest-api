import mongoose from 'mongoose';

export interface MessageDocument extends mongoose.Document {
  userId: string;
  desc: string;
  img: string;
  likes: string[];
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new mongoose.Schema({});

export default mongoose.model<MessageDocument>('Message', MessageSchema);
