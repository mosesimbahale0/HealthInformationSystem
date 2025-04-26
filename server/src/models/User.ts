import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
  },
  { timestamps: true }
);

export default model("User", userSchema);
