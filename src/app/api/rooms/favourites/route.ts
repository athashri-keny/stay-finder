import { errorResponse } from "@/Types/ApiErrorResponse";
import dbConnect from "@/lib/dbconnect";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import UserModel from "@/model/user";
import favouriteModel from "@/model/favourites";


export async function GET(_request: NextRequest) {
  
  try {
    await dbConnect()

   const session = await getServerSession(authOptions)
  const userId = session?.user._id
  console.log( "userid = " ,userId)

   if (!session?.user || !userId) {
     return NextResponse.json({
      message: "Error user session is not there"
     } , {status: 404})
   }

   const foundUser = await UserModel.findById(userId)
   if (!foundUser) {
    return NextResponse.json({
      message: "Error user does not exist in your database"
    } , {status: 404})
   }

   const favouriteProperties = await favouriteModel.findOne({ userId }).
   populate('propertyId')
   

   if (!favouriteProperties) {
    return NextResponse.json({
      message: "No favourite Properties for current User",
    } , {status: 400})

   } else {
   return NextResponse.json({
    message: "Favourites properties found",
    favouriteProperties
   } , {status: 200})

   }

   
  } catch (error) {
    console.log("Error while fetching get favourites properties" , error)
    
    return NextResponse.json({
      message: "Error While getting Current Fav properties",
    } , {status: 500})
  }

}

