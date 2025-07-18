import NextAuth , {DefaultSession} from "next-auth";

// declaring custom types of user
declare module 'next-auth' {
    interface User {
        _id: string,
        name: string,
        email: string,
        isVerifiedEmail?: boolean,
        verifycodeexpiry: Date,
    }


interface Session {
    user: {
        _id?: string,
        name?: string,
        email?: string,
        isVerifiedEmail?: boolean,
        verifycodeexpiry?: Date,
    } & DefaultSession["user"]
}
}

declare module "next-auth/jwt" {
  interface JWT {
    _id: string;
    name: string;
    email: string;
    isVerifiedEmail?: boolean;
    verifycode: string;
    verifycodeexpiry: Date;
  }
}