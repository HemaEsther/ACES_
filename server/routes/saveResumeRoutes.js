import express from "express";
import { 
  saveResumeController, 
  getSavedResumesController, 
  updateSavedResumesController, 
  downloadResumeController 
} from "../controllers/saveResumeController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/save", authenticateUser, saveResumeController); // Create a resume
router.get("/get", authenticateUser, getSavedResumesController); // Read a resume (for the logged-in user)
router.patch('/update', authenticateUser, updateSavedResumesController); // Update a resume (for the logged-in user)
// router.delete('/delete', authenticateUser, deleteSavedResumeController); // Delete a resume

// Download resume (for the logged-in user)
router.get('/download', authenticateUser, downloadResumeController);

export default router;
