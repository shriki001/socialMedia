import { Router } from "express";
import {
  GetPostsComments,
  PostAComment,
  EditPostComment,
  DeletePostComment,
} from "../controllers/commentsController";
import { authenticateUser } from "../middlewares/authenticationMiddleware";

export const commentsRouter = Router();

commentsRouter.post("/:post_id", authenticateUser, GetPostsComments);
commentsRouter.get("/:post_id", authenticateUser, PostAComment);
commentsRouter.put("/:comment_id", authenticateUser, EditPostComment);
commentsRouter.delete("/:comment_id", authenticateUser, DeletePostComment);
