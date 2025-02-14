import React from "react";

const ATSScorePage = () => {
  return (
    <div className=" h-screen overflow-hidden flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-r from-pink-100 via-green-100 via-orange-100 to-yellow-100 p-10">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl text-left">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Start Getting Your Resume Noticed
        </h1>
        <p className="text-gray-600 mb-6">
          Boost your chances of landing the job with our ATS resume checker.
          Upload your resume to analyze its ATS compatibility and get a score.
        </p>

        <label className="w-full flex flex-col items-center px-4 py-6 bg-gray-200 text-blue-600 rounded-lg shadow-md tracking-wide uppercase border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white transition">
          <span className="text-base leading-normal">Upload Resume (PDF/DOCX)</span>
          <input type="file" className="hidden" disabled />
        </label>

        <div className="mt-6 text-gray-700">
          <p className="text-lg font-semibold">
            Your ATS Score: <span className="text-blue-600">-</span>
          </p>
          <p className="text-sm text-gray-500">Upload a resume to see your score.</p>
        </div>
      </div>

      <div className="ml-16 w-full max-w-sm ">
        <img src="src/assets/ats+template.webp" alt="ATS Checking Resume" className="w-full mt-14 rounded-lg shadow-lg" />
      </div>
    </div>
  );
};

export default ATSScorePage;

