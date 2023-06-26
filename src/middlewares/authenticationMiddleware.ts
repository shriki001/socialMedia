import type { Request, Response, NextFunction } from "express";
import { StatusCodes } from "express-http-status";
import User from "../models/User";
import Post from "../models/Post";
import Jwt from "jsonwebtoken";
import { config } from "../config";

export function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.jwt,
    { user } = req.session as any;
  if (user) return next();
  if (token) {
    return Jwt.verify(
      token,
      config.jwtSecretKey,
      async (err: any, decodedToken: any) => {
        if (err) {
          return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ error: "Unauthorized" });
        } else {
          const user = await User.findById(decodedToken.userId);
          if (user) {
            (req.session as any).user = {
              id: user._id,
              username: user.username,
            };
            next();
          } else
            return res
              .status(StatusCodes.UNAUTHORIZED)
              .json({ error: "Unauthorized" });
        }
      }
    );
  } else
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Unauthorized" });
}

export function authorizeUser(req: Request, res: Response, next: NextFunction) {
  const { user } = req.session as any;
  const postId = req.body.post_id || req.params.post_id;
  if (!postId) return res.sendStatus(StatusCodes.NOT_FOUND);
  Post.findById(postId).then((post) => {
    if (!post) return res.sendStatus(StatusCodes.NOT_FOUND);
    if (!post.author !== user.id)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Unauthorized" });
    return next();
  });
}