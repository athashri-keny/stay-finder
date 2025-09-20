import { NextResponse , NextRequest  } from "next/server";
import UserModel from "@/model/user";
import dbConnect from "@/lib/dbconnect";
import { getServerSession, User } from "next-auth";
import BookingModel from "@/model/booking";
import { authOptions } from "../../auth/[...nextauth]/options";
import ListingModel from "@/model/listing";
import {nanoid} from 'nanoid'

//TODO: send a email to owner about thier property has been booked 
// send booking details to owner
// send an email to user

// for booking (protected route only login users can access this )
export async function POST(request: NextRequest, {params}:
   
   { params: Promise<{id: string}> })
 {
   try {
      await dbConnect()
      const body = await request.json()
      
      const {checkin , checkout , guests} = body
  

    console.log(checkin , checkout , guests )

    if (!checkin || !checkout || !guests) {
      return NextResponse.json({
         message: "All feilds are required!"
      } , {status: 400})
    }

     const  id  = (await params).id
     console.log("Room id" , id )
 
     // current user which is booking the property!
     const session = await getServerSession(authOptions)
     const userId = session?.user
     console.log("userId" , session?.user)

    if (!session?.user || !userId) {
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
     const propertyPostedBy = foundProperty?.host
     console.log("Property POSted By " , propertyPostedBy)

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
    console.log("number of nights = " , numberOfNights)

    const totalPrice = foundProperty.price * numberOfNights * guests / 100
    
    const bookingIdNUm = `BOOK-${nanoid(5)}`


   const newBooking =  new BookingModel({
      user: userId,
      listing: id, // RoomID
      checkin: checkinDate,
      propertyPostedBy: propertyPostedBy,
      checkout: checkoutDate,
       totalPrice,
      paymentStatus: 'pending',
      guests,
      BookingId: bookingIdNUm,
      numberOfNights: numberOfNights
   })
 
   await newBooking.save()

   await ListingModel.findOneAndUpdate(
    {_id: id},
    {status: 'booked'},
    {new: true}
   )

   await UserModel.findByIdAndUpdate(
      userId,
      {$push: {Bookings: newBooking._id}},
      {new: true}
   )

   
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

// get the booking for the single user

// get the current user details from session
// find the current user in database
// get the booking_id from params 
// find the booking id in databse
// return response 

export async function GET(_request: NextRequest , {params}: 
   {params: Promise<{id: string}>}) {
   try {
      
      await dbConnect()

      const session = await getServerSession(authOptions)

     const userId = session?.user._id 
     const bookingId =  (await params).id

     if (!userId || !session.user) {
      return NextResponse.json({
         message: "Error signin  required!"
      } , {status: 400})
     }

     const foundUser = await UserModel.findById(userId)
     if (!foundUser) {
      return NextResponse.json({
         message: "Error user does not exist in our databasse"
      } , {status: 404})
     }

     const bookingByUser = await BookingModel.findById(bookingId)
     if (!bookingByUser) {
      return NextResponse.json({
         message: "you dont have any booking right now"
      } , {status: 201})
     }

     return NextResponse.json({
      message: "Booking found",
      bookingByUser,
     } , {status: 200})


   } catch (error) {
      console.log("Error while getting the booking details" , error)
      return NextResponse.json({
         message: "Error while getting the booking detils for current user"
      } , {status: 500})
   }
}


// delete Booking
export async function DELETE( _request: NextRequest , {params}: 
   {params: Promise<{id: string}>}) {
   
      try {
         await dbConnect()

         const session = await getServerSession(authOptions)
         const userId = session?.user._id
        const bookingId = (await params).id

      if (!userId || !session.user) {
      return NextResponse.json({
         message: "Error signin  required!"
      } , {status: 400})
     }

     
     const foundUser = await UserModel.findById(userId)
     if (!foundUser) {
      return NextResponse.json({
         message: "Error user does not exist in our databasse"
      } , {status: 404})
     }

   const bookingByUser = await BookingModel.findByIdAndDelete(bookingId)

   await ListingModel.findByIdAndUpdate(
    bookingByUser?.listing,
    {status: 'available'},
    {new: true}
   )

     if (!bookingByUser) {
      return NextResponse.json({
         message: "you dont have any booking right now"
      } , {status: 201})
     }
     

     
return NextResponse.json({
   message: "Your booking deleted sucuessfully",
   bookingByUser
} , {status: 200})


      } catch (error) {
         console.log("error while deleting the booking" , error)
         return NextResponse.json({
            message: "Error whie deleting the booking"
         } , {status: 500})
      }
}
