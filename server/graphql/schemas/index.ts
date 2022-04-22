const typeDefs = /* GraphQL */ `
scalar Date
scalar JSON

type Chat {
  _id: ID!
  messages: ID!
  lastMessage: Message
  lastOpened: [LastOpened!]!
  people: [String!]
}
type LastOpened {
  uid: ID!,
  lastOpened: Date
}
type Messages {
  _id: ID!
  messages: [Message!]
}
type Message {
  content: String!
  sender: String!
  sentAt: Date!
}
type User {
  _id: ID!
  about: String!
  activeChats: [String!]
  email: String!
  lastActive: Date!
  name: String!
  profilePic: String!
}
type Mutation {
  createUser(user: JSON!): Boolean!
  updateUser(userId: ID!, update: JSON!): Boolean!
  deleteUser(userId: ID!): Boolean!
  deleteChat(chatId: ID!): Boolean!
  setLastActive(userId: ID!, lastActive: Date!)
  newMessage(chatId: ID!, message: JSON!): Boolean!
}
type Query {
  getChat(chatId: ID!): Chat!
  getUser(userId: ID!): User!
  getProfile(userId: ID!): User!
  getMessages(chatId: ID!): Messages!
}

type Subscription {
  newUser: User!
  newMessage: Message!
  isOnline: Boolean!
}
`;

export default typeDefs;
