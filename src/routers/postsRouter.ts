import { Router } from "express";
import {
  authenticateUser,
  authorizeUser,
} from "../middlewares/authenticationMiddleware";
import {
  PostAPost,
  GetPosts,
  EditPost,
  DeletePost,
} from "../controllers/postsController";
export const postsRouter = Router();

postsRouter.post("/", authenticateUser, PostAPost);
postsRouter.get("/", authenticateUser, GetPosts);
postsRouter.put("/", authenticateUser, authorizeUser, EditPost);
postsRouter.delete("/:post_id", authenticateUser, authorizeUser, DeletePost);
