import { NextRequest , NextResponse } from "next/server";
import UserModel from "@/model/user";
import dbConnect from "@/lib/dbconnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/options";
import bcrypt from 'bcrypt'


export async function POST( request: NextRequest) {
    try {
        await dbConnect()

        const {NewPassword , Oldpassword} = await request.json()
        const session = await getServerSession(authOptions)
        const userID = session?.user._id
        

        if (!session || !userID) {
              return NextResponse.json({
            message: "Password is and userId requreid!!"
        } , {status: 404})
        }

        if(!NewPassword || !Oldpassword){
             return NextResponse.json({
            message: "Password is required!"
        } , {status: 404})
        }

        const foundUser = await UserModel.findById(userID)
        if (!foundUser) {
            return NextResponse.json({
                message: "Error User does exists in our database"
            } , { status: 401})
        }

        const isPasswordCorrect =  await bcrypt.compare(Oldpassword , foundUser.password)
        if (!isPasswordCorrect) {
            return NextResponse.json({
                message: "Error you have enterd the wrong password"
            } , {status: 400})
        }
 


       foundUser.password = await bcrypt.hash(NewPassword , 10)

       await foundUser.save()
       return NextResponse.json({
        messasge: "Sucessfully! change the password"
       } , {status: 201})


    } catch (error) {
        console.log("Error while updating the passowrd" , error)
        return NextResponse.json({
            message: "Eror while changing the password"
        } , {status: 500})
    }
}