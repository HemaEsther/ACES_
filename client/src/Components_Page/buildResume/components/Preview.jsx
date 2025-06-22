import { useRef, useEffect, useState } from "react";
// import { useReactToPrint } from "react-to-print";
import useResumeStore from "../../../store/resumeStore";
import { FiDownload, FiLoader } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function ResumePreview() {
  const { personalInfo, skills, experience, projects, education, fetchResume, updateResume, saveResume, downloadResume, currentResumeId } = useResumeStore();
  const resumeRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   if (currentResumeId) {
  //     // console.log("Fetching resume with ID:", currentResumeId);
  //     fetchResume(currentResumeId);
  //   } else {
  //     // console.log("No currentResumeId yet, skipping fetch");
  //   }
  // }, [currentResumeId, fetchResume]);

  // const printPDF = useReactToPrint({
  //   content: () => resumeRef.current,
  //   documentTitle: `${personalInfo?.name || "Resume"}.pdf`,
  //   pageStyle: `
  //     @page {
  //       size: A4;
  //       margin: 20mm;
  //     }
  //     @media print {
  //       .no-print {
  //         display: none !important;
  //       }
  //     }
  //   `,
  // });

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      let resumeId = currentResumeId;
      if (!resumeId) {
        // console.log("No currentResumeId, saving resume first...");
        const response = await saveResume();
        console.log("Save response:", response);
        resumeId = response.resumeId || response._id; // Handle different response structures
        if (!resumeId) {
          throw new Error("No resumeId returned from saveResume");
        }
        console.log("New resumeId after save:", resumeId);
      } else {
        console.log("Updating existing resume with ID:", resumeId);
        await updateResume(resumeId);
      }
      console.log("Downloading resume with ID:", resumeId);
      await downloadResume(resumeId);
    } catch (error) {
      console.error("Failed to download resume:", error);
      alert("Failed to download resume. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveResume = async () => {
    setIsLoading(true);
    try {
      await saveResume();
      toast.success("Resume saved successfully!");
      // console.log("Resume saved successfully, currentResumeId:", currentResumeId);
    } catch (error) {
      console.error("Failed to save resume:", error);
      alert("Failed to save resume. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  

  // ... Rest of the component (return statement remains unchanged)
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6 flex items-center justify-center">
      <div className="w-full max-w-4xl space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Resume Preview</h1>
          <p className="text-gray-400 text-sm mt-2">
            Review your resume below and choose an action
          </p>
        </div>

        {/* Resume Content */}
        <div
          ref={resumeRef}
          className="bg-white text-gray-900 p-8 rounded-2xl shadow-xl border border-gray-200 print:bg-white print:shadow-none print:border-none"
        >
          {personalInfo ? (
            <>
              <div className="border-b border-gray-300 pb-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {personalInfo.name || "Your Name"}
                </h2>
                <div className="text-gray-600 text-sm mt-2 space-y-1">
                  <p>
                    {personalInfo.email || "email@example.com"} | {personalInfo.phone || "Phone"}
                  </p>
                  <p>
                    {personalInfo.linkedin && (
                      <a
                        href={personalInfo.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-500 print:text-blue-600 transition-colors duration-200"
                      >
                        {personalInfo.linkedin}
                      </a>
                    )}
                    {personalInfo.github && " | "}
                    {personalInfo.github && (
                      <a
                        href={personalInfo.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-500 print:text-blue-600 transition-colors duration-200"
                      >
                        {personalInfo.github}
                      </a>
                    )}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Skills</h3>
                <p className="text-gray-700 text-sm">
                  {skills?.length > 0 ? skills.join(", ") : "No skills added"}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Experience</h3>
                {experience?.length > 0 ? (
                  experience.map((exp, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      <h4 className="font-semibold text-gray-800">
                        {exp.company} - {exp.role}
                      </h4>
                      <p className="text-gray-600 text-sm">{exp.duration || "Duration not specified"}</p>
                      <p className="text-gray-700 text-sm mt-1">
                        {exp.description || "No description provided"}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 text-sm">No experience added</p>
                )}
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Projects</h3>
                {projects?.length > 0 ? (
                  projects.map((proj, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      <h4 className="font-semibold text-gray-800">{proj.title}</h4>
                      <p className="text-gray-700 text-sm mt-1">
                        {proj.description || "No description provided"}
                      </p>
                      {proj.link && (
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-500 text-sm mt-1 inline-block print:text-blue-600 transition-colors duration-200"
                        >
                          {proj.link}
                        </a>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 text-sm">No projects added</p>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Education</h3>
                {education?.length > 0 ? (
                  education.map((edu, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      <h4 className="font-semibold text-gray-800">{edu.school}</h4>
                      <p className="text-gray-700 text-sm">
                        {edu.degree} {edu.year ? `(${edu.year})` : ""}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 text-sm">No education added</p>
                )}
              </div>
            </>
          ) : (
            <p className="text-gray-600 text-center">Loading resume...</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 no-print">
          <button
            onClick={handleSaveResume}
            disabled={isLoading}
            className="py-2 px-6 bg-amber-500 text-gray-900 rounded-lg font-semibold flex items-center gap-2 hover:bg-amber-600 disabled:bg-gray-700 disabled:text-gray-400 transition-colors duration-300"
          >
            {isLoading ? <FiLoader className="animate-spin" size={20} /> : <FiDownload size={20} />}
            Save Resume
          </button>
          <button
            onClick={handleDownload}
            disabled={isLoading}
            className="py-2 px-6 bg-amber-500 text-gray-900 rounded-lg font-semibold flex items-center gap-2 hover:bg-amber-600 disabled:bg-gray-700 disabled:text-gray-400 transition-colors duration-300"
          >
            {isLoading ? <FiLoader className="animate-spin" size={20} /> : <FiDownload size={20} />}
            Download as PDF
          </button>
        </div>
      </div>
    </div>
  );
}