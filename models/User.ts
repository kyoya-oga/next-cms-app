import { Model, model, models, ObjectId, Schema } from 'mongoose';

export interface UserModelSchema {
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
  provider: 'github';
}

const UserSchema = new Schema<UserModelSchema>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'admin'],
    },
    provider: {
      type: String,
      enum: ['github'],
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

// configure for Next.js
const User = models?.User || model('User', UserSchema);

export default User as Model<UserModelSchema>;
