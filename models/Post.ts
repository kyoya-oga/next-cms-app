import { Model, model, models, ObjectId, Schema } from 'mongoose';

interface PostModelSchema {
  title: string;
  content: string;
  slug: string;
  meta: string;
  tags: string[];
  thumbnail: {
    url: string;
    public_id: string;
  };
  createdAt: Date;
  author: ObjectId;
}

const PostSchema = new Schema<PostModelSchema>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    tags: {
      type: [String],
    },
    thumbnail: {
      type: Object,
      url: String,
      public_id: String,
    },
    meta: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// configure for Next.js
const Post = models?.Post || model('Post', PostSchema);

export default Post as Model<PostModelSchema>;
