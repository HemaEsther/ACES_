
import fs from 'fs';
import PdfParse from 'pdf-parse';

export const handleResume = async (req, res) => {
  console.log("Uploaded File:", req.file);

  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  let text = "";

  try {
    const pdfData = await PdfParse(fs.readFileSync(req.file.path));
    text = pdfData.text;
  } catch (error) {
    return res.status(500).json({ error: "Error processing file" });
  }

  // Define ATS keywords (can be dynamic later)
  const keywords = ["JavaScript", "React", "Node.js", "MongoDB", "mongosdb", "node", "nodejs","javascript"];
  const foundKeywords = keywords.filter((word) => text.includes(word));

  // Calculate ATS Score
  const atsScore = (foundKeywords.length / keywords.length) * 100;

  // Generate suggestions
  const missingKeywords = keywords.filter((word) => !text.includes(word));
  const suggestions = missingKeywords.map((word) => `Add '${word}' to improve your ATS score.`);

  res.json({ score: atsScore.toFixed(2), suggestions });
};

