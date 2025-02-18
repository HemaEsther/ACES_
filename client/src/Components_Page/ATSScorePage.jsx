import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

const ATSScorePage = () => {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // State to manage loading

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    // Start loading
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/upload/resume",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      // Store the results received from the backend
      setResults(response.data);

    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("There was an error uploading the file.");
    } finally {
      // Stop loading
      setIsLoading(false);
    }
  };

  return (
    <div className="md:h-screen overflow-hidden flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-r from-pink-100 via-green-100 via-orange-100 to-yellow-100 p-10">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl text-left">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Start Getting Your Resume Noticed
        </h1>
        <p className="text-gray-600 mb-6">
          Boost your chances of landing the job with our ATS resume checker.
          Upload your resume to analyze its ATS compatibility and get a score.
        </p>

        {/* File upload */}
        <form onSubmit={handleSubmit}>
          <label className="w-full flex items-center px-6 py-4 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white rounded-lg shadow-md tracking-wide cursor-pointer hover:scale-105 transform transition-all duration-300 ease-in-out">
            <span className="flex items-center space-x-3 text-base leading-normal">
              {isLoading ? (
                <div className="spinner-border animate-spin w-6 h-6 border-4 border-white border-t-transparent rounded-full"></div> // Spinner during upload
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span>Upload Resume (PDF/DOCX)</span>
                </>
              )}
            </span>
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.docx"
              className="absolute opacity-0 cursor-pointer"
            />
          </label>
          {/* Display selected file name */}
        {file && !isLoading && (
          <div className="mt-3 text-sm text-gray-700 bg-gray-100 p-2 rounded-lg">
            <strong>Selected File:</strong> {file.name}
          </div>
        )}

          <button
            type="submit"
            className="mt-4 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? "Uploading..." : "Check ATS Score"}
          </button>
        </form>

        <div className="mt-6 text-gray-700">
          <p className="text-lg font-semibold">Your ATS Score:</p>
          {results && (
            <div className="text-blue-600">
              <p>{results.score}%</p>
              <p>Suggestions:</p>
              <ul>
                {results.suggestions.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}

          <p className="text-sm text-gray-500">
            Upload a resume to see your score.
          </p>
        </div>
      </div>

      <div className="ml-16 w-full max-w-sm">
        <img
          src="src/assets/ats+template.webp"
          alt="ATS Checking Resume"
          className="w-full mt-14 rounded-lg shadow-lg"
        />
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default ATSScorePage;
