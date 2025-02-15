import express from "express";
import { loginUser, registerUser, logoutUser } from "../controllers/authController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js"; // Import the middleware

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
// ✅ Use middleware to protect `/me` route
router.get("/me", authenticateUser, (req, res) => {
  res.json({ userId: req.user.id, email: req.user.email });
});
// me  is used to check whether a user is 
// authenticated and to retrieve their details without requiring extra input.

export default router;
