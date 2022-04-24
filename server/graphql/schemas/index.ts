const typeDefs = /* GraphQL */ `
scalar JSON

type Chat {
  _id: ID!
  messages: ID!
  lastMessage: Message!
  people: [People!]
}
type People {
  uid: ID!,
  lastOpened: Float
}
type Messages {
  _id: ID!
  messages: [Message!]
}
type Message {
  content: String!
  sender: String!
  sentAt: Float!
}
type User {
  _id: ID!
  about: String!
  state: String!
  country: String!
  activeChats: [String!]
  email: String!
  lastActive: Float!
  name: String!
  profilePic: String
}
type Profile {
  _id: ID!
  about: String!
  state: String!
  country: String!
  email: String!
  lastActive: Float!
  name: String!
  profilePic: String
}
type CreateChatReturn {
  messagesId: String!
  chatId: String!
}
type Mutation {
  # user
  createUser(name: String!, email: String!, password: String!, state: String!, country: String!): User!
  updateUser(userId: ID!, update: JSON!): Boolean!
  deleteUser(userId: ID!, password: String!): Boolean!
  setLastActive(userId: ID!, lastActive: Float!): Boolean!
  isOnline(userId: String!): Boolean
  isTyping(userId: String!, typing: Boolean!): Boolean
  #chat
  createChat(people: [JSON!]!, message: [JSON!]!): 
  deleteChat(userId: ID!, chatId: ID!): Boolean!
  newMessage(chatId: ID!, message: JSON!): Boolean!
}
type Query {
  #chat
  getChat(chatId: ID!): Chat!
  getMessages(messagesId: ID!, from: Int!): Messages!
  #user
  getUser(email: String!, password: String!): User!
  getProfiles(filter: JSON, skip: Int!): [Profile]
  getProfile(userId: ID!): User!
}

type Subscription {
  isTyping: Boolean!
  isOnline: Boolean!
  newMessage: Message!
  newChat: Chat!
}
`;

export default typeDefs;
