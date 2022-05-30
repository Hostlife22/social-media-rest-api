import mongoose from 'mongoose';

export interface UserDocument extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  profilePicture: string;
  coverPicture: string;
  followers: number[];
  followins: number[];
  isAdmin: boolean;
  desc: string;
  city: string;
  from: string;
  relationship: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserReq {
  _id: string;
  username: string;
  profilePicture: string;
}

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: '',
    },
    coverPicture: {
      type: String,
      default: '',
    },
    followers: {
      type: Array,
      default: [],
    },
    followins: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      max: 50,
    },
    from: {
      type: String,
      max: 50,
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
  },
  { timestamps: true }
);

export default mongoose.model<UserDocument>('User', UserSchema);
