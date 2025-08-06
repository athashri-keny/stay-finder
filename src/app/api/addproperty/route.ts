import { NextResponse , NextRequest  } from "next/server";
import UserModel from "@/model/user";
import dbConnect from "@/lib/dbconnect";
import { errorResponse } from "@/Types/ApiErrorResponse";
import { getServerSession, User } from "next-auth";
import ListingModel from "@/model/listing";
import { authOptions } from "../auth/[...nextauth]/options";
import { uploadToImageKit } from "@/Helpers/UploadtoImageKit";

// check if the user is loggin in or 
// if yes find the user in database 
// add a new property
// save the property
// return response 200

export async function POST(request: NextRequest) {

   try {
          await dbConnect()
       const form = await request.formData()


       const description = form.get("description") as String
       const location = form.get("location") as String
      const price = parseFloat(form.get("price") as string) || null;
       const images = form.get("images") as File | null
       const rating = form.get("rating") as String
       const amenities = form.get("amenities") as String
       const availableDates = form.get("availableDates") as Date | null
    console.log({ description, location, price, images, rating, amenities, availableDates });



       if (!description || !location || !price || !images || !rating || !amenities || !availableDates ) {
         return errorResponse("Error response all fields are required!" , 400)
       }


 
      const session = await getServerSession(authOptions)
      const user: User = session?.user as User
 
      if (!session || !session.user) {
         return errorResponse("Error your not loggin please login to add property" , 401) 
      }
 
      const userId = user._id
    
    if (!userId) {
   return errorResponse("Error User Id is required", 400);
}

await UserModel.findById(userId);
 // uploading images 
const uploadimg = await uploadToImageKit(images)

if (!uploadimg) {
   return errorResponse("Error while uploading Image")
}


      const NewProperty = new ListingModel({
        description,
        location,
        price,
        images: uploadimg,
        host: userId,
        amenities,
        availableDates        
       })

       await NewProperty.save()
       return NextResponse.json({
         message: "Property created Sucessfully",
         NewProperty
       } , {status: 201} )


   } catch (error) {
    console.log("Error while  adding property" , error)
    return errorResponse("Error while adding property" , 400)
   }
}



