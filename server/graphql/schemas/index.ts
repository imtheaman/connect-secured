const typeDefs = /* GraphQL */ `
scalar Date
scalar JSON

type Chat {
  _id: ID!
  messages: [Message!]
  people: [String!]
}
type Message {
  content: String!
  sender: String!
  sentAt: Date!
}
type User {
  _id: ID!
  token: ID!
  about: String!
  activeChats: [String!]
  email: String!
  lastActive: Date!
  name: String!
  profilePic: String!
}
type Mutation {
  createUser(user: JSON!): User!
  updateUser(token: ID!, update: JSON!): User!
  deleteUser(token: ID!) Boolean!
}
type Query {
  getChat(chatId: ID!): Chat!
  getUser(token: String!): User!
  getProfile(email: String!): User!
}

type Subscription {
  newUser: User!
  updateUser: User!
  newMessage: Message!
  isOnline: Boolean!
}
`;

export default typeDefs;
