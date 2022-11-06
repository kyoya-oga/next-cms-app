import { NextApiHandler } from 'next';
import dbConnect from '../../../lib/dbConnect';
import { isAuth } from '../../../lib/utils';
import {
  commentValidationSchema,
  validateSchema,
} from '../../../lib/validator';
import Comment from '../../../models/Comment';
import Post from '../../../models/Post';

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'POST':
      return createNewComment(req, res);

    default:
      return res.status(404).send('Not Found');
  }
};

const createNewComment: NextApiHandler = async (req, res) => {
  const user = await isAuth(req, res);
  if (!user) return res.status(403).json({ error: 'Unauthorized' });

  const error = validateSchema(commentValidationSchema, req.body);
  if (error) return res.status(422).json({ error });

  await dbConnect();
  const { belongsTo, content } = req.body;

  const post = await Post.findById(belongsTo);
  if (!post) return res.status(401).json({ error: 'Post not found!' });

  const comment = new Comment({
    owner: user.id,
    chiefComment: true,
    belongsTo,
    content,
  });

  await comment.save();
  res.status(201).json(comment);
};

export default handler;
