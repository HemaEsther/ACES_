const ResumeSection = ({ type, content }) => {
    return (
      <div className="mb-4">
        {/* Experience Section */}
        {type === "experience" && (
          <div className="border-l-4 border-black pl-4">
            <h3 className="text-lg font-semibold">{content.position}</h3>
            <p className="text-sm text-gray-700 font-medium">{content.company}</p>
            <p className="text-xs text-gray-500">{content.duration}</p>
            <p className="text-sm mt-2">{content.description}</p>
          </div>
        )}
  
        {/* Education Section */}
        {type === "education" && (
          <div className="border-l-4 border-gray-800 pl-4">
            <h3 className="text-lg font-semibold">{content.degree}</h3>
            <p className="text-sm text-gray-700 font-medium">{content.university}</p>
            <p className="text-xs text-gray-500">{content.duration}</p>
          </div>
        )}
  
        {/* Skills Section */}
        {type === "skills" && (
          <div>
            <h3 className="text-lg font-semibold underline">Skills</h3>
            <ul className="flex flex-wrap mt-2">
              {content.map((skill, index) => (
                <li key={index} className="text-sm bg-gray-200 px-3 py-1 m-1 rounded-md">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}
  
        {/* Projects Section */}
        {type === "projects" && (
          <div className="border-l-4 border-gray-800 pl-4">
            <h3 className="text-lg font-semibold">{content.title}</h3>
            <p className="text-sm mt-1">{content.description}</p>
            <p className="text-sm text-gray-600 mt-1">
              <strong>Technologies:</strong> {content.technologies.join(", ")}
            </p>
          </div>
        )}
      </div>
    );
  };
  
  export default ResumeSection;
  