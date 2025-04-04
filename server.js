const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const dotenv = require("dotenv");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

dotenv.config();

const mongodb_atlas_url = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(mongodb_atlas_url);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(`Unable to connect to DB: ${error.message}`);
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();


app.use(cors({
    origin: process.env.CLIENT_ORIGIN || "*"
  }));
  

app.use(express.json({ limit: '10mb' }));

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: process.env.PORT || 4000 }, () => {
    console.log(`Server ready on port ${process.env.PORT || 4000}${server.graphqlPath}`);


    connectDB();
  });
}

startServer();
