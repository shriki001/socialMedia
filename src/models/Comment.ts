import { Document, Schema, model } from "mongoose";

interface Comment extends Document {
  comment_message: string;
  author: Schema.Types.ObjectId;
}

const commentSchema = new Schema<Comment>({
  comment_message: String,
  author: { type: Schema.Types.ObjectId, ref: "User" },
});

export default model<Comment>("Comment", commentSchema);
