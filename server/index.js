import cookieParser from "cookie-parser";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes)

app.listen(PORT, () => {
    connectDB();
    console.log(`App is runing on port ${PORT}`);
})