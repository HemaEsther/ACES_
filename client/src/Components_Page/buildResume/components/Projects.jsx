import { useState, useEffect } from "react";
import useResumeStore from "../../../store/resumeStore";
import { FiPlus, FiTrash } from "react-icons/fi";

export default function Projects() {
  const { projects, setProjects, fetchResume, updateResume } = useResumeStore();
  const [project, setProject] = useState({ title: "", description: "", link: "" });
 

  useEffect(() => {
    fetchResume();
  }, []);

  const addProject = async () => {
    if (!project.title.trim()) return;

    const updatedProjects = [...projects, { ...project, title: project.title.trim() }];
    setProjects(updatedProjects);
    setProject({ title: "", description: "", link: "" });

    try {
      await updateResume();
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  const removeProject = async (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);

    try {
      await updateResume();
    } catch (error) {
      console.error("Error removing project:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Projects</h2>
        <p className="text-gray-400 text-sm mt-1">
          Showcase your work (required: title)
        </p>
      </div>

      {/* Form Section */}
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm text-gray-300 mb-1">
            Project Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="e.g., Portfolio Website"
            value={project.title}
            onChange={(e) => setProject({ ...project, title: e.target.value })}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors duration-300"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm text-gray-300 mb-1">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Describe your project, technologies used, and achievements..."
            value={project.description}
            onChange={(e) => setProject({ ...project, description: e.target.value })}
            rows="4"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors duration-300"
          />
        </div>

        <div>
          <label htmlFor="link" className="block text-sm text-gray-300 mb-1">
            Project Link (optional)
          </label>
          <input
            type="text"
            id="link"
            placeholder="e.g., https://github.com/username/project"
            value={project.link}
            onChange={(e) => setProject({ ...project, link: e.target.value })}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors duration-300"
          />
        </div>

        <button
          onClick={addProject}
          disabled={!project.title.trim()}
          className="w-full py-2 px-4 bg-amber-500 text-gray-900 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-amber-600 disabled:bg-gray-700 disabled:text-gray-400 transition-colors duration-300"
        >
          <FiPlus size={20} /> Add Project
        </button>
      </div>

      {/* Projects List */}
      <div className="space-y-3">
        {projects.length > 0 ? (
          projects.map((proj, index) => (
            <div
              key={index}
              className="bg-gray-800 border border-gray-700 p-4 rounded-lg flex justify-between items-start"
            >
              <div className="space-y-1">
                <h3 className="text-gray-200 font-semibold">{proj.title}</h3>
                <p className="text-gray-300 text-sm">
                  {proj.description || "No description provided"}
                </p>
                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-500 hover:text-amber-400 text-sm transition-colors duration-200"
                  >
                    View Project
                  </a>
                )}
              </div>
              <button
                onClick={() => removeProject(index)}
                className="text-red-500 hover:text-red-400 transition-colors duration-200"
              >
                <FiTrash size={18} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm">No projects added yet</p>
        )}
      </div>
    </div>
  );
}