import { createPubSub } from "@graphql-yoga/node";
import { Message, User } from "../types";
import { dateScalar } from "../scalars";
import GraphQLJSON from "graphql-type-json";

const pubsub = createPubSub<{
  isOnline: [userId: string, payload: boolean];
  newMessage: [chatId: string, payload: Message];
}>();

// in large projects there will be abstractions in resolvers,
// it's a smaller project, that's why it's alright to keep all the resolvers in a single file
const resolvers = {
  Date: dateScalar,
  JSON: GraphQLJSON,
  Query: {
    getChat: async (_: any, { chatId }: { chatId: string }, { chats }: any) => {
      return await chats.findOne({ _id: chatId });
    },
    getUser: async (
      _,
      { email, password }: { email: string; password: string },
      { users }
    ) => {
      return await users.findOne({ email, password }, { password: 0 });
    },
    getProfile: async (
      _: any,
      { userId }: { userId: string },
      { users }: any
    ) => {
      const options = {
        password: 0,
        activeChats: 0,
      };
      return await users.findOne({ _id: userId }, options);
    },
    getMessages: async (
      _: any,
      { messagesId, from }: { messagesId: string; from: number },
      { messages }: any
    ) => {
      messages.find(
        { _id: messagesId },
        { messages: { $slice: [from, 15] }, _id: 0 }
      );
    },
    getUsers: async (_:any, {filter, skip}: {filter?: string, skip: number}, {users}: any) => {
      const query = filter ? filter: {};
      return await users.findMany(query).skip(skip).limit(10)
    }
  },
  Mutation: {
    createUser: async (_: any, { user }: { user: User }, { users }: any) => {
      const insertedId = await users.insertOne(user);
      return (await insertedId) ? true : false;
    },
    updateUser: async (
      _: any,
      { userId, user }: { userId: string; user: User },
      { users }: any
    ) => {
      const query = { _id: userId };
      const updatedUser = await users.updateOne(query, { $set: { ...user } });
      return (await updatedUser.modifiedCount) === 1 ? true : false;
    },
    deleteUser: async (
      _: any,
      { userId }: { userId: string },
      { users }: any
    ) => {
      const result = await users.deleteOne({ _id: userId });
      return (await result.deletedCount) === 1 ? true : false;
    },
    createChat: async (
      _: any,
      { people }: { people: string[]; message: string },
      { chats, messages }
    ) => {
      chats.insertOne({});
    },
    deleteChat: async (
      _: any,
      { chatId }: { chatId: string },
      { users }: any
    ) => {
      const result = await users.deleteOne({ _id: chatId });
      return (await result.deletedCount) === 1 ? true : false;
    },
    newMessage: async (
      _: any,
      { chatId, message }: { chatId: string; message: Message },
      { chats, messages }: any
    ) => {
      const updatedChat = await chats.updateOne(
        { _id: chatId },
        {
          $set: { lastMessage: message },
        }
      );
      messages;
      //*Todo newMessage, createChat, getMessages, getChat
      //*Todo hashing password on the server and matching when getUser called
      //*Todo instead of getUsers name it getProfiles
      //*Todo adding new created chat to activeChats and adding new message to it's chat's lastMessage and Messages 

      if ((await updatedChat.modifiedContent) === 1) {
        pubsub.publish("newMessage", chatId, message);
        return true;
      } else return false;
    },
    isOnline: (_: any, { userId }: { userId: string }) => {
      pubsub.publish("isOnline", userId, true);
    },
    setLastActive: (
      _: any,
      { userId, lastActive }: { userId: string; lastActive: Date },
      { users }: any
    ) => {
      pubsub.publish("isOnline", userId, false);
      users.updateOne({ _id: userId }, { $set: { lastActive } });
    },
  },
  Subscription: {
    newMessage: {
      subscribe: (_: any, { chatId }: { chatId: string }) =>
        pubsub.subscribe("newMessage", chatId),
      resolve: (payload: Message) => payload,
    },
    isOnline: {
      subscribe: (_: any, { userId }: { userId: string }) =>
        pubsub.subscribe("isOnline", userId),
      resolve: (payload: boolean) => payload,
    },
  },
};
export default resolvers;
