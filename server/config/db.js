import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DATABASE_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("Error connecting to database: ", error);
        process.exit(1);
    }
}

export default connectDB;
