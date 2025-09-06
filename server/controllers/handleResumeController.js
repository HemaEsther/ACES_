import fs from "fs";
import axios from "axios";
import path from "path";
import pdfjsLib from "pdfjs-dist/legacy/build/pdf.js";

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
  } catch (error) {
    console.error("PDF Parsing Error ❌:", error);
    return res.status(500).json({ error: "Error processing resume file 😭😭😭" });
  }

  const local_url_python_backend = "http://localhost:5002/predict";

  try {
    const response = await axios.post(local_url_python_backend, {
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
