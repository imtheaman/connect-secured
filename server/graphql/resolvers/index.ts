// in large projects there will be abstractions in resolvers,
// it's a smaller project, that's why it's alright to keep all the resolvers in a single file
import { createPubSub, GraphQLYogaError } from "@graphql-yoga/node";
import { User } from "../types";
const pubsub = createPubSub<{
  newUser: [user: User];
}>();
const resolvers = {
  Query: {
    getChat: async (_: any, { chatId }: { chatId: string }, { chats }: any) => {
      return await chats.findOne({ _id: chatId });
    },
    getUser: async (_: any, { email }: { email: string }, { users }: any) => {
      return await users.findOne({ email });
    },
  },
  Mutation: {
    createUser: async (_: any, { user }: { user: string }, { users }: any) => {
      const newuser = JSON.parse(user);
      const insertedId = await users.insertOne(newuser);
      if (!insertedId)
        throw new GraphQLYogaError("couldn't insert the document in db");
      pubsub.publish("newUser", newuser);
      return newuser;
    },
    updateUser: async (_: any, { user }: { user: string }, { users }: any) => {
    }
  },
  Subscription: {
    newUser: {
      subscribe: () => pubsub.subscribe("newUser"),
      resolve: (payload: User) => payload,
    },
  },
};
export default resolvers;
