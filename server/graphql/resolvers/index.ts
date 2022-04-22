// in large projects there will be abstractions in resolvers,
// it's a smaller project, that's why it's alright to keep all the resolvers in a single file
import { createPubSub, GraphQLYogaError } from "@graphql-yoga/node";
import { Message, User } from "../types";
import { dateScalar } from "../scalars";
import GraphQLJSON from "graphql-type-json";

const pubsub = createPubSub<{
  isOnline: [userId: string, payload: boolean];
  newMessage: [chatId: string, payload: Message];
}>();

const resolvers = {
  Date: dateScalar,
  JSON: GraphQLJSON,
  Query: {
    getChat: async (_, { chatId }: { chatId: string }, { chats }) => {
      return await chats.findOne({ _id: chatId });
    },
    getUser: async (_, { userId }: { userId: string }, { users }) => {
      return await users.findOne({ _id: userId });
    },
    getProfile: async (_, { userId }: { userId: string }, { users }) => {
      const options = {
        _id: 1,
        name: 1,
        about: 1,
        email: 1,
        profilePic: 1,
        lastActive: 1,
        activeChats: 0,
      };
      return await users.findOne({ _id: userId }, options);
    },
  },
  Mutation: {
    createUser: async (_, { user }: { user: User }, { users }) => {
      const insertedId = await users.insertOne(user);
      if (!insertedId)
        throw new GraphQLYogaError("couldn't insert the document in db");
      return true;
    },
    updateUser: async (
      _,
      { userId, user }: { userId: string; user: User },
      { users }
    ) => {
      const query = { _id: userId };
      const updatedUser = await users.updateOne(query, { $set: { ...user } });
      return (await updatedUser.modifiedCount) === 1 ? true : false;
    },
    deleteUser: async (_, { userId }: { userId: string }, { users }) => {
      const result = await users.deleteOne({ _id: userId });
      return (await result.deletedCount) === 1 ? true : false;
    },
    deleteChat: async (_, { chatId }: { chatId: string }, { users }) => {
      const result = await users.deleteOne({ _id: chatId });
      return (await result.deletedCount) === 1 ? true : false;
    },
    newMessage: async (
      _,
      { chatId, message }: { chatId: string; message: Message },
      { chats }
    ) => {
      const updatedChat = await chats.updateOne(
        { _id: chatId },
        {
          $push: { messages: message },
        }
      );
      if ((await updatedChat.modifiedContent) === 1) {
        pubsub.publish("newMessage", chatId, message);
        return true;
      } else return false;
    },
    isOnline: (_, { _id }: { _id: string }) => {
      pubsub.publish("isOnline", _id, true);
    },
    setLastActive: (
      _,
      { _id, lastActive }: { _id: string; lastActive: Date },
      { users }
    ) => {
      pubsub.publish("isOnline", _id, false);
      users.updateOne({ _id }, { $set: { lastActive } });
    },
  },
  Subscription: {
    newMessage: {
      subscribe: (_, { chatId }) => pubsub.subscribe("newMessage", chatId),
      resolve: (payload: Message) => payload,
    },
    isOnline: {
      subscribe: (_, { userId }) => pubsub.subscribe("isOnline", userId),
      resolve: (payload: boolean) => payload,
    },
  },
};
export default resolvers;
