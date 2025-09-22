import z from "zod";

export const AddpropertySchema = z.object({
  title: z.string({message: "Title is required!"}),
    description: z.string({message: "Description is requred!"}),

    location: z.string({message: "Location is requried!"}),

    price: z.string({message: "Price is requried"}),

   images: z
  .any()
  .refine((files) => files && files.length > 0, {
    message: "At least one image is required",
  }),

  amenities: z.string(),
  
})  