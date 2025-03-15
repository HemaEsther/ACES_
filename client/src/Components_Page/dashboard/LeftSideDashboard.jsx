import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, LayoutGrid } from "lucide-react";

const LeftSideDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-white dark:bg-gray-800 shadow-lg flex-shrink-0 p-5">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Menu Bar</h2>
      <div className="space-y-4">
        <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/buildresume")}>
          <FileText className="w-5 h-5 mr-2" /> Build Resume
        </Button>
        <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/ats")}>
          <FileText className="w-5 h-5 mr-2" /> Check ATS Score
        </Button>
        <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/selecttemplate")}>
          <LayoutGrid className="w-5 h-5 mr-2" /> Select Template
        </Button>
      </div>
    </div>
  );
};

export default LeftSideDashboard;