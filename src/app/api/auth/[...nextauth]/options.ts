import { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
import dbConnect from "@/lib/dbconnect";
import UserModel from "@/model/user";
import path from "path";


const isDev = process.env.NODE_ENV !== 'production';
export const authOptions: NextAuthOptions = {
  
providers: [
    CredentialsProvider({
      id: "Credentials",
      name: "Credentials",
      credentials: {
        username: {label: "Email" , type: 'text' , placeholder: "Enter your email"},
        password: {label: "password" , type: "password" , placeholder: "Enter your password"},

      },
    // authorize checking the information is recevied correct or not
      async authorize(credentials: any): Promise<any> {
      await dbConnect()
      // finding the user in datbase 
      // checking id and password
      try {
        const user = await UserModel.findOne({
           email: credentials.identifier
        })
        if (!user) {
            throw new Error("Email does not exist in our database")
        }
         const isPasswordCorrect =  await bcrypt.compare(credentials.password  , user.password)

         if(isPasswordCorrect) {
            return user
         } else {
            throw new Error
         }
         
      } catch (error) {
       throw new Error
      }

      }
    }
)
],
// callbacks let you customize the authentication process at various  stages
    callbacks: {
      // jwt is used to persist the stage of the user
    async jwt({ token, user }) {
        // adding custom fields
    if (user) {
        token._id = user._id
        token.name = user.name
        token.isVerifiedEmail = user.isVerifiedEmail
    }
      return token
    },
    // session is used to check if the user is login is or not 
   async session({ session, token }) {
    if (token) {
    session.user._id = token._id
    session.user.isVerifiedEmail = token.isVerifiedEmail

    }
    return session;
  }
},
pages: {
  signIn: '/sign-in'
}, 
session: {
  strategy: 'jwt'
},

secret: process.env.NEXTAUTH_SECRET

}