import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/connectDB.js";


dotenv.config();
const app = express();


app.use(express.json());
app.use(cookieParser()); 


app.use(
  cors({
    origin: process.env.FRONTEND_URL_DEVELOPMENT, // ❌ No longer used
    // origin: process.env.FRONTEND_URL_PRODUCTION, // ❌ No longer used
    credentials: true,
  })
);


import authRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import saveResumeRoutes from "./routes/saveResumeRoutes.js";

app.use("/api/", authRoutes);         // Authentication
app.use("/api/upload", uploadRoutes); // Upload resume to check ATS score
app.use("/api/resume", saveResumeRoutes); // CRUD Resume to DB

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
  connectDB();
});
