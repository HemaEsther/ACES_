import Resume from "../models/resumeSchema.js";
import puppeteer from "puppeteer";
import mongoose from "mongoose";

// Create a new Resume (CREATE)
export const saveResumeController = async (req, res) => {
  try {
    const userId = req.user.id;
    // console.log("userId in creating a resume", userId);
    const { personalInfo, skills, experience, projects, education } = req.body;

    const newResume = new Resume({
      userId, // Links to the authenticated user
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
export const getAllUserResumesController = async (req, res) => {
  try {
    const userId = req.user.id;

    // console.log("userId:", userId);

    const resumes = await Resume.find({ userId });

    if (!resumes) return res.status(404).json({ message: "Resume not found" });

    res.status(200).json({ resumes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getSavedResumesController = async (req, res) => {
  try {
    const userId = req.user.id;
    const resumeId = req.params.resumeId;

    // console.log("userId:", userId);
    // console.log("resumeId:", resumeId);

    // Find the resume with both userId and _id
    const resume = await Resume.findOne({ _id: resumeId, userId });

    if (!resume) return res.status(404).json({ message: "Resume not found" });

    res.status(200).json(resume);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update the saved resume (UPDATE)
export const updateResumeController = async (req, res) => {
  try {
    const userId = req.user.id;
    const resumeId = req.params.resumeId;
    // console.log("Authenticated userId:", userId);
    if (!mongoose.Types.ObjectId.isValid(resumeId)) {
      console.log("Invalid resumeId:", resumeId);
      return res.status(400).json({ message: "Invalid resume ID" });
    }

    const { personalInfo, skills, experience, projects, education } = req.body;
    // console.log("Parsed body:", { personalInfo, skills, experience, projects, education });

    // Clean subdocuments to avoid _id conflicts
    const cleanExperience = experience.map(({ _id, ...rest }) => rest);
    const cleanProjects = projects.map(({ _id, ...rest }) => rest);
    const cleanEducation = education.map(({ _id, ...rest }) => rest);
    // console.log("Cleaned data:", { personalInfo, skills, cleanExperience, cleanProjects, cleanEducation });

    const resume = await Resume.findOneAndUpdate(
      { _id: resumeId, userId },
      {
        personalInfo,
        skills,
        experience: cleanExperience,
        projects: cleanProjects,
        education: cleanEducation,
      },
      { new: true }
    );
    // console.log("Updated resume:", resume);

    if (!resume) {
      console.log(
        "Resume not found for resumeId:",
        resumeId,
        "and userId:",
        userId
      );
      return res
        .status(404)
        .json({ message: "Resume not found or you don’t have access" });
    }

    res.status(200).json({ message: "Resume updated successfully", resume });
  } catch (err) {
    console.error("Update Resume Error:", err.stack || err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
};

export const deleteResumeController = async (req, res) => {
  try {
    const userId = req.user.id; // get authemticated user id
    const resumeId = req.params.resumeId;
    // console.log("resume Id: ",resumeId)

    if (!mongoose.Types.ObjectId.isValid(resumeId)) {
      return res.status(400).json({ message: "Invalid resume ID" });
    }

    const resume = await Resume.findOneAndDelete({ _id: resumeId });

    if (!resume) {
      return res
        .status(404)
        .json({ message: "Resume not found or you don’t have access" });
    }

    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (err) {
    console.error("Delete Resume Error:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
};

// Route: router.patch("/update/:resumeId", authenticateUser, updateResumeController);
// Download Resume as PDF (DOWNLOAD)
export const downloadResumeController = async (req, res) => {
  try {
    const userId = req.user.id;
    const resumeId = req.params.resumeId;
    // console.log("Authenticated userId:", userId);
    // console.log("Resume ID to download:", resumeId);

    const resume = await Resume.findOne({ _id: resumeId, userId });
    if (!resume) return res.status(404).json({ message: "Resume not found" });

    // console.log("Generating PDF for:", resume.personalInfo.name);

    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

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
        ${resume.experience?.map((exp) => `<p><strong>${exp.company || "Unknown Company"}</strong></p>`).join("") || "<p>No experience listed</p>"}
        <h3>Projects</h3>
        ${resume.projects?.map((proj) => `
          <p><strong>${proj?.title || "Untitled Project"}</strong></p>
          <p>${proj?.description || "No description available"}</p>
          ${proj?.link ? `<p><a href="${proj.link}" target="_blank">${proj.link}</a></p>` : ""}
        `).join("") || "<p>No projects listed</p>"}
        <h3>Education</h3>
        ${resume.education?.map((edu) => `
          <p><strong>${edu?.school || "Unknown School"}</strong> - ${edu?.degree || "Unknown Degree"} (${edu?.year || "N/A"})</p>
        `).join("") || "<p>No education listed</p>"}
      </body>
      </html>
    `;

    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf({ format: "A4" });
    // console.log("PDF Buffer length:", pdfBuffer.length);

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Length": pdfBuffer.length,
      "Content-Disposition": `attachment; filename="${resume.personalInfo?.name.replace(/\s+/g, "_") || "Resume"}.pdf"`,
    });
    res.end(pdfBuffer, "binary");
  } catch (err) {
    console.error("Error generating resume:", err);
    res.status(500).json({ error: "Failed to generate resume PDF" });
  }
};
