    import { NextRequest , NextResponse } from "next/server";
    import UserModel from "@/model/user";
    import dbConnect from "@/lib/dbconnect";
    import { errorResponse } from '../../../../Types/ApiErrorResponse'
import jwt from 'jsonwebtoken'


    export async function POST(request: NextRequest ) {
        try {
            await dbConnect()

        const {verifycode , name} =  await request.json()

    console.log(name , verifycode)

        if ( !name || !verifycode) {
            return errorResponse("Name and verify code is required!" , 401)
        }

        
        const foundUser =  await UserModel.findOne({name: name})


        console.log( "Found user = " , foundUser )

        if (!foundUser) {
            errorResponse("error User does exist in your database" , 404)
        }

        const IsCodeVaild = foundUser?.verifycode === verifycode

        const IsCodeExpried = foundUser?.verifycodeexpiry ? new Date(foundUser.verifycodeexpiry) > new Date() : false

        if(!IsCodeVaild) {
            return errorResponse("Error code is Invaild" , 401)
        }

        if(IsCodeVaild && IsCodeExpried) {

            if (foundUser) {
                foundUser.isVerifiedEmail = true;
            }
        }
        foundUser?.save()

        // creating a temporary token for login after OTP verification
        const AutoLoginToken = jwt.sign(
            {
                userId: foundUser?._id,
                email: foundUser?.email,
                purpose: 'auto_login_after_verification' //IMP
            },
            process.env.JWT_SECRET as string,
            {expiresIn : '5m'}
        )


        return Response.json({
            message: "Sucess",
            AutoLoginToken
        } ,  {status: 201})
            
        } catch (error) {
            console.log("Error while verifying the code" , error)
            return NextResponse.json({

                message: "Error while verifying the code"
            } , {status: 400})
        }
    }
