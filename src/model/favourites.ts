import mongoose , {Schema , Document } from "mongoose";

export interface Ifavourite extends Document {
    userId:  mongoose.Types.ObjectId;
    propertyId:  mongoose.Types.ObjectId
}

const favouriteSchema:Schema<Ifavourite> = new Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Listing',
        required: true
    }, 

}, {
    timestamps: true
})

const favouriteModel = (mongoose.models.favourite as mongoose.Model<Ifavourite> || mongoose.model<Ifavourite>("favourite" , favouriteSchema))

export default favouriteModel