const ModernTemplate = ({ details }) => (
  <div className="p-8 border border-gray-400 shadow-lg bg-white dark:bg-gray-900 dark:border-gray-700 max-w-[800px] mx-auto font-sans text-gray-900 dark:text-gray-200">
    {/* Header */}
    <div className="border-b-2 border-gray-300 dark:border-gray-700 pb-4">
      <h1 className="text-4xl font-bold">{details.name || "Your Name"}</h1>
      <p className="text-gray-700 dark:text-gray-300 text-lg">
        {details.email || "your.email@example.com"} | {details.phone || "123-456-7890"}
      </p>
      <p className="text-gray-600 dark:text-gray-400">
        {details.linkedin || "linkedin.com/in/yourname"} | {details.github || "github.com/yourusername"}
      </p>
    </div>

    {/* Summary */}
    {details.summary && (
      <div className="mt-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-300">Summary</h2>
        <p className="text-gray-700 dark:text-gray-400">{details.summary}</p>
      </div>
    )}

    {/* Experience */}
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-300 border-b-2 border-gray-300 dark:border-gray-700 pb-1">Work Experience</h2>
      <p className="font-semibold">{details.experienceTitle || "Software Engineer"}</p>
      <p className="text-gray-700 dark:text-gray-400 italic">
        {details.company || "Company Name"} | {details.duration || "2022 - Present"}
      </p>
      <p className="text-gray-700 dark:text-gray-400">{details.experience || "Describe your role and achievements here."}</p>
    </div>

    {/* Education */}
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-300 border-b-2 border-gray-300 dark:border-gray-700 pb-1">Education</h2>
      <p className="font-semibold">{details.degree || "Bachelor’s in Computer Science"}</p>
      <p className="text-gray-700 dark:text-gray-400 italic">
        {details.university || "XYZ University"} | {details.year || "2018 - 2022"}
      </p>
    </div>

    {/* Skills */}
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-300 border-b-2 border-gray-300 dark:border-gray-700 pb-1">Skills</h2>
      <p className="text-gray-700 dark:text-gray-400">{details.skills || "JavaScript, React, Node.js, SQL, Git"}</p>
    </div>
  </div>
);

export default ModernTemplate;
