import { NextRequest , NextResponse } from "next/server";
import UserModel from "@/model/user";
import dbConnect from "@/lib/dbconnect";
import { errorResponse } from '../../../../Types/ApiErrorResponse'
import { SucessResponse } from "@/Types/ApiResponse";

export async function POST(request: NextRequest) {
    try {
        await dbConnect()

     const {name , verifycode} =  await request.json()
     if (!name || !verifycode) {
        return errorResponse("Name and verify code is required!" , 401)
     }
     
     const DecodedName = decodeURIComponent(name) // TODO: Check it later on by removing it what happens

    const foundUser =  await UserModel.findOne({name: DecodedName})
    if (!foundUser) {
        errorResponse("error User does exist in your database" , 500)
    }

    const IsCodeVaild = foundUser?.verifycode === verifycode

      const IsCodeExpried = foundUser?.verifycodeexpiry
        ? new Date(foundUser.verifycodeexpiry) > new Date()
        : false

       if (!IsCodeExpried) {
        return errorResponse("Error Code is expired" , 400)
       }

       if(!IsCodeVaild) {
        return errorResponse("Error code is Invaild" , 401)
       }

       if(IsCodeVaild && IsCodeExpried) {

        if (foundUser) {
            foundUser.isVerifiedEmail = true;
        }
       }
       foundUser?.save()

       return Response.json({
        message: "Sucess",
        foundUser,
       } ,  {status: 201})
        
    } catch (error) {
        console.log("Error while verifying the code" , error)
        return NextResponse.json({

            message: "Error while verifying the code"
        } , {status: 400})
    }
}
