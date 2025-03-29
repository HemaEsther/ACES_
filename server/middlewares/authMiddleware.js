import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Middleware to verify JWT token from cookies
export const authenticateUser = (req, res, next) => {
  const token = req.cookies.token; // Read token from HTTP-only cookie

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded token: ", decoded); // gives the monogodb _id of the user
    req.user = decoded; //Attach user info to request object
    next(); // Move to the next middleware/controller
  }catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
