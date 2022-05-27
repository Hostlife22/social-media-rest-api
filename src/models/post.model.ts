import mongoose from 'mongoose';

export interface PostDocument extends mongoose.Document {
  userId: string;
  desc: string;
  img: string;
  likes: string[];
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model<PostDocument>('Post', PostSchema);
