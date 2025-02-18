import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (res, userId) => {
    // Create the token
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1hr" });

    // Set the token in HTTP-only cookie
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Secure in production
        sameSite: "strict",
        maxAge:60 * 60 * 1000, // 1 hour in milliseconds
    });

    return token; // Return the token only if needed
};

export default generateToken;
