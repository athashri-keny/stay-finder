import { NextRequest , NextResponse } from "next/server";
import dbConnect from "@/lib/dbconnect";
import ListingModel from "@/model/listing";


// before clicking on reserve button to show the user estatimate amt this api is  used
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{id: string}>  }
) {
    try {
        await dbConnect()
    
      const body = await request.json();
      const { id: propertyID } = await params

      console.log(propertyID , "property id = ")

      if (!propertyID) {
        
        return NextResponse.json({
            message: "Error property Id requrired@"
        } , {status: 404})
      }

     const { checkin, checkout, guests, } = body;
     
     if (!checkin || !checkout || !guests) {
         return NextResponse.json({
            message: "Error all fields are required!"
        } , {status: 400})
     }
    
     const foundProperty = await ListingModel.findById(propertyID)
     if (!foundProperty) {
        return NextResponse.json({
            message: "Error property not found!"
        } , {status: 404})
     }

     // convertinng into date because string received from frontend 
     const checkinDate = new Date(checkin);
     const checkoutDate = new Date(checkout); 


     // TODO: Check this out
     const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
     const numberOfNights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

     const totalPrice = foundProperty.price * numberOfNights * guests
   
    return NextResponse.json({
        message: "Sucess Here is the total price",
        totalPrice,
        guests,
        numberOfNights,
    
    } , {status: 200})



    } catch (error) {
        console.log("Error while getting Price" , error)
        return NextResponse.json({
            message: "Error while getting the price"
        } , {status: 500})
    }
}