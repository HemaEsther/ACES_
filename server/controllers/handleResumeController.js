import fs from "fs";
import axios from "axios";
<<<<<<< HEAD
import path from "path";
import pdfjsLib from "pdfjs-dist/legacy/build/pdf.js";
=======
// import pdfParse from "pdf-parse";   --------- issue with this
import pdfParse from "pdf-parse-fixed";


>>>>>>> b8cc275f8aad853702bc2eaffc3c2065f874dbff

export const handleResume = async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const { role, job_desc } = req.body;
  if (!role || !job_desc) {
    return res
      .status(400)
      .json({ error: "Job role and description are required" });
  }

  let resumeText = "";

  try {
<<<<<<< HEAD
    const filePath = path.resolve(req.file.path);
    const pdfBuffer = fs.readFileSync(filePath);

    // ✅ Convert Buffer -> Uint8Array
    const pdfData = new Uint8Array(pdfBuffer);

    const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map(item => item.str).join(" ");
      resumeText += pageText + "\n";
    }

    fs.unlinkSync(filePath); // Clean up uploaded file
=======
    const pdfData = await pdfParse(fs.readFileSync(req.file.path));
    resumeText = pdfData.text;
    fs.unlinkSync(req.file.path);
>>>>>>> b8cc275f8aad853702bc2eaffc3c2065f874dbff
  } catch (error) {
    console.error("PDF Parsing Error ❌:", error);
    return res.status(500).json({ error: "Error processing resume file 😭😭😭" });
  }

<<<<<<< HEAD
  const local_url_python_backend = "http://localhost:5002/predict";

  try {
    const response = await axios.post(local_url_python_backend, {
=======
  // const docker_url_python_backend='http://ml-model:5002/predict';
  // const local_url_python_backend='http://localhost:5002/predict';
  const production_url_python_backend='https://aces-kth9.onrender.com/predict';

  try {
    // localhost kam nahi kar raha 
    console.log("Helooooooooo")
    const response = await axios.post(`${production_url_python_backend}`, {
>>>>>>> b8cc275f8aad853702bc2eaffc3c2065f874dbff
      resume_text: resumeText,
      job_desc,
      role,
    });

    return res.json({
      score: response.data.score,
      suggestions: response.data.suggestions || [],
    });
  } catch (error) {
    console.error("ATS Model Error 🙈:", error.message);
    return res
      .status(500)
      .json({ error: "ATS Model Error inside SERVER" });
  }
};
