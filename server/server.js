import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/connectDB.js';
dotenv.config();


const app = express();



//middlewares
app.use(express.json());
app.use(cookieParser()); // Required for handling cookies
app.use(
    cors({
      origin: "http://localhost:5173", // ✅ Allow frontend origin
      credentials: true, // ✅ Allow cookies to be sent
    })
);



// Routes
import authRoutes from './routes/authRoutes.js'
app.use('/api/auth',authRoutes);


const PORT = process.env.PORT || 5001
app.listen(PORT,()=> {
    console.log(`server listening at : ${PORT}`);
    connectDB();
})