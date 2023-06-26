import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import { StatusCodes } from "express-http-status";
import Jwt from "jsonwebtoken";
import { config } from "../config";

export const Register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "user already exists" });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.json({ message: "Registration successful" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

export const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Invalid email or password" });
    }

    const token = Jwt.sign(
      { userId: user._id },
      config.jwtSecretKey as Jwt.Secret,
      {
        expiresIn: "1h",
      }
    );

    (req.session as any).user = {
      id: user._id,
      username: user.username,
    };

    res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 }); // Cookie expires in 1 hour

    res.json({ message: "Login successful", token });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};
