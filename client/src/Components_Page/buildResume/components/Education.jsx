import { useState, useEffect } from "react";
import useResumeStore from "../../../store/resumeStore";
import { FiPlus, FiTrash } from "react-icons/fi";

export default function Education() {
  const { education, setEducation, fetchResume, updateResume } = useResumeStore();
  const [edu, setEdu] = useState({ school: "", degree: "", year: "" });
  
  useEffect(() => {
    if (education.length === 0) fetchResume();
  }, []);
  

  const addEducation = async () => {
    if (!edu.school.trim() || !edu.degree.trim()) return;

    const updatedEducation = [...education, { ...edu, school: edu.school.trim(), degree: edu.degree.trim() }];
    setEducation(updatedEducation);
    setEdu({ school: "", degree: "", year: "" });

    try {
      await updateResume();
    } catch (error) {
      console.error("Error adding education:", error);
    }
  };

  const removeEducation = async (index) => {
    const updatedEducation = education.filter((_, i) => i !== index);
    setEducation(updatedEducation);

    try {
      await updateResume();
    } catch (error) {
      console.error("Error removing education:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Education</h2>
        <p className="text-gray-400 text-sm mt-1">
          Add your educational background (required: school and degree)
        </p>
      </div>

      {/* Form Section */}
      <div className="space-y-4">
        <div>
          <label htmlFor="school" className="block text-sm text-gray-300 mb-1">
            School/University
          </label>
          <input
            type="text"
            id="school"
            placeholder="e.g., University of Example"
            value={edu.school}
            onChange={(e) => setEdu({ ...edu, school: e.target.value })}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors duration-300"
          />
        </div>

        <div>
          <label htmlFor="degree" className="block text-sm text-gray-300 mb-1">
            Degree
          </label>
          <input
            type="text"
            id="degree"
            placeholder="e.g., Bachelor of Science in Computer Science"
            value={edu.degree}
            onChange={(e) => setEdu({ ...edu, degree: e.target.value })}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors duration-300"
          />
        </div>

        <div>
          <label htmlFor="year" className="block text-sm text-gray-300 mb-1">
            Year
          </label>
          <input
            type="text"
            id="year"
            placeholder="e.g., 2018 - 2022"
            value={edu.year}
            onChange={(e) => setEdu({ ...edu, year: e.target.value })}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors duration-300"
          />
        </div>

        <button
          onClick={addEducation}
          disabled={!edu.school.trim() || !edu.degree.trim()}
          className="w-full py-2 px-4 bg-amber-500 text-gray-900 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-amber-600 disabled:bg-gray-700 disabled:text-gray-400 transition-colors duration-300"
        >
          <FiPlus size={20} /> Add Education
        </button>
      </div>

      {/* Education List */}
      <div className="space-y-3">
        {education.length > 0 ? (
          education.map((edu, index) => (
            <div
              key={index}
              className="bg-gray-800 border border-gray-700 p-4 rounded-lg flex justify-between items-start"
            >
              <div className="space-y-1">
                <h3 className="text-gray-200 font-semibold">{edu.school}</h3>
                <p className="text-gray-300 text-sm">
                  {edu.degree} {edu.year ? `(${edu.year})` : ""}
                </p>
              </div>
              <button
                onClick={() => removeEducation(index)}
                className="text-red-500 hover:text-red-400 transition-colors duration-200"
              >
                <FiTrash size={18} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm">No education added yet</p>
        )}
      </div>
    </div>
  );
}