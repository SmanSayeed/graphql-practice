import { gql } from "apollo-server-express";

const typeDefs = gql`
type Query{
    greet:String
    users:[User]
    user(id:ID!):User
    quotes:[Quote]
    iquote(by:ID!):[Quote]

}
type User{
    id:ID!
    username:String
    email:String
    phone:String
    quotes:[Quote]
}
type Quote{
    name:String
    by:ID
}
type Mutation{
    signupUserDummy(userNew:UserInput!):User
}

input UserInput{
    username:String!,
    email:String!,
    phone:String!
}



`

export default typeDefs