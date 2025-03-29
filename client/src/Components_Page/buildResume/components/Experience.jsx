import { useState, useEffect } from "react";
import useResumeStore from "../../../store/resumeStore";
import { FiPlus, FiTrash } from "react-icons/fi";

export default function Experience() {
  const { experience, setExperience, fetchResume, updateResume, currentResumeId} = useResumeStore();
  const [job, setJob] = useState({ company: "", role: "", duration: "", description: "" });

  useEffect(() => {
    fetchResume(currentResumeId);
  }, []);

  const addExperience = async () => {
    if (!job.company.trim() || !job.role.trim()) return;

    const newExperience = { 
      company: job.company.trim(), 
      role: job.role.trim(), 
      duration: job.duration.trim(), 
      description: job.description.trim() 
    };

    const updatedExperience = [...experience, newExperience];
    setExperience(updatedExperience);
    setJob({ company: "", role: "", duration: "", description: "" });

    try {
      await updateResume(currentResumeId);
    } catch (error) {
      console.error("Error updating resume:", error);
    }
  };

  const removeExperience = async (index) => {
    const updatedExperience = experience.filter((_, i) => i !== index);
    setExperience(updatedExperience);

    try {
      await updateResume(currentResumeId);
    } catch (error) {
      console.error("Error updating resume:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Work Experience</h2>
        <p className="text-gray-400 text-sm mt-1">Add your professional experience (Company & Role required)</p>
      </div>

      <div className="space-y-4">
        {['company', 'role', 'duration', 'description'].map((field, index) => (
          <div key={index}>
            <label className="block text-sm text-gray-300 mb-1" htmlFor={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field === 'description' ? 'textarea' : 'text'}
              id={field}
              placeholder={`Enter ${field}...`}
              value={job[field]}
              onChange={(e) => setJob({ ...job, [field]: e.target.value })}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors duration-300"
            />
          </div>
        ))}
        
        <button
          onClick={addExperience}
          disabled={!job.company.trim() || !job.role.trim()}
          className="w-full py-2 px-4 bg-amber-500 text-gray-900 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-amber-600 disabled:bg-gray-700 disabled:text-gray-400 transition-colors duration-300"
        >
          <FiPlus size={20} /> Add Experience
        </button>
      </div>

      <div className="space-y-3">
        {experience.length > 0 ? (
          experience.map((exp, index) => (
            <div key={index} className="bg-gray-800 border border-gray-700 p-4 rounded-lg flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="text-gray-200 font-semibold">{exp.company} - {exp.role}</h3>
                <p className="text-gray-400 text-sm">{exp.duration || "No duration specified"}</p>
                <p className="text-gray-300 text-sm">{exp.description || "No description provided"}</p>
              </div>
              <button
                onClick={() => removeExperience(index)}
                className="text-red-500 hover:text-red-400 transition-colors duration-200"
              >
                <FiTrash size={18} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm">No experience added yet</p>
        )}
      </div>
    </div>
  );
}
