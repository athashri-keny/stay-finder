import { transporter } from "@/lib/EmailTransporter";
import { NextResponse } from "next/server";

export async function SendEmailToUser(Booking: any) {
  try {
   await transporter.sendMail({
        from: 'Stay Finder <athashrikeny10@gmail.com>',
        to: Booking.userEmail,
        subject: 'BOOKING CONFIRMED',
        html: `<p> Your Booking Id with ${Booking.BookingId} is now confirmed Thank you for your payment</p>` 
    })
  } catch (error) {
    console.log("Erroor while  sending email to User"  ,  error)
    return NextResponse.json({
        message: "Error while sending email to user"
    } , {status: 500})
  }
}


export async function SendEmailToOwner( Booking: any) {

  try{
 await transporter.sendMail({
      from: 'Stay-Finder <athashrikeny10@gmail.com>',
      to: Booking.OwnerEmail,
      subject: 'New Booking Alert',
      html: `<p> Your property has been booked with Booking Id: ${Booking.BookingId}. Please check your dashboard for more details</p>`
    })
        console.log('✅ Email sent to owner successfully');

  } catch (error) {
    console.log("Error while sending email to owner" , error)
    return NextResponse.json({
      message: 'Error while sending email to OWner'
    } , {status: 500})
  }
}