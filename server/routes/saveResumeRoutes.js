import express from "express";
import { 
  saveResumeController, 
  getSavedResumesController,  
  downloadResumeController, 
  getAllUserResumesController,
  updateResumeController,
  deleteResumeController
} from "../controllers/saveResumeController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/save", authenticateUser, saveResumeController); // Create a resume
router.get("/get/:resumeId", authenticateUser, getSavedResumesController); // Read a resume (for the logged-in user)
router.get("/getAll",authenticateUser,getAllUserResumesController); // Read all resumes (for the logged-in user)
router.patch('/update/:resumeId', authenticateUser, updateResumeController); // Update a resume (for the logged-in user)
router.delete('/delete/:resumeId', authenticateUser, deleteResumeController); // Delete a resume

// Download resume (for the logged-in user)
router.get('/download/:resumeId', authenticateUser, downloadResumeController);

export default router;
