import fs from "fs";
import axios from "axios";
// import pdfParse from "pdf-parse";   --------- issue with this
import pdfParse from "pdf-parse-fixed";


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
    const pdfData = await pdfParse(fs.readFileSync(req.file.path));
    resumeText = pdfData.text;
    fs.unlinkSync(req.file.path);
  } catch (error) {
    console.error("PDF Parsing Error ❌:", error);
    return res.status(500).json({ error: "Error processing resume file 😭😭😭" });
  }

  const docker_url_python_backend='http://ml-model:5002/predict';
  const local_url_python_backend='http://localhost:5002/predict';
  const production_url_python_backend='https://aces-kth9.onrender.com/predict';

  try {
    // localhost kam nahi kar raha 
    console.log("Helooooooooo")
    const response = await axios.post(`${docker_url_python_backend}`, { // change to local host when on local machine
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
