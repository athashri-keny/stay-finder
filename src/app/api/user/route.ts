// get current user 
import dbConnect from "@/lib/dbconnect";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/model/user";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import BookingModel from "@/model/booking";


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

    const foundUser = await UserModel.findById(user._id)
            .select("-password -verifycode -verifycodeexpiry")

            // 
            const bookings = await BookingModel.find({ user: user._id })
            // .populate('listing') TODO: check this out it is causing problem host schema hasent been register

            if (!bookings) {
                return NextResponse.json("No booking for this user" , {status: 200})
            }


     if (!foundUser) {
        return NextResponse.json({
            message: "User does not exist in your database"
        } , {status: 404})
     }

     return NextResponse.json({
        message: "Sucessfully user found",
        user: foundUser ,// full document ,
        bookings
     })

    } catch (error) {
        console.log("Error while Getting current user" , error)
        return NextResponse.json({
            messsage: "Error while getting current User"
        } , {status: 500})
    }
}