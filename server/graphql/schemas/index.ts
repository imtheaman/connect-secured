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
  about: String!
  activeChats: [String!]
  email: String!
  lastActive: String!
  name: String!
  online: Boolean!
  profilePic: String!
}
type Mutation {
  createUser(user: String!): User!
}
type Query {
  getChat(chatId: ID!): Chat!
  getUser(email: String!): User!
}

type Subscription {
  
}
`;

export default typeDefs;
