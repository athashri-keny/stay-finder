import { NextResponse , NextRequest  } from "next/server";
import UserModel from "@/model/user";
import dbConnect from "@/lib/dbconnect";
import { errorResponse } from '../../../../Types/ApiErrorResponse'
import { SucessResponse } from "@/Types/ApiResponse";
    import  {z} from 'zod'
import { nameQuerySchema } from "@/Schemas/SignupSchema";



export async function GET(request:Request) {
    await dbConnect()

    try {
         const {searchParams} = new URL(request.url)

         const qureyparams = {
            name: searchParams.get("name")
         }

       const result =  nameQuerySchema.safeParse(qureyparams) // checking if the username is unique through ZOD
     console.log(result)

     if (!result.success) {
       result.error.format().name?._errors || [] // extracting error 
        return Response.json({
            success: false,
            message: "Username must be 3 char long"
        },
        {
            status: 400
        }
    )
     }

     const {name} = result.data
        const existingName = await UserModel.findOne({name , isVerifiedEmail: true})

        if (existingName) {
            return errorResponse("Error name  is already taken" , 400) 
        }

        return SucessResponse("Name is unique!" , 200)

    } catch (error) {
        console.log("Error while checking the usern ame unique or not" , error)
        return errorResponse("Error while checking " , 500)
    }
}