    import { transporter } from "@/lib/EmailTransporter";
    import { errorResponse } from "@/Types/ApiErrorResponse";
    import { SucessResponse } from "@/Types/ApiResponse";

export async function SendVerificationEmail(name: string, verifycode: string, email: string) {
  try {
    const info = await transporter.sendMail({
      from: 'athashrikeny10@gmail.com',
      to: email,
      subject: "🔐 Your StayFinder Verification Code",
      text: `Hi ${name}, your verification code is: ${verifycode}`, // fallback for plain-text email clients
      html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
    <h2 style="color: #4CAF50;">Welcome to <span style="color:#333;">StayFinder</span>, ${name}!</h2>
    <p style="font-size: 16px; color: #555;">We're excited to have you join us. To complete your sign-up, please use the verification code below:</p>
    <div style="font-size: 24px; font-weight: bold; background-color: #f2f2f2; padding: 10px 20px; text-align: center; border-radius: 6px; margin: 20px 0;">
      ${verifycode}
    </div>
    <p style="font-size: 14px; color: #888;">This code is valid for the next 10 minutes. If you did not request this, you can safely ignore this email.</p>
    <hr style="margin-top: 30px;">
    <p style="font-size: 12px; color: #aaa;">StayFinder Team &copy; ${new Date().getFullYear()}</p>
  </div>
`

    });

        console.log("Message sent: %s", verifycode);
        return SucessResponse("Email send Sucessfully"  , 201)

        } catch (error) {
            console.log("Error while sending code" , error)
            return errorResponse("Error happend while sending code" , 401)      
        }
    }