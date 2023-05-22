import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import { JWT_SECRET, mongoUrl } from "./config.js";
import jwt  from "jsonwebtoken";
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
import './models/Quotes.js';
import './models/User.js';
import resolvers from "./resolvers.js";

//this is middlewear
const context = ({ req }) => {
    const {authorization} = req.headers 
    if(authorization){
       const {userId} = jwt.verify(authorization,JWT_SECRET)
       return {userId}
    }
}
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    // context: ({ req }) => ({ req }),
     context,
    introspection: true,
    playground: true,
  });
  await server.start()
  server.applyMiddleware({ app });
  
  app.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  });