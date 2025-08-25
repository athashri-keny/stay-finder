import { errorResponse } from "@/Types/ApiErrorResponse";
import dbConnect from "@/lib/dbconnect";
import ListingModel from "@/model/listing";
import { NextRequest, NextResponse } from "next/server";

// Get a Single room by id for a single post 
export async function GET(request: NextRequest ,
  {params}: {params: Promise<{id: string} >} // TODO: Check this feature out 
) {

    await dbConnect()

  const {id} =  await params
  console.log("Room id = " , id)

  if (!id) {
    return errorResponse("error room id is requred!" , 404)
  } 

    try {
     const result = await ListingModel.findById(id)
         if (!result) {
      return errorResponse("ERRROR ROOM NOT FOUND")
     }    

     return NextResponse.json({
      message: "Room found!",
      result: [result] // easy for fronted to loop 
     } , {status: 200})

    } catch (error) {
        console.log("Error while find the room  with id " ,  error)
    }
}


