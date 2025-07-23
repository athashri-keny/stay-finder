import { errorResponse } from "@/Types/ApiErrorResponse";
import { SucessResponse } from "@/Types/ApiResponse";
import dbConnect from "@/lib/dbconnect";
import ListingModel from "@/model/listing";
import { NextRequest, NextResponse } from "next/server";

// Get a Single room by id 
export async function GET(_request: NextRequest ,
  {params}: {params: {RoomId: string}}
) {


    await dbConnect()
  const RoomId = params.RoomId

  if (!RoomId) {
    return errorResponse("error room id is requred!" , 404)
  } 
    try {
     const result = await ListingModel.findById(RoomId)
         if (!result) {
      return errorResponse("ERRROR ROOM NOT FOUND")
     }    

     return NextResponse.json({
      message: "Room found!",
      result: [result]
     } , {status: 200})

    } catch (error) {
        console.log("Error while find the room  with id " ,  error)
    }
}


