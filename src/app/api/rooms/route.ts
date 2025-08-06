import { errorResponse } from "@/Types/ApiErrorResponse";
import dbConnect from "@/lib/dbconnect";
import ListingModel from "@/model/listing";
import { NextRequest, NextResponse } from "next/server";


export async function GET(_request: NextRequest) {
    await dbConnect()

    try {
        
     const foundProperty = await ListingModel.find({})

     if (foundProperty.length == 0 ) {
        return NextResponse.json({
            message: "No rooms Posted Now Wait until someone post"
        } , {status: 201})
     }        

     return NextResponse.json({
        message: "Rooms found",
        foundProperty
     } , {status: 200})


    } catch (error) {
        console.log("Error while Getting all rooms" , error)
        return NextResponse.json({
            message: "Error while getting all rooms"
        } , {status: 500})
    }
}