import { NextResponse , NextRequest  } from "next/server";
import UserModel from "@/model/user";
import dbConnect from "@/lib/dbconnect";
import { getServerSession, User } from "next-auth";
import BookingModel from "@/model/booking";
import { authOptions } from "../../auth/[...nextauth]/options";
import ListingModel from "@/model/listing";
import {nanoid} from 'nanoid'


// for booking (protected route only login users can access this )
export async function POST(request: NextRequest, {params}:
   
   { params: { id: string } })
 {
   try {
      await dbConnect()
      const body = await request.json()
      
      const {checkin , checkout , guests} = body
  

    console.log(checkin , checkout , guests)

    if (!checkin || !checkout || !guests) {
      return NextResponse.json({
         message: "All feilds are required!"
      } , {status: 400})
    }

     const { id } = params
     console.log("Room id" , id )

     const session = await getServerSession(authOptions)
     const userId = session?.user
     console.log("userId" , session?.user)

    if (!session?.user || userId) {
      return NextResponse.json({
         message: "Error sigin required!"
      } , {status: 400})
    }



     const foundUser = await UserModel.findById(userId)
     if (!foundUser) {
      return NextResponse.json({
         message: "Error User not found in database"
      } , {status: 404})
     }

     const foundProperty = await ListingModel.findById(id) // propertyID

     if (!foundProperty) {
      return NextResponse.json({
         message: "Error User not found in database"
      } , {status: 404})
     }

     // TODO: check this out 
     
     // after clicking the reserve button it calucates
        const checkinDate = new Date(checkin)
    const checkoutDate = new Date(checkout)

    const timeDiff = checkoutDate.getTime() - checkinDate.getTime()
    const numberOfNights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))

    const totalPrice = foundProperty.price * numberOfNights * guests
    
    const bookingIdNUm = `BOOK-${nanoid(5)}`


   const newBooking =  new BookingModel({
      user: userId,
      listing: id,
      checkin: checkinDate,
      checkout: checkoutDate,
       totalPrice,
      paymentStatus: 'pending',
      guests,
      BookingId: bookingIdNUm
   })
 
   await newBooking.save()

   return NextResponse.json({
      message: "Property Booked sucessfuly",
      newBooking
   } , {status: 201})




   } catch (error) {
      console.log("Error while booking" , error)
      return NextResponse.json({
         message: "Error while booking room"
      } , {status: 400})
   }
}