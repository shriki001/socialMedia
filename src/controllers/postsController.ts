import { Request, Response } from "express";
import Post from "../models/Post";
import { StatusCodes } from "express-http-status";
import User from "../models/User";

export const GetPosts = async (req: Request, res: Response) => {
  const user = (req.session as any).user;
  const { friends } = await User.findById(user.id);
  const posts = await Post.find({ author: { $in: [user.id, ...friends] } });
  return res.send(posts);
};

export const PostAPost = async (req: Request, res: Response) => {
  const { post_message } = req.body;
  const user = (req.session as any).user;
  const newPost = new Post({ post_message, author: user.id });
  await newPost.save();
  return res.status(StatusCodes.CREATED).send("Post created");
};

export const EditPost = async (req: Request, res: Response) => {
  const { post_message, post_id } = req.body;
  return Post.findByIdAndUpdate(post_id, { post_message });
};

export const DeletePost = async (req: Request, res: Response) => {
  const { post_id } = req.params;
  return Post.findOneAndDelete({ _id: post_id });
};
