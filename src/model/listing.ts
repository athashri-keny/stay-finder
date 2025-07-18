// Properties posted for rent

import mongoose , {Schema , Document, ObjectId} from "mongoose";

export interface Listing extends Document  {
description: string,
location: string,
price: number,
images: string[],
host: ObjectId,
amenities?: string[],
availableDates?: Date[] // optional for filtering
}

const ListingSechma: Schema<Listing> = new Schema({
description: {
    type: String,
    required: [true, "Description of the property is required!"]
},
location: {
    type: String,
    required: [true, "Location is required!"]
},
price: {
    type: Number,
    required: [true, "Price is required!"]
},
images: {
    type: [String],
    required: [true, "At least one image is required!"],
    min: 2,
    max: 7
},
host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Host is required!"]
},
amenities: {
    type: [String]
},
availableDates: {
    type: [Date],
}
},
{timestamps: true}
)


const ListingModel = (mongoose.models.Listing as mongoose.Model<Listing>) || mongoose.model<Listing>("Listing" , ListingSechma)

export default ListingModel