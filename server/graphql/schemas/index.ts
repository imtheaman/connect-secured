const typeDefs = /* GraphQL */ `
scalar Date
scalar JSON

type Chat {
  _id: ID!
  messages: ID!
  lastMessage: Message!
  people: [People!]
}
type People {
  uid: ID!,
  lastOpened: String!
}
type Messages {
  _id: ID!
  messages: [Message!]
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
  lastActive: Date!
  name: String!
  profilePic: String!
}
type Mutation {
  # user
  createUser(user: JSON!): Boolean!
  updateUser(userId: ID!, update: JSON!): Boolean!
  deleteUser(userId: ID!): Boolean!
  setLastActive(userId: ID!, lastActive: Date!)
  isOnline(userId: String!)
  #chat
  createChat()
  deleteChat(chatId: ID!): Boolean!
  newMessage(chatId: ID!, message: JSON!): Boolean!
}
type Query {
  #chat
  getChat(chatId: ID!): Chat!
  getMessages(messagesId: ID!, from: Int!): Messages!
  #user
  getUser(email: String!, password: String!): User!
  getUsers(filter: String, skip: Int!): [User]
  getProfile(userId: ID!): User!
}

type Subscription {
  newMessage: Message!
  isOnline: Boolean!
}
`;

export default typeDefs;
