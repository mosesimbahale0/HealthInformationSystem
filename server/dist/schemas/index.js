const typeDefs = `#graphql
type User {
  id: ID!
  username: String!
  fname: String!
  lname: String!
}

type Post {
  id: ID!
  user_id: ID!
  title: String!
  content: String!
  cover_image: String!
}

type Reply {
  id: ID!
  messageId: ID!
  sender: String!
  text: String!
}

type Comment {
  id: ID!
  postid: ID!
  sender: String!
  text: String!
  replies: [Reply!]!
}

type Query {
  getUsers: [User!]!
  getUser(id: ID!): User
  getPosts: [Post!]!
  getPost(id: ID!): Post
  getComments(postid: ID!): [Comment!]!
}

type Mutation {
  createUser(username: String!, fname: String!, lname: String!): User!
  createPost(user_id: ID!, title: String!, content: String!, cover_image: String!): Post!
  createComment(postid: ID!, sender: String!, text: String!): Comment!
  addReply(commentId: ID!, messageId: ID!, sender: String!, text: String!): Reply!
}
`;
export default typeDefs;
