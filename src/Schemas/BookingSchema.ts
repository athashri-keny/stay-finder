import { X } from "lucide-react";
import z from "zod";

export const BookingSchema = z.object({
user: z.string({message: "User id is required!"}),
listing: z.string({message: "Property Id required!"}),
checkIn: z.date({message: "Check-in date is required!"}),
checkOut: z.string({message: "Checkout data is reqiured!"}),
guests: z.number({message: "guestes is requieed!"})
})