import { gql } from "apollo-server-express";

const typeDefs = gql`
type Query{
    greet:String
    users:[User]
    user(_id:ID!):User
    quotes:[QuotewithName]
    iquote(by:ID!):[Quote]

}
type User{
    _id:ID!
    username:String
    email:String
    phone:String
    quotes:[Quote]
    password:String
}

type QuotewithName{
    name:String
    by:IdName

}

type IdName{
    _id:String
    username:String
}

type Quote{
    name:String
    by:ID
}

type Token{
    token:String!
}

type Mutation{
    signupUser(userNew:UserInput!):User
    LoginUser(userLogin:UserLoginInput!):Token
    createQuote(name:String!):String
}

input UserInput{
    username:String!
    email:String!
    phone:String!
    password:String!
}

input UserLoginInput{
    email:String!
    password:String!
}



`

export default typeDefs