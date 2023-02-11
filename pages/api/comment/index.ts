import { isValidObjectId } from 'mongoose';
import { NextApiHandler } from 'next';
import dbConnect from '../../../lib/dbConnect';
import { formatComment, isAuth } from '../../../lib/utils';
import {
  commentValidationSchema,
  validateSchema,
} from '../../../lib/validator';
import Comment from '../../../models/Comment';
import Post from '../../../models/Post';
import { CommentResponse } from '../../../utils/types';

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      await getComments(req, res);
    case 'POST':
      return createNewComment(req, res);
    case 'PATCH':
      return updateComment(req, res);
    case 'DELETE':
      return removeComment(req, res);
    default:
      return res.status(404).send('Not Found');
  }
};

const getComments: NextApiHandler = async (req, res) => {
  const user = await isAuth(req, res);

  const { belongsTo } = req.query;

  if (!belongsTo || !isValidObjectId(belongsTo))
    return res.status(422).json({ error: 'Invalid request!' });

  const comments = await Comment.find({ belongsTo })
    .populate({
      path: 'owner',
      select: 'name avatar',
    })
    .populate({
      path: 'replies',
      populate: {
        path: 'owner',
        select: 'name avatar',
      },
    })
    .select('createdAt likes content repliedTo');

  if (!comments) return res.json({ comments });

  const formattedComment: CommentResponse[] = comments.map((comment) => {
    return {
      ...formatComment(comment, user),
      replies: comment.replies?.map((reply: any) => formatComment(reply, user)),
    };
  });

  res.json({ comments: formattedComment });
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

  const commentWithOwner = await comment.populate('owner');

  res.status(201).json({ comment: formatComment(commentWithOwner, user) });
};

const removeComment: NextApiHandler = async (req, res) => {
  const user = await isAuth(req, res);
  if (!user) return res.status(403).json({ error: 'Unauthorized' });

  const { commentId } = req.query;
  if (!commentId || !isValidObjectId(commentId))
    return res.status(422).json({ error: 'Invalid request!' });

  // should be able to delete only own comments
  const comment = await Comment.findOne({ _id: commentId, owner: user.id });
  if (!comment) return res.status(404).json({ error: 'Comment Not Found' });

  // if comment is a chief comment, remove all replies
  if (comment.chiefComment) {
    await Comment.deleteMany({ repliedTo: commentId });
  } else {
    // if comment is a reply, remove it from the chief comment replies array
    const chiefComment = await Comment.findById(comment.repliedTo);
    if (chiefComment?.replies?.includes(commentId as any)) {
      chiefComment.replies = chiefComment.replies.filter(
        (replyId) => replyId.toString() !== commentId.toString()
      );
      await chiefComment.save();
    }
  }

  await Comment.findByIdAndDelete(commentId);
  res.json({ removed: true });
};

const updateComment: NextApiHandler = async (req, res) => {
  const user = await isAuth(req, res);
  if (!user) return res.status(403).json({ error: 'Unauthorized' });

  const error = validateSchema(commentValidationSchema, req.body);
  if (error) return res.status(422).json({ error });

  const { commentId } = req.query;
  if (!commentId || !isValidObjectId(commentId))
    return res.status(422).json({ error: 'Invalid request!' });

  // should be able to update only own comments
  const comment = await Comment.findOne({ _id: commentId, owner: user.id });
  if (!comment) return res.status(404).json({ error: 'Comment Not Found' });

  comment.content = req.body.content;
  await comment.save();

  res.json(comment);
};

export default handler;
