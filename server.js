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

const allowedOrigins = [
    'https://101435500-comp3133-assignment2-sb6g.vercel.app'
   
  ];


  app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
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
