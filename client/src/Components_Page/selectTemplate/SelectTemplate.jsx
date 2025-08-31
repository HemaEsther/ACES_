import { useState } from "react";
import { Download, Eye, Pencil, X } from "lucide-react";

const templates = [
  { id: 1, name: "Modern", image: "/templates/modern.png" },
  { id: 2, name: "Classic", image: "/templates/classic.png" },
  { id: 3, name: "Elegant", image: "/templates/elegant.png" },
  { id: 4, name: "Professional", image: "/templates/professional.png" },
];

const SelectTemplate = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    setShowPopup(true);
  };

  return (
    <div
      className={`min-h-screen p-8 transition-all 
        bg-gray-100 text-gray-900 dark:bg-black dark:text-slate-200`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-wide">
          Choose Your Resume Template
        </h1>
      </div>

      {/* Grid of Resume Templates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {templates.map((template) => (
          <div
            key={template.id}
            className="relative p-4 border border-transparent rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:border-blue-500 bg-white dark:bg-gray-800 backdrop-blur-md bg-opacity-90 dark:bg-opacity-80"
          >
            {/* Template Image */}
            <img
              src={template.image}
              alt={template.name}
              className="w-full h-56 object-cover rounded-lg shadow-md"
            />

            {/* Template Name */}
            <h3 className="text-xl font-semibold mt-4">{template.name}</h3>

            {/* Action Buttons */}
            <div className="flex justify-between mt-5">
              <button
                onClick={handleClick}
                className="flex items-center px-4 py-2 text-sm bg-gray-700 text-white rounded-md transition-all hover:bg-gray-800 hover:scale-105"
              >
                <Eye className="w-5 h-5 mr-2" /> Preview
              </button>
              <button
                onClick={handleClick}
                className="flex items-center px-4 py-2 text-sm bg-blue-600 text-white rounded-md transition-all hover:bg-blue-700 hover:scale-105"
              >
                <Pencil className="w-5 h-5 mr-2" /> Edit
              </button>
              <button
                onClick={handleClick}
                className="flex items-center px-4 py-2 text-sm bg-green-600 text-white rounded-md transition-all hover:bg-green-700 hover:scale-105"
              >
                <Download className="w-5 h-5 mr-2" /> Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-sm w-full relative text-center">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
              🚧 Under Construction
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              This section is under construction and will be available soon.
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectTemplate;
