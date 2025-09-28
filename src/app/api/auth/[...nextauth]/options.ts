import { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
import dbConnect from "@/lib/dbconnect";
import UserModel from "@/model/user";
import GoogleProvider from "next-auth/providers/google";
import jwt from 'jsonwebtoken'
import { JWTpayload } from "@/Schemas/JwtPayloadSchema";



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
      AutoLoginToken: {label: 'Auto Login token' , type:'text'}
    },
 
    async authorize(credentials: any): Promise<any> {
      await dbConnect();
      try {
        // normal sign-in
       if (credentials.email && credentials.password) {
         const user = await UserModel.findOne({
          email: credentials.email
        });
        if (!user) {
          throw new Error("Email does not exist in our database");
        }        
        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
        if (isPasswordCorrect) {
          return user;
        } 
       }

       // autoLogin Credentials
       if (credentials.AutoLoginToken) {
         // Verify the special token (jwt verifyies it )
          const decoded = jwt.verify(credentials.AutoLoginToken, process.env.JWT_SECRET as string) as JWTpayload;
    
            // Check if token is for the right purpose
          if (decoded.purpose  === 'auto_login_after_verification') {

             // Find user and return them
            const user = await UserModel.findById(decoded.userId)

            if (user && user.isVerifiedEmail) {
              return user; // user loggged in successfully!
            }

          } else {
            throw new Error("Invaild aauto -login token ")
          }
       }
      
      } catch (error) {
        throw new Error("Authentication failed" );
      }
    }
  })
],

pages: {
  signIn: '/auth/sign-in',
  signOut: '/auth/signout'
},

// callbacks let you customize the authentication process at various  stages
  callbacks: {
  // Runs when user signs in (for OAuth & Credentials both)
  async signIn({  account, profile  }) {

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


  // 
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

},

session: {
  strategy: "jwt"
},
  secret: process.env.NEXTAUTH_SECRET
}