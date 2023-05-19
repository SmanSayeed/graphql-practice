import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import { mongoUrl } from "./config.js";

import typeDefs from "./schemaGql.js";
const app = express();
mongoose.connect(mongoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on("Connected",()=>{
    console.log("Connected to mongodb")
})
mongoose.connection.on("error",(err)=>{
    console.log("ERROR Connection to mongodb",err)
})

//import modals here
import './models/Quotes.js'
import './models/User.js'
import resolvers from "./resolvers.js";

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: ({ req }) => ({ req }),
    introspection: true,
    playground: true,
  });
  await server.start()
  server.applyMiddleware({ app });
  
  app.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  });