import { Document, Schema, model } from "mongoose";
import bcrypt from "bcrypt";

interface User extends Document {
  username: string;
  email: string;
  password: string;
  friends: Schema.Types.ObjectId[];
}

const userSchema = new Schema<User>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

userSchema.pre<User>("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

export default model<User>("User", userSchema);
