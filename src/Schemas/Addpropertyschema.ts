import z from "zod";

export const AddpropertySchema = z.object({
    description: z.string({message: "Description is requred!"}),
    location: z.string({message: "Location is requried!"}),
    price: z.number({message: "Price is requried"}),
   images: z.array(z.string(), { message: "Images are required" }),
  rating: z.string({message: "Rating is required!"}),
  amenities: z.string(),
availableDates: z.object({
  from: z.date({ message: "Start date is required" }),
  to: z.date({ message: "End date is required" }).optional()
})
})