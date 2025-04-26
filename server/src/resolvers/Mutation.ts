import User from "../models/User";
import Post from "../models/Post";
import Comment from "../models/Comment";

export const Mutation = {
  createUser: async (_, { username, fname, lname }) => {
    const newUser = new User({ username, fname, lname });
    return await newUser.save();
  },
  createPost: async (_, { user_id, title, content, cover_image }) => {
    const newPost = new Post({ user_id, title, content, cover_image });
    return await newPost.save();
  },
  createComment: async (_, { postid, sender, text }) => {
    const newComment = new Comment({ postid, sender, text, replies: [] });
    return await newComment.save();
  },
  addReply: async (_, { commentId, messageId, sender, text }) => {
    const reply = { messageId, sender, text };
    const updatedComment = await Comment.findOneAndUpdate(
      { _id: commentId },
      { $push: { replies: reply } },
      { new: true }
    );
    if (!updatedComment) throw new Error("Comment not found");
    return reply;
  },
};
