import Resume from "../models/resumeSchema.js";
import mongoose from "mongoose";
import puppeteer from "puppeteer";

// Create a new Resume (CREATE)
export const saveResumeController = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("userId in creating a resume", userId);
    const { personalInfo, skills, experience, projects, education } = req.body;

    const newResume = new Resume({
      userId,
      personalInfo,
      skills,
      experience,
      projects,
      education,
    });
    await newResume.save();

    res.status(201).json({ message: "Resume saved successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Get the saved resume for the logged-in user (READ)
export const getSavedResumesController = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("userId in getting a resume", userId);
    const resume = await Resume.findOne({ userId });

    if (!resume) return res.status(404).json({ message: "Resume not found" });

    res.status(200).json(resume);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Update the saved resume (UPDATE)
export const updateSavedResumesController = async (req, res) => {
  try {
    if (!Object.keys(req.body).length) {
      return res.status(400).json({ error: "No update data provided" });
    }

    const userId = req.user.id;

    const updatedResume = await Resume.findOneAndUpdate(
      { userId },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedResume) {
      return res.status(404).json({ error: "Resume not found" });
    }

    res.status(200).json(updatedResume);
  } catch (err) {
    console.error("Error updating resume:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
// Download Resume as PDF (DOWNLOAD)
export const downloadResumeController = async (req, res) => {
  try {
    const userId = req.user.id;
    const resume = await Resume.findOne({ userId });

    if (!resume) return res.status(404).json({ message: "Resume not found" });

    console.log("Generating PDF for:", resume.personalInfo.name);

    // Launch Puppeteer
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    // Generate HTML Content
    const htmlContent = `
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h2 { color: #333; }
          p { margin: 5px 0; }
        </style>
      </head>
      <body>
        <h2>${resume.personalInfo?.name || "N/A"}</h2>
        <p>Email: ${resume.personalInfo?.email || "N/A"}</p>
        <p>Phone: ${resume.personalInfo?.phone || "N/A"}</p>

        <h3>Skills</h3>
        <p>${resume.skills?.join(", ") || "No skills listed"}</p>

        <h3>Experience</h3>
        ${resume.experience
        ?.map(
          (exp) => `
          <p><strong>${exp.company || "Unknown Company"}</strong></p>
        `
        )
        .join("") || "<p>No experience listed</p>"
      }

        <h3>Projects</h3>
        ${resume.projects
        ?.map(
          (proj) => `
          <p><strong>${proj?.title || "Untitled Project"}</strong></p>
          <p>${proj?.description || "No description available"}</p>
          ${proj?.link
              ? `<p><a href="${proj.link}" target="_blank">${proj.link}</a></p>`
              : ""
            }
        `
        )
        .join("") || "<p>No projects listed</p>"
      }

        <h3>Education</h3>
        ${resume.education
        ?.map(
          (edu) => `
          <p><strong>${edu?.school || "Unknown School"}</strong> - ${edu?.degree || "Unknown Degree"
            } (${edu?.year || "N/A"})</p>
        `
        )
        .join("") || "<p>No education listed</p>"
      }
      </body>
      </html>
    `;

    // Set HTML content in Puppeteer
    await page.setContent(htmlContent);

    // Generate PDF
    const pdfBuffer = await page.pdf({ format: "A4" });

    await browser.close();

    // Send the generated PDF
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${resume.personalInfo?.name.replace(/\s+/g, "_") || "Resume"
        }.pdf"`,
    });

    res.send(pdfBuffer);
  } catch (err) {
    console.error("Error generating resume:", err);
    res.status(500).json({ error: "Failed to generate resume PDF" });
  }
};
