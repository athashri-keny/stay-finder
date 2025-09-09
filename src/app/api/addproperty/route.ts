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

       const title = form.get("title") as String || null
       const description = form.get("description") as String
       const location = form.get("location") as String
      const price = parseFloat(form.get("price") as string) || null;
       const images = form.get("images") as File | null
       const amenities = form.get("amenities") as String
       const availabledatefrom = form.get("availableDates.from") as String || null
       const availabledateto = form.get("availableDates.to")  as String || null



    console.log({ description, location, price, images, amenities , availabledatefrom ,  availabledateto , title });



       if (!description || !location || !price || !images  || !title  ) {
         return errorResponse("Error response all fields are required!" , 400)
       }


 
      const session = await getServerSession(authOptions)
      const user: User = session?.user as User
 
      if (!session || !session.user) {
         return errorResponse("Error your not loggin please login to add property" , 401) 
      }
 
      const userId = user._id
      console.log("User id "  , session.user)
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
         title,
         status: 'available',
        description,
        location,
        price,
        images: [uploadimg],
        host: userId,
        amenities,
       availableDates: {
         to: availabledateto,
         from: availabledatefrom
       },
       
       })

       await NewProperty.save()

       await UserModel.findByIdAndUpdate(
         userId,
         {$push:    
         {PropertyPosted: NewProperty._id ,
         title: title,
         price: price
         }, 

      },
       {new: true}
       )
       
       return NextResponse.json({
         message: "Property created Sucessfully",
         NewProperty
       } , {status: 201} )


   } catch (error) {
    console.log("Error while  adding property" , error)
    return errorResponse("Error while adding property" , 400)
   }
}



