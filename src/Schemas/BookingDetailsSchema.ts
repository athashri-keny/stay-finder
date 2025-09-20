import z from "zod";

export const BookingDetailsSchema = z.object({
    _id: z.string({message: '_id is required!'}),
    listing: z.string(),
    checkin: z.date({message: "Checkin date required!"}),
    checkout: z.date({message: "Checkout date required!"}),
    totalPrice: z.number({message: "totalprice required!"}),
    paymentStatus: z.string({message: "Payment status is required@"}),
    guests: z.string({message: "guests number is required!"}),
    BookingId: z.string({message: "BookingId is required!"}),
    numberOfNights: z.string({message: "Number of nights required!"})
})