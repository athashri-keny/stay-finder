import mongoose , {Schema , Document, Mongoose} from "mongoose";


export interface User extends Document{
name: string,
email: string,
password: string,
isVerifiedEmail?: boolean,
verifycode: string,
verifycodeexpiry: Date,
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
        required: [true , "password is required!"],
        unique: true
    },
    isVerifiedEmail: {
      type: Boolean,
      default: false
    },
    verifycode: {
        type: String,
        required: [true , "Verify code is required!"]
    },
    verifycodeexpiry: {
        type: Date,
        required: [true , "Verify code expired is required!"]
    }
})

// checking if the model is already created or not if not creates it
// this avoids the error of OverwriteModelError: Cannot overwrite "User" model once compiled. 
const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);

export default UserModel