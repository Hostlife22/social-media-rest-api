import mongoose from 'mongoose';

export interface ConversationDocument extends mongoose.Document {
  members: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ConversationDocument>(
  'Conversation',
  ConversationSchema
);
