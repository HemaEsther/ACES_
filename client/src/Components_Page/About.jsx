import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

const About = () => {
    const navigate = useNavigate();
  return (
    <div className=" bg-gray-50 dark:bg-black dark:text-white py-16">
      <div className="w-[75%] m-auto">

        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl font-extrabold text-gray-900 dark:text-yellow-300 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-transparent bg-clip-text"
          >
            Create a resume that gets results
          </motion.h1>

          <Button
             onClick={() => navigate('/login')}
             className="h-14"
          >
            Browse Templates</Button>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 bg-white dark:bg-black dark:text-slate-100 dark:border border-gray-700 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-slate-200">
              Job-Ready Resume
            </h2>
            <p className="text-gray-600  dark:text-slate-400 mt-2">
              Build a professional resume with industry standards.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-black dark:text-slate-100 dark:border border-gray-700 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-slate-200">
              ATS Checker
            </h2>
            <p className="text-gray-600 dark:text-slate-400 mt-2">
              {` Ensure your resume is ATS-friendly and gets past recruiters'
              filters.`}
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-black dark:text-slate-100 dark:border border-gray-700 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-slate-200">
              AI Suggestions
            </h2>
            <p className="text-gray-600 dark:text-slate-400 mt-2">
              Get AI-powered content recommendations to improve your resume.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
