import { Document, Schema, model } from "mongoose";

interface Post extends Document {
  post_message: string;
  author: Schema.Types.ObjectId;
  comments: Schema.Types.ObjectId[];
}
const schemaOptions = {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
};
const postSchema = new Schema<Post>(
  {
    post_message: String,
    author: { type: Schema.Types.ObjectId, ref: "User" },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  schemaOptions
);

export default model<Post>("Post", postSchema);
