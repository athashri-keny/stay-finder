import mongoose from "mongoose";

// defines the structure of the object
type ConnectionObject =  {
    isConnected?: number
}

const connection: ConnectionObject =  {} // creates an empty object that follows this shape

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("Already connected to database")
        return
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || "")
       connection.isConnected = db.connections[0].readyState // storing the value in connection.isconnected 
       console.log("Connected to database sucessfully")

    } catch (error) {
        console.log("Error while connecting to database" , error)
        process.exit(1)
    }
}

export default dbConnect