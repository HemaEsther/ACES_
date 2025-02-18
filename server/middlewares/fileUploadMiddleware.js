import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = "./uploads/";  // Checks if the uploads/ directory exists.
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); //If not, fs.mkdirSync creates it recursively .
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|docx/;  //Allowed file types: PDF (.pdf) and Word documents (.docx).
  const ext = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (allowedTypes.test(ext) && (mimetype === "application/pdf" || mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
    return cb(null, true);
  } else {
    return cb(new Error("Only PDF and DOCX files are allowed!"), false);
  }
};

const upload = multer({ 
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

export default upload;
