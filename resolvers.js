
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { JWT_SECRET } from "./config.js";
const User = mongoose.model("User")
const quote = mongoose.model("Quote")
 const resolvers = {
    Query:{
        greet:()=>"Hello world",
        // users:()=>usersData      ,
        users:async ()=> await User.find({}),
        user:async (_,{_id})=> await User.findOne({_id}),
        quotes:async ()=>await quote.find({}).populate("by","_id username"),
        iquote: async (_,{by})=>await quote.find({by})
        // quotes:()=>quotes,
        // user:(_,{_id})=>usersData.find(user=>user._id==_id),
        // iquote:(_,{by})=>quotes.filter(quote=>quote.by==by)
    },
    User:{
        // quotes:(u)=>quotes.filter(q=>q.by==u._id)
        quotes:async (u)=> await quote.find({by:u._id})
    },
    Mutation:{
        // signupUser:(_,{userNew})=>{
        //     const _id = Math.round(Math.random(1000,9999)*100000)
        //     usersData.push({
        //         _id,
        //        ...userNew
        //     })
        //     return usersData.find(user=>user._id==_id)
        // }
        signupUser:async (_,{userNew})=>{
         const user = await User.findOne({email:userNew.email})
         if(user){
            throw new Error("User already exists with that email")
         }
        const hashedPassword = await bcrypt.hash(userNew.password,12)
        const newUser = new User({
            ...userNew,
            password:hashedPassword
        })
        return await newUser.save()
        },

        LoginUser:async (_,{userLogin})=>{
            const user = await User.findOne({email:userLogin.email})
            if(!user){
                throw new Error("User does not exist with that email")
            }
            const doMatch = await bcrypt.compare(userLogin.password,user.password)
            if(!doMatch){
                throw new Error("Invalid Email or Password")
            }
            const token = jwt.sign({userId:user._id},JWT_SECRET)
            return {token}
           },
        createQuote:async (_,{name},context)=>{
            const {userId}=context
            if(!userId) throw new Error("You must be logged in")
            const newQuote =  new quote({
                name,
                by:userId
            })
            await newQuote.save()
            return "Quote saved successfully"
        }
    }
}

export default resolvers