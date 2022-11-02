import formidable from 'formidable';
import { NextApiHandler } from 'next';
import cloudinary from '../../../lib/cloudinary';
import { readFile } from '../../../lib/utils';
import { postValidationSchema, validateSchema } from '../../../lib/validator';
import Post from '../../../models/Post';
import { IncomingPost } from '../../../utils/types';

export const config = {
  api: { bodyParser: false },
};

const handler: NextApiHandler = (req, res) => {
  const { method } = req;

  switch (method) {
    case 'PATCH':
      return updatePost(req, res);
    case 'DELETE':
      return removePost(req, res);
    default:
      return res.status(404).send(`Not found`);
  }
};

const removePost: NextApiHandler = async (req, res) => {
  try {
    const postId = req.query.postId as string;
    const post = await Post.findByIdAndDelete(postId);

    if (!post) return res.status(404).json({ error: 'Post not found' });

    // Remove image from cloudinary
    const publicId = post.thumbnail?.public_id;
    if (publicId) await cloudinary.uploader.destroy(publicId);

    res.json({ removed: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const updatePost: NextApiHandler = async (req, res) => {
  const postId = req.query.postId as string;
  const post = await Post.findById(postId);
  if (!post) return res.status(404).json({ error: 'Post not found!' });

  const { files, body } = await readFile<IncomingPost>(req);

  let tags = [];
  if (body.tags) {
    tags = JSON.parse(body.tags as string);
  }

  const error = validateSchema(postValidationSchema, { ...body, tags });
  if (error) return res.status(400).json({ error });

  const { title, content, meta, slug } = body;
  post.title = title;
  post.content = content;
  post.meta = meta;
  post.tags = tags;
  post.slug = slug;

  const thumbnail = files.thumbnail as formidable.File;
  if (thumbnail) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      thumbnail.filepath,
      {
        folder: 'next-cms',
      }
    );

    const publicId = post.thumbnail?.public_id;
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }

    post.thumbnail = { url: secure_url, public_id };
  }

  await post.save();
  res.json({ post });
};

export default handler;
