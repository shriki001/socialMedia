import { Request, Response } from "express";
import Post from "../models/Post";
import Comment from "../models/Comment";
import { StatusCodes } from "express-http-status";
import User from "../models/User";

export const GetPostsComments = async (req: Request, res: Response) => {
  const user = (req.session as any).user;
  const { post_id } = req.params;
  const { friends } = await User.findById(user.id);
  const post = await Post.findOne({
    _id: post_id,
    author: { $in: [user.id, ...friends] },
  });
  return res.send(post);
};

export const PostAComment = async (req: Request, res: Response) => {
  const { comment_message } = req.body;
  const { post_id } = req.params;
  const user = (req.session as any).user;
  const newComment = new Comment({ comment_message, author: user.id });
  const { _id } = await newComment.save();
  await Post.findByIdAndUpdate(post_id, { $push: { comments: _id } });
  return res.status(StatusCodes.CREATED).send("comment created");
};

export const EditPostComment = async (req: Request, res: Response) => {
  const { comment_message, comment_id } = req.body;
  return Comment.findByIdAndUpdate(comment_id, { comment_message });
};

export const DeletePostComment = async (req: Request, res: Response) => {
  const { comment_id } = req.params;
  return Comment.findOneAndDelete({ _id: comment_id });
};
