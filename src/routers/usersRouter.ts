import { Router } from "express";
import { Login, Register } from "../controllers/usersController";
export const usersRouter = Router();

usersRouter.post("/register", Register);
usersRouter.post("/login", Login);
