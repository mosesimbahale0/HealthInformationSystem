// import User from "../models/User";
// import Post from "../models/Post";
// import Comment from "../models/Comment";

// export const Query = {
//   getUsers: async () => await User.find({}),
//   getUser: async (_, { id }) => await User.findById(id),
//   getPosts: async () => await Post.find({}),
//   getPost: async (_, { id }) => await Post.findById(id),
//   getComments: async (_, { postid }) => await Comment.find({ postid }),
// };

export const Subscriptions = {
  commentAdded: {
    subscribe: (parent, args, { pubsub }) => {
      return pubsub.asyncIterator("COMMENT_ADDED");
    },
  },
  postAdded: {
    subscribe: (parent, args, { pubsub }) => {
      return pubsub.asyncIterator("POST_ADDED");
    },
  },
};
