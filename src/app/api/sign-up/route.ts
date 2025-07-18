import { NextResponse , NextRequest  } from "next/server";
import UserModel from "@/model/user";
import bcrypt from 'bcrypt'
import dbConnect from "@/lib/dbconnect";
import { errorResponse } from '../../../Types/ApiErrorResponse'
import { SucessResponse } from "@/Types/ApiResponse";

// connect database
// take name  , email ,   password from request.json
// check if the email and password , name  are given or not 
// check if the email already exists in database if yes throw a error
// at this point the user is vaild 
// so hash the password through bycrpt 
// save the user in database and return  response 

export async function POST(request:NextRequest) {
    try {
        await dbConnect()
      
        const {name , email , password} =  await request.json()

        if (!name || !email || !password) {
            return SucessResponse("All fields are required!" , 400)
        }

       const foundUser =  await UserModel.findOne({email , isVerifiedEmail: true})
       if (foundUser) {
        return errorResponse("Email already exists in your database" , 401)
       }
       
       const verifyCode = Math.floor(1000000 + Math.random() * 900000).toString()
       const hashpassword = bcrypt.hash(password , 10)
       const expiryDate = new Date()
       expiryDate.setHours(expiryDate.getHours() + 1)

      const newUser = new UserModel({
        name,
        email,
        password: hashpassword,
        verifycode: verifyCode,
        verifycodeexpiry: expiryDate,
      })

      await newUser.save()
      

    } catch (error) {
        console.log("Error while sigining the user")
        return NextResponse.json({
            message: "Error  while sigin in the user"
        } , {status: 400})
    }
}
