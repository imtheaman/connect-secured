// in large projects there will be abstractions in resolvers,
// it's a smaller project, that's why it's alright to keep all the resolvers in a single file
import { createPubSub, GraphQLYogaError } from "@graphql-yoga/node";
import { User } from "../types";
import { dateScalar } from "../scalars";
import GraphQLJSON from "graphql-type-json";

const pubsub = createPubSub<{
  newUser: [user: User];
}>();

const resolvers = {
  Date: dateScalar,
  JSON: GraphQLJSON,
  Query: {
    getChat: async (_: any, { chatId }: { chatId: string }, { chats }: any) => {
      return await chats.findOne({ _id: chatId });
    },
    getUser: async (_: any, { email }: { email: string }, { users }: any) => {
      return await users.findOne({ email });
    },
  },
  Mutation: {
    createUser: async (_: any, { user }: { user: User }, { users }: any) => {
      const insertedId = await users.insertOne(user);
      if (!insertedId)
        throw new GraphQLYogaError("couldn't insert the document in db");
      pubsub.publish("newUser", user);
      return user;
    },
    updateUser: async (
      _: any,
      { id, user }: { id: string; user: User },
      { users }: any
    ) => {
      const query = {_id: id};
      const updatedUser = await users.updateOne(query, );
    },
  },
  Subscription: {
    newUser: {
      subscribe: () => pubsub.subscribe("newUser"),
      resolve: (payload: User) => payload,
    },
  },
};
export default resolvers;
