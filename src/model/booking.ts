// Reservations made by users (Booking)

import mongoose , {Schema , Document, ObjectId} from "mongoose";

export interface Booking extends Document {
    user: ObjectId, // property posting by host
    listing: ObjectId // host property
    checkin: Date,
    checkout: Date,
    guests: number,
    status: ' available' | 'booked'
}

const bookingSchema: Schema<Booking> = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true , "User is required!"]
  },
  listing: {
    type: mongoose.Types.ObjectId,
    ref: "host",
    required: [true , "Listing  is requried!"]
  },
  checkin: {
    type: Date,
    required: [true , "Check in date is required!"]
  },
  checkout: {
    type: Date,
    required: [true , "Check-out date is required!"]
  },
  guests: {
    type: Number,
    required: [true , "Aleast one Guest is required!"],
    min: 1,
    max: 9
  },
  status: {
    type: String,
    required: [true , "Status is requried!"]
  }
} , {
    timestamps: true
})


const BookingModel = (mongoose.models.Booking as mongoose.Model<Booking> || mongoose.model<Booking> ("Booking" , bookingSchema) )

export default BookingModel