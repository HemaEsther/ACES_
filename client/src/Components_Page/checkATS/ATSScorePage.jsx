import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AtsResult from "./AtsResult";

const ATSScorePage = () => {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/upload/resume",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      setResults(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("There was an error uploading the file.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
   
    <div className="bg-gradient-to-r from-pink-100 via-green-100 via-orange-100 to-yellow-100 min-h-screen flex items-center justify-center p-10">
      <div className="w-[75%] flex flex-col md:flex-row items-center gap-10">
        {/* LEFT SIDE: Upload Section */}
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Start Getting Your Resume Noticed
          </h1>
          <p className="text-gray-600 mb-6">
            Upload your resume to analyze its ATS compatibility and get a score.
          </p>

          <form onSubmit={handleSubmit}>
            <label className="flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white rounded-lg shadow-md cursor-pointer hover:scale-105 transform transition-all duration-300 ease-in-out">
              {isLoading ? (
                <div className="animate-spin w-6 h-6 border-4 border-white border-t-transparent rounded-full"></div>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    fill="none"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span className="ml-2">Upload Resume (PDF/DOCX)</span>
                </>
              )}
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.docx"
                className="hidden"
              />
            </label>

            {file && !isLoading && (
              <div className="mt-3 text-sm text-gray-700 bg-gray-100 p-2 rounded-lg">
                <strong>Selected File:</strong> {file.name}
              </div>
            )}

            <button
              type="submit"
              className="mt-4 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 w-full"
              disabled={isLoading}
            >
              {isLoading ? "Uploading..." : "Check ATS Score"}
            </button>
          </form>
        </div>

        {/* RIGHT SIDE: Image or ATS Score Result */}
        <div className="w-full max-w-lg flex items-center justify-center">
          {results ? (
           <AtsResult results={results}/>
          ) : (
            <img
              src="src/assets/ats+template.webp"
              alt="ATS Checking Resume"
              className="w-full rounded-lg shadow-lg transition-all duration-500 ease-in-out hover:scale-105"
            />
          )}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ATSScorePage;
