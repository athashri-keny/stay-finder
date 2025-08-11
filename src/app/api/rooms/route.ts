import { errorResponse } from "@/Types/ApiErrorResponse";
import dbConnect from "@/lib/dbconnect";
import ListingModel from "@/model/listing";
import { NextRequest, NextResponse } from "next/server";


export async function GET(_request: NextRequest) {
    await dbConnect()

    try {
        
     const foundProperty = await ListingModel.find({})

return NextResponse.json(foundProperty, { status: 200 });


    } catch (error) {
        console.log("Error while Getting all rooms" , error)
        return NextResponse.json({
            message: "Error while getting all rooms"
        } , {status: 500})
    }
}