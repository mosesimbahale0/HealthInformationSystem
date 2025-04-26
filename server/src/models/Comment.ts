import { Schema, model } from "mongoose";

const commentSchema = new Schema(
  {
    postid: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    sender: { type: String, required: true },
    text: { type: String, required: true },
    replies: [
      {
        messageId: { type: Schema.Types.ObjectId, ref: "Comment" },
        sender: { type: String, required: true },
        text: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default model("Comment", commentSchema);
