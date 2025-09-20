import mongoose , {Schema , Document, Mongoose} from "mongoose";



export interface User extends Document{
name: string,
email: string,
password: string,
isVerifiedEmail?: boolean,
verifycode: string,
verifycodeexpiry: Date,
phone: number,
PropertyPosted: mongoose.Types.ObjectId,
Bookings: mongoose.Types.ObjectId
}

const UserSchema: Schema<User> = new Schema({
    name: {
        type: String,
        required: [true , "Username is required!"],
        unique: true
    },
    email: {
        type: String,
        required: [true , "Email is required!"],
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'please use a vaild email address']
    },
    password: {
        type: String,
        required: [false, "password is required!"],
        unique: true,
      
    },
    isVerifiedEmail: {
      type: Boolean,
      default: false
    },
    verifycode: {
        type: String,
        required: [false , "Verify code is required!"]
    },
    verifycodeexpiry: {
        type: Date,
        required: [false , "Verify code expired is required!"]
    },
    phone: {
     type: Number,
     required: [true , "Phone number is required!"]
    },
    
    PropertyPosted: [
  {
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Listing',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    images: [{
      type: String
    }],
    price: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }
],



})

// checking if the model is already created or not if not creates it
// this avoids the error of OverwriteModelError: Cannot overwrite "User" model once compiled. 
const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);

export default UserModel