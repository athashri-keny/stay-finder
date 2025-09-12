// get current user 

import dbConnect from "@/lib/dbconnect";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/model/user";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";


export async function GET( _request: NextRequest) {
    await dbConnect()
    try {
        const session = await getServerSession(authOptions)
        const user = session?.user

     if (!session || !user) {
        return NextResponse.json({
            message: "Error user session not foundd!"
        } , {status: 404})
     }

     const foundUser = await UserModel.findById(session.user._id).select('-password -verifycode -verifycodeexpiry')

     if (!foundUser) {
        return NextResponse.json({
            message: "User does not exist in your database"
        } , {status: 404})
     }

     return NextResponse.json({
        message: "Sucessfully user found",
        user: foundUser // full document 
     })

    } catch (error) {
        console.log("Error while Getting current user" , error)
        return NextResponse.json({
            messsage: "Error while getting current User"
        } , {status: 500})
    }
}