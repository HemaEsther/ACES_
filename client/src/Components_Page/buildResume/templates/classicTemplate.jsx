const ClassicTemplate = ({ details }) => (
  <div className="p-6 border border-gray-500 shadow-md bg-white dark:bg-gray-900 dark:border-gray-700 max-w-[800px] mx-auto font-serif text-gray-900 dark:text-gray-200">
    {/* Header */}
    <div className="text-center border-b-2 border-gray-400 dark:border-gray-700 pb-3">
      <h1 className="text-3xl font-bold">{details.name || "Your Name"}</h1>
      <p className="text-gray-700 dark:text-gray-300">
        {details.email || "your.email@example.com"} | {details.phone || "123-456-7890"}
      </p>
      <p className="text-gray-600 dark:text-gray-400">
        {details.linkedin || "linkedin.com/in/yourname"} | {details.github || "github.com/yourusername"}
      </p>
    </div>

    {/* Experience */}
    <div className="mt-5">
      <h2 className="text-lg font-semibold border-b border-gray-400 dark:border-gray-700 pb-1">Professional Experience</h2>
      <p className="font-semibold">{details.experienceTitle || "Software Developer"}</p>
      <p className="italic text-gray-700 dark:text-gray-300">
        {details.company || "Company Name"} | {details.duration || "2022 - Present"}
      </p>
      <p className="text-gray-700 dark:text-gray-400">{details.experience || "Describe your role and achievements here."}</p>
    </div>

    {/* Education */}
    <div className="mt-5">
      <h2 className="text-lg font-semibold border-b border-gray-400 dark:border-gray-700 pb-1">Education</h2>
      <p className="font-semibold">{details.degree || "B.Tech in Computer Science"}</p>
      <p className="italic text-gray-700 dark:text-gray-300">
        {details.university || "XYZ University"} | {details.year || "2018 - 2022"}
      </p>
    </div>

    {/* Skills */}
    <div className="mt-5">
      <h2 className="text-lg font-semibold border-b border-gray-400 dark:border-gray-700 pb-1">Technical Skills</h2>
      <p className="text-gray-700 dark:text-gray-400">{details.skills || "React, Redux, Node.js, Express, MongoDB, Git"}</p>
    </div>
  </div>
);

export default ClassicTemplate;
