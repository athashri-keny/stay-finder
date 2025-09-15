import { NextRequest , NextResponse } from "next/server";
import Razorpay from 'razorpay'


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!
})

export async function POST(request:NextRequest) {
    try {
        const order = await razorpay.orders.create({
            amount: 100 * 100 ,// 10,000 paise = 100 ruppes 
            currency: "INR",
            receipt: "receipt#1"
        })

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