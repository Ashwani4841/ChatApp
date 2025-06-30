import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECT)
        console.log("Database connected successfully")
    } catch (error) {
        console.log("DB not connected")
    }
}

export default dbConnect;