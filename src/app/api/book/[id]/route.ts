import { NextResponse , NextRequest  } from "next/server";
import UserModel from "@/model/user";
import dbConnect from "@/lib/dbconnect";
import { errorResponse } from "@/Types/ApiErrorResponse";
import { getServerSession, User } from "next-auth";
import BookingModel from "@/model/booking";


export async function POST( request: NextRequest) {
     
}