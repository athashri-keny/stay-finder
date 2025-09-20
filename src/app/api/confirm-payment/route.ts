import { NextRequest, NextResponse } from "next/server";
import Razorpay from 'razorpay'
import BookingModel from "@/model/booking";
import { SendEmailToOwner } from "@/Helpers/SendEmailToUser";
import { SendEmailToUser } from "@/Helpers/SendEmailToUser";

const razorpay = new Razorpay({
key_id: process.env.RAZORPAY_KEY_ID!,
key_secret: process.env.RAZORPAY_KEY_SECRET
})

export async function POST( request: NextRequest) {
    try {
        const body  = await request.json() as any
        const {razorpay_payment_id , razorpay_order_id , razorpay_signature , BookingId} = body
        console.log(razorpay_order_id , razorpay_payment_id , razorpay_signature , BookingId)

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !BookingId) {
          return NextResponse.json({
            messasge: "Error all fields are requred!"
          } , {status: 400})
        }

        //TODO: check this out how it works
       const crypto = require('crypto');
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest('hex');

         if (generatedSignature !== razorpay_signature) {
      return NextResponse.json({ message: "Payment verification failed" }, { status: 400 });
    } 

     const updatedBooking = await BookingModel.findByIdAndUpdate(
      BookingId,
      { paymentStatus: 'completed' },
      { new: true }
    ).populate('user' , '-password').populate('propertyPostedBy' , '-password');
    
     if (!updatedBooking) {
      return NextResponse.json({ message: "Booking not found" }, { status: 404 });
    }

    // sending emails
   try {
     await SendEmailToUser({
       userEmail: (updatedBooking.user as any)?.email, // populated email of the user which is booking the property
       BookingId: updatedBooking.BookingId
 
     })
     
     await SendEmailToOwner({
      OwnerEmail: (updatedBooking.propertyPostedBy as any)?.email, // populate email of the user which is owned the property
      BookingId: updatedBooking.BookingId
     })
     
   } catch (error) {
    console.log("Error while sending email" , error)
    
    return NextResponse.json({
      message: "Error while sending email"
    } , {status: 500})
   }
   
  return NextResponse.json({ 
      message: "Payment confirmed successfully",
      booking: updatedBooking
    }, { status: 200 });

        
    } catch (error) {
        console.log("error while Confirming the payment" ,error)
        return NextResponse.json({
            messasge: "Error while Confirming the payment"
        }, {status: 500})
    }
}