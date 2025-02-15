import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Header from "./Header";
import Logout from "./Logout";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <>
    <Header/>
   
    <div className="bg-slate-100 dark:bg-black">
 
    <div className=" w-[75%] m-auto min-h-screen flex flex-col items-center justify-center text-center px-4">

      <motion.h1
        className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {"A great resume isn't just a document, it's the key to your next big opportunity."}
      </motion.h1>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button
            className="px-6 py-3 text-lg font-medium bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            onClick={() => navigate("/build-resume")}
          >
            Build Your Resume
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button
            className="px-6 py-3 text-lg font-medium bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
            onClick={() => navigate("/ats")}
          >
            Check Your ATS Score
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
       
      </motion.div>
      
      <Logout/>
    </div>
    </div>
  
     
    </>
  
  );
};

export default Dashboard;
