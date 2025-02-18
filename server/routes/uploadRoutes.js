import express from 'express';
import {handleResume} from '../controllers/handleResumeController.js'
import upload from "../middlewares/fileUploadMiddleware.js";  // Multer middleware

const router = express.Router();

router.post("/resume", upload.single("resume"), handleResume);

export default router;
