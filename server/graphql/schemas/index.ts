const typeDefs = /* GraphQL */ `
  type Chat {
  _id: ID!
  messages: [Message!]
  people: [String!]
}
type Message {
  content: String!
  sender: String!
  sentAt: String!
}
type User {
  _id: ID!
  token: ID!
  about: String!
  activeChats: [String!]
  email: String!
  lastActive: String!
  name: String!
  profilePic: String!
}
type Mutation {
  createUser(user: String!): User!
  updateUser(token: ID!, update: String!): User!
  deleteUser(token: ID!)
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
