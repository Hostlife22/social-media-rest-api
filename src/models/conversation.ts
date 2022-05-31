import mongoose from 'mongoose';

export interface ConversationDocument extends mongoose.Document {}

const ConversationSchema = new mongoose.Schema({});

export default mongoose.model<ConversationDocument>(
  'Conversation',
  ConversationSchema
);
