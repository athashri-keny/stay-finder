import * as z from 'zod';

export const UserSchema = z.object({
_id: z.string({message: "User Id is required!"}),
email: z.string({message: "Email is required!"}),
isVerifiedEmail: z.boolean({message: "Verified Email is required!"}),
name: z.string({message: "Name is required!"}),
phone: z.number({message: "phone is required!"}),
PropertyPosted: z.array(z.string()).optional(),
Bookings: z.array(z.string()).optional()
})