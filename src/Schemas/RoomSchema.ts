import * as z from 'zod'

export const RoomSchema = z.object({
    _id: z.string(),
    title: z.string(),
    description: z.string({message: "Error description is required!"}),
    location: z.string({message: "location is required!"}),
 images: z.array(z.string() , {message: "At least one image is required!"}),
    rating: z.number().optional(),
    host:  z.string({message: "Host Id is required!"}),
      amenities: z.array(z.string()).optional(),
status: z.string(),

  price: z.number({message: "Price is required!"})
})
