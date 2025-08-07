import { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
import dbConnect from "@/lib/dbconnect";
import UserModel from "@/model/user";
import GoogleProvider from "next-auth/providers/google";



export const authOptions: NextAuthOptions = {
providers: [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!
  }),
  CredentialsProvider({
    id: "credentials",
    name: "credentials",
    credentials: {
      email: { label: "Email", type: 'text', placeholder: "Enter your email" },
      password: { label: "Password", type: "password", placeholder: "Enter your password" },
    },
    async authorize(credentials: any): Promise<any> {
      await dbConnect();
      try {
        const user = await UserModel.findOne({
          email: credentials.email
        });
        if (!user) {
          throw new Error("Email does not exist in our database");
        }
        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
        if (isPasswordCorrect) {
          return user;
        } else {
          throw new Error("Incorrect password");
        }
      } catch (error) {
        throw new Error("Authentication failed");
      }
    }
  })
],

// callbacks let you customize the authentication process at various  stages
  callbacks: {
  // Runs when user signs in (for OAuth & Credentials both)
  async signIn({  account, profile }) {

    if (account?.provider === "google") {
      await dbConnect();
      
      try {
        const existingUser = await UserModel.findOne({ email: profile?.email });

        // Create new user if not found
        if (!existingUser) {
          const newUser = new UserModel({
            email: profile?.email,
            name: profile?.name,
            isVerifiedEmail: true,
            });
          await newUser.save(); 
        }
      } catch (error) {
        console.error("Error saving Google user:", error);
        return false;
      }
    }

    return true; 
  },

  // Persist custom fields into JWT
  async jwt({ token, user }) {
    if (user) {
      token._id = user._id;
      token.name = user.name;
      token.isVerifiedEmail = user.isVerifiedEmail;
    }
    return token;
  },

  // Attach custom fields to session object
  async session({ session, token }) {
    if (token) {
      session.user._id = token._id;
      session.user.name = token.name;
      session.user.isVerifiedEmail = token.isVerifiedEmail;
    }
    return session;
  }
}
}