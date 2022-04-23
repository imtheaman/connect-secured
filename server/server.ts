import { createServer } from "@graphql-yoga/node";
import { MongoClient } from "mongodb";
import typeDefs from "./graphql/schemas";
import resolvers from "./graphql/resolvers";
const process = require("dotenv").config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

client.connect((err) => console.log("db is connected"));
const db = client.db("connect");
const users = db.collection("users");
const chats = db.collection("chats");
const messages = db.collection("messages");

const server = createServer({
  schema: {
    typeDefs,
    resolvers,
  },
  context: {
    chats,
    users,
    messages,
  },
});
server.start();
