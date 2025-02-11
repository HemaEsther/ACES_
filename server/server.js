import express from 'express';
import dotenv from "dotenv";
import connectDB from './config/connectDB.js';
dotenv.config();

const app = express();


app.get('/',(req,res)=>{
    res.send("hello from server");
})

// Routes
import authRoutes from './routes/authRoutes.js'
app.use('/api/auth',authRoutes);


const PORT = process.env.PORT || 5001
app.listen(PORT,()=> {
    console.log(`server listening at : ${PORT}`);
    connectDB();
})