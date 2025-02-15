import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Logout from "./Logout";
import HeaderDashboard from "./HeaderDashboard";
import { PlusCircle } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  // Sample previous resumes
  const previousResumes = [
    { id: 1, name: "Software Engineer Resume", updated: "2 days ago" },
    { id: 2, name: "Marketing Resume", updated: "1 week ago" },
    { id: 3, name: "Graphic Designer Resume", updated: "1 month ago" },
  ];

  return (
    <>
      {/* Header */}
      <HeaderDashboard />

      {/* Push content below the header */}
      <div className="mt-[80px] flex min-h-screen bg-gray-100 dark:bg-black">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-gray-800 shadow-lg min-h-screen p-5">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Dashboard Menu</h2>

          <div className="space-y-4">
            <Button
              className="w-full text-left px-4 py-3 font-medium bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              onClick={() => navigate("/buildresume")}
            >
              Build Resume
            </Button>

            <Button
              className="w-full text-left px-4 py-3 font-medium bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
              onClick={() => navigate("/ats")}
            >
              Check ATS Score
            </Button>

            <Button
              className="w-full text-left px-4 py-3 font-medium bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600"
              onClick={() => navigate("/selecttemplate")}
            >
              Select Template
            </Button>
          </div>

          <div className="mt-8">
            <Logout />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Create New Resume Section */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Start a New Resume</h2>
            <div
              className="w-48 h-48 flex flex-col items-center justify-center bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition"
              onClick={() => navigate("/createnewresume")}
            >
              <PlusCircle className="w-12 h-12 text-gray-600 dark:text-white" />
              <p className="text-lg font-medium text-gray-700 dark:text-white mt-2">Create New</p>
            </div>
          </div>

          {/* Previous Resumes Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Your Resumes</h2>
            {previousResumes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {previousResumes.map((resume) => (
                  <div
                    key={resume.id}
                    className="p-5 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-300 dark:border-gray-600 cursor-pointer hover:shadow-xl transition"
                    onClick={() => navigate(`/editresume/${resume.id}`)}
                  >
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{resume.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-300">Last updated: {resume.updated}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-300">No resumes found. Start by creating a new one.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
