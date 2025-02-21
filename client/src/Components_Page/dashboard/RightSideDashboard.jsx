import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";

const RightSideDashboard = () => {
  const navigate = useNavigate();

  // Sample previous resumes
  const previousResumes = [
    { id: 1, name: "Software Engineer Resume", updated: "2 days ago" },
    { id: 2, name: "Marketing Resume", updated: "1 week ago" },
    { id: 3, name: "Graphic Designer Resume", updated: "1 month ago" },
  ];

  return (
    <div className="flex-1 p-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200">
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Start a New Resume</h2>
        <div
          className="w-48 h-48 flex flex-col items-center justify-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={() => navigate("/createnewresume")}
        >
          <PlusCircle className="w-12 h-12 text-gray-700 dark:text-gray-300" />
          <p className="text-lg font-medium mt-2">Create New</p>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Resumes</h2>
        {previousResumes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {previousResumes.map((resume) => (
              <div
                key={resume.id}
                className="p-5 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700 cursor-pointer hover:shadow-xl transition hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => navigate(`/editresume/${resume.id}`)}
              >
                <h3 className="text-lg font-bold">{resume.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Last updated: {resume.updated}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No resumes found. Start by creating a new one.</p>
        )}
      </div>
    </div>
  );
};

export default RightSideDashboard;
