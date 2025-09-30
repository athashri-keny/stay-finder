import { transporter } from "@/lib/EmailTransporter";

export async function SendEmailToUser(Booking: any) {
   try {
    await transporter.sendMail({
      from: 'Stay-Finder <athashrikeny10@gmail.com>', // better branding
      to: Booking.userEmail,
      subject: "✅ Booking Confirmed!",
      text: `Hi ${Booking.name}, your booking is confirmed! 🎉 
Thanks for your payment. 
Your Booking ID = ${Booking.BookingId}. 
The owner will contact you soon.`,

      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background: #ffffff;">

          <!-- Body -->
          <div style="padding: 20px; color: #333;">
            <h3 style="margin-bottom: 10px;">Hello ${Booking.name},</h3>
            <p style="font-size: 16px; margin-bottom: 15px;">
              🎉 Your <b>booking is now confirmed!</b> Thanks for trusting Stay-Finder.
            </p>

            <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center; border: 1px solid #eee;">
              <p style="margin: 0; font-size: 18px; font-weight: bold;">Booking ID</p>
              <p style="margin: 5px 0; font-size: 20px; color: #4CAF50;"><b>${Booking.BookingId}</b></p>
            </div>

            <p style="font-size: 15px; margin-bottom: 15px;">
              The property owner will Contact you on Check-in day.  
            </p>
          </div>

          <!-- Footer -->
          <div style="text-align: center; font-size: 12px; color: #888; padding: 15px; border-top: 1px solid #eee;">
            <p>StayFinder Team &copy; ${new Date().getFullYear()}</p>
          </div>
        </div>
      `
    });

    console.log("✅ Email sent to user successfully");
  } catch (err) {
    console.error("❌ Error sending booking confirmation email:", err);
  }
}


export async function SendEmailToOwner( Booking: any) {

  try {
    await transporter.sendMail({
      from: 'Stay-Finder <athashrikeny10@gmail.com>',
      to: Booking.OwnerEmail,
      subject: ' New Booking Alert',
      text: `Your property has been booked!
Booking ID: ${Booking.BookingId}
Booked by: ${Booking.userName}
User Email: ${Booking.UserEmail}
User Phone: ${Booking.UserPhone}
      
.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #333;">New Booking Alert 🚨</h2>
          <p style="font-size: 16px; color: #555;">Your property has been booked successfully!</p>
          
          <div style="margin: 20px 0; padding: 15px; background: #f9f9f9; border-radius: 6px;">
            <p><b>Booking ID:</b> ${Booking.BookingId}</p>
            <p><b>Booked By:</b> ${Booking.userName}</p>
            <p><b>Email:</b> ${Booking.UserEmail}</p>
            <p><b>Phone:</b> ${Booking.UserPhone}</p>
          </div>

          <hr style="margin-top: 30px;">
          <p style="font-size: 12px; color: #aaa;">StayFinder Team &copy; ${new Date().getFullYear()}</p>
        </div>
      `
    });

  } catch (error) {
    console.error("❌ Error while sending email to owner:", error);
    throw new Error("Error while sending email to Owner");
  }
}
