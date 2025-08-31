import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/connectDB.js";

dotenv.config();
const app = express();

// // =======================
// // Middlewares
// // =======================
app.use(express.json());
app.use(cookieParser()); // Required for handling cookies

// // ✅ Allowed origins for both development & production
// const allowedOrigins = [
//   process.env.FRONTEND_URL_DEVELOPMENT, // ✅ Local Vite frontend
//   process.env.FRONTEND_URL_PRODUCTION1,  // ✅ Render frontend
//   process.env.FRONTEND_URL_PRODUCTION,  // ✅ Vercel frontend
// ];

// // ✅ Auto-pick correct origin based on NODE_ENV
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // Allow Postman, server-to-server, and same-origin requests
//       if (!origin) return callback(null, true);

//       // ✅ If request origin is in the allowed list, accept it
//       if (allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         console.log("❌ CORS Blocked Origin:", origin);
//         callback(new Error("CORS Policy: Origin not allowed"));
//       }
//     },
//     credentials: true, // ✅ Allow cookies, JWT, etc.
//   })
// );

// ❌ Old static CORS config (not used anymore):
app.use(
  cors({
    origin: process.env.FRONTEND_URL_DEVELOPMENT, // ❌ No longer used
    // origin: process.env.FRONTEND_URL_PRODUCTION, // ❌ No longer used
    credentials: true,
  })
);

// =======================
// Routes
// =======================
import authRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import saveResumeRoutes from "./routes/saveResumeRoutes.js";

app.use("/api/", authRoutes);         // Authentication
app.use("/api/upload", uploadRoutes); // Upload resume to check ATS score
app.use("/api/resume", saveResumeRoutes); // CRUD Resume to DB

// =======================
// Server Health Check
// =======================
// app.get("/", (req, res) => {
//   res.send("Server is running ✅");
// });

// =======================
// Start Server
// =======================
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
  connectDB();
});
