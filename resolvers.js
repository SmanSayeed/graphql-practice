
import { quotes, usersData } from "./fakedb.js";
 const resolvers = {
    Query:{
        greet:()=>"Hello world",
        users:()=>usersData      ,
        quotes:()=>quotes,
        user:(_,{id})=>usersData.find(user=>user.id==id),
        iquote:(_,{by})=>quotes.filter(quote=>quote.by==by)
    },
    User:{
        quotes:(u)=>quotes.filter(q=>q.by==u.id)
    },
    Mutation:{
        signupUserDummy:(_,{userNew})=>{
            const id = Math.round(Math.random(1000,9999)*100000)
            usersData.push({
                id,
               ...userNew
            })
            return usersData.find(user=>user.id==id)
        }
    }
}

export default resolvers