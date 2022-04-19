// in large projects there will be abstractions in resolvers,
// it's a smaller project, that's why it's alright to keep all the resolvers in a single file
import { createPubSub } from "@graphql-yoga/node";
const pubsub = createPubSub<{
  newUser: [user: User]
}>()
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
    createUser: async (_: any, { user }: any, { users }: any) => {
      return await users.insertOne(user);
    },
  },
};
export default resolvers;
