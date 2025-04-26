import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    cover_image: { type: String, required: true },
  },
  { timestamps: true }
);

export default model("Post", postSchema);
