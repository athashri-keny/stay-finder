import { NextRequest , NextResponse } from "next/server";
import Razorpay from 'razorpay'
import BookingModel from "@/model/booking";
import { nanoid } from "nanoid";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!
})

export async function POST(request:NextRequest) {


    try {
      const body = await request.json()
      const {amount , BookingId } = body
      console.log('Amount from URL:', amount);
console.log('Booking ID from URL:', BookingId);


      if (!amount || !BookingId) {
         return NextResponse.json({
            message:"Error all fields are required!"
        } , {status: 404})
      }
         
      const order = await razorpay.orders.create({
        amount: amount , // converting into paise
        currency: "INR",
        receipt: `receipt_${nanoid(7)}`
      })

      console.log("Order from backend (create-order)" , order)

      // updating the payment status
      await BookingModel.findByIdAndUpdate(
        BookingId,
        {paymentStatus: 'completed'}
    )

        return NextResponse.json({
            orderId: order.id,
            message: "payment successfully",
        } , {status: 200})

        
        
    } catch (error) {
        console.log("error while creating a order" , error)
        return NextResponse.json({
            message: 'error while creating a order'
        } , {status: 500})
    }
}