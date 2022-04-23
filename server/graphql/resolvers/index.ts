import { createPubSub } from "@graphql-yoga/node";
import { Message, People, User } from "../types";
import GraphQLJSON from "graphql-type-json";
import { SHA512 } from "crypto-js";
import { Chat } from "../types/index";

const hash = (input: string) => SHA512(input).toString();

const pubsub = createPubSub<{
  isOnline: [userId: string, payload: boolean];
  isTyping: [userId: string, payload: boolean];
  newMessage: [chatId: string, payload: Message];
  newChat: [userId: string, payload: Chat];
}>();

// in large projects there will be abstractions in resolvers,
// it's a smaller project, that's why it's alright to keep all the resolvers in a single file
const resolvers = {
  JSON: GraphQLJSON,
  Query: {
    getChat: async (_: any, { chatId }: { chatId: string }, { chats }: any) => {
      return await chats.findOne({ _id: chatId });
    },
    getUser: async (
      _: any,
      { email, password }: { email: string; password: string },
      { users }: any
    ) => {
      const hashedPassword = hash(password);
      return await users.findOne(
        { email, password: hashedPassword },
        { password: 0 }
      );
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
    getProfiles: async (
      _: any,
      { filter, skip }: { filter?: string; skip: number },
      { users }: any
    ) => {
      const query = filter ? filter : {};
      return await users
        .findMany(query, { password: 0, activeChats: 0 })
        .skip(skip)
        .limit(10);
    },
  },
  Mutation: {
    createUser: async (
      _: any,
      {
        name,
        email,
        password,
        state,
        country,
      }: {
        name: string;
        email: string;
        password: string;
        state: string;
        country: string;
      },
      { users }: any
    ) => {
      const hashedPassword = hash(password);
      const id = email.split("@")[0] + Math.random().toString().slice(2, 7);
      const insertedId = await users.insertOne({
        _id: id,
        name,
        email,
        about: "Hey there! I'm using open sourced connect.🙌",
        lastActive: new Date(),
        state,
        country,
        password: hashedPassword,
      });
      pubsub.publish("isOnline", id, true);
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
      { people, message }: { people: People[]; message: Message },
      { users, chats, messages }: any
    ) => {
      const messagesId = await messages.insertOne({ messages: [message] });
      const newChat = {
        messages: await messagesId,
        lastMessage: message,
        people,
      };
      const chatId = await chats.insertOne();
      people.forEach(async (uid) => {
        await users.updateOne(
          { _id: uid },
          { $push: { activeChats: await chatId } }
        );
      });
      pubsub.publish("newChat", people[1].uid, {
        _id: await chatId,
        ...newChat,
      });
      return [await messagesId, await chatId];
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
      const { messages: messageId } = await chats.findOne(
        { _id: chatId },
        { messages: 1, _id: 0, lastMessage: 0, people: 0 }
      );
      const updatedMessages = await messages.updateOne(
        { _id: await messageId },
        { $push: { messages: message } }
      );

      if ((await updatedMessages.modifiedContent) === 1) {
        pubsub.publish("newMessage", chatId, message);
        return true;
      } else return false;
    },
    isOnline: (_: any, { userId }: { userId: string }) => {
      pubsub.publish("isOnline", userId, true);
      return true;
    },
    setLastActive: async (
      _: any,
      { userId, lastActive }: { userId: string; lastActive: Date },
      { users }: any
    ) => {
      pubsub.publish("isOnline", userId, false);
      const updated = await users.updateOne(
        { _id: userId },
        { $set: { lastActive } }
      );
      return (await updated.modifiedCount) === 1 ? true : false;
    },
    isTyping: (
      _: any,
      { userId, typing }: { userId: string; typing: boolean }
    ) => {
      pubsub.publish("isTyping", userId, typing);
      return true;
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
    newChat: {
      subscribe: (_: any, { userId }: { userId: string }) =>
        pubsub.subscribe("newChat", userId),
      resolve: (payload: Chat) => payload,
    },
    isTyping: {
      subscribe: (_: any, { userId }: { userId: string }) =>
        pubsub.subscribe("isTyping", userId),
      resolve: (payload: boolean) => payload,
    },
  },
};
export default resolvers;
