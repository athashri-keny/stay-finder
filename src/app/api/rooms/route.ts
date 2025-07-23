import { errorResponse } from "@/Types/ApiErrorResponse";
import { SucessResponse } from "@/Types/ApiResponse";
import dbConnect from "@/lib/dbconnect";
import ListingModel from "@/model/listing";
import { NextRequest, NextResponse } from "next/server";

// connect db
// fetch the  rooms from listing model use poplulate
// any rooms are not there then  return no rooms available
// return response of all rooms


export async function GET(_request:NextRequest) {
    
    try {
        await dbConnect();
       const Rooms = await ListingModel.find({} , "price images rating")
        if (Rooms.length == 0) {
            return SucessResponse("No rooms available" , 201)
        }
        return NextResponse.json({
            message: "Rooms fetched sucessfully",
            Rooms,
        } , {status: 201} )
       

    } catch (error) {
        console.log( "Error in GET /api/rooms: ", error);
        return errorResponse("Internal Server Error", 500);
    }
}