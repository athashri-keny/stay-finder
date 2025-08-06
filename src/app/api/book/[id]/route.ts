import { NextResponse , NextRequest  } from "next/server";
import UserModel from "@/model/user";
import dbConnect from "@/lib/dbconnect";
import { errorResponse } from "@/Types/ApiErrorResponse";
import { getServerSession, User } from "next-auth";
import BookingModel from "@/model/booking";

// for booking (protected route only login users can access this )
export async function POST( request: NextRequest) {
     await dbConnect()

     try {
        

     } catch (error) {
        console.log("Error" , error)
     }
}