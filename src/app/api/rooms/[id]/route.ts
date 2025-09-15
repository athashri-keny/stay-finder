import { errorResponse } from "@/Types/ApiErrorResponse";
import dbConnect from "@/lib/dbconnect";
import ListingModel from "@/model/listing";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import UserModel from "@/model/user";
import favouriteModel from "@/model/favourites";


// Get a Single room by id for a single post 
export async function GET(_request: NextRequest ,
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



// favourite for adding 
export async function POST(_request: NextRequest , {params}: {params: Promise<{id: string}>}) {
  
  await dbConnect()

  try {
  const {id} = await params
  console.log("roomid" , id)

  if (!id) {
     return NextResponse.json({
      message: "Error Id is requried!",
     } , {status: 500})
  }

  const session = await getServerSession(authOptions)
  const user = session?.user

  if (!user || !session) {
     return NextResponse.json({
      message: "Error you must be signined",
     } , {status: 401})
  }


  const userfound = await UserModel.findById(user._id)
  if (!userfound) {
     return NextResponse.json({
      message: "Error User not found!",
     } , {status: 404})
  }


  const foundProperty = await ListingModel.findById(id)
  if (!foundProperty) {
     return NextResponse.json({
      message: "Property Not found",
     } , {status: 404})
  }

const exisiting = await favouriteModel.findOne({
  userId: user._id,
  propertyId: id
})

console.log(exisiting , id)

  if (exisiting) {
    await favouriteModel.deleteOne({
      userId: user._id,
      propertyId: id
    })
     return NextResponse.json({
    message: "Property Removed from favourite sucesfully",
   } , {status: 201})

  }

  await favouriteModel.create({
    userId: user._id,
    propertyId: id
  })
   return NextResponse.json({
    message: "Property Added To favourite sucesfully",
   } , {status: 201})

  
  } catch (error) {
    console.log("Error while adding it to favourite " , error)
  }
}

// for getting the favourites of the current user 
// check if the current session is there or  not 
// find the user is database
// if user not there return  errror
// find the users favourites in database of model 
// if not there return you have no any favourties 
// if there return respnse 