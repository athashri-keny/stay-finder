// Reservations made by users (Booking)

import mongoose , {Schema , Document, ObjectId} from "mongoose";
import ListingModel from "./listing";

export interface Booking extends Document {
    user: ObjectId, // property posting by host
    listing: ObjectId // host property
    checkin: Date,
    checkout: Date,
    totalPrice: Number,
    paymentStatus: 'pending' | 'completed' | 'Failed'
    guests: Number
    BookingId: string
    numberOfNights: Number
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
  totalPrice: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending' , 'completed' , 'failed'],
    default: 'pending'
  },
  guests: {
    type: Number,
    required: [true , "Guests numbers are required!"]
  }, 
  BookingId: {
    type: String,
    required: [true , 'booking Id is required!']
  },
  numberOfNights: {
    type: Number,
    required: [true , "Number of nights is required@"]
  }

} , {
    timestamps: true
})



const BookingModel = (mongoose.models.Booking as mongoose.Model<Booking> || mongoose.model<Booking> ("Booking" , bookingSchema) )




export default BookingModel
