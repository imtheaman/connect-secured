import { createServer } from "@graphql-yoga/node";
import { MongoClient, ServerApiVersion } from "mongodb";
import typeDefs from "./graphql/schemas";
import resolvers from "./graphql/resolvers";
// const process = require("dotenv").config();

const uri =
  "mongodb+srv://urtheaman:9192631770@cluster0.uzgiq.mongodb.net/connect?retryWrites=true&w=majority&ssl=true";
const client = new MongoClient(uri, {
  // @ts-ignore
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

client.connect((err) => console.log("db is connected"));
const db = client.db("connect");
const users = db.collection("users");
const chats = db.collection("chats");

const server = createServer({
  schema: {
    typeDefs,
    resolvers,
  },
  context: {
    chats,
    users,
  },
});
server.start();
