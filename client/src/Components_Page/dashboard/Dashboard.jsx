// Dashboard.jsx
import HeaderDashboard from "../HeaderDashboard";
import LeftSideDashboard from "./LeftSideDashboard";
import RightSideDashboard from "./RightSideDashboard";

const Dashboard = () => {
  return (
    <>
      <div className="h-screen overflow-hidden">
      <HeaderDashboard />
      <div className="mt-[57px]   flex min-h-screen bg-gray-100 dark:bg-black">
        <LeftSideDashboard />
        <RightSideDashboard />
      </div>
      </div>
    
    </>
  );
};

export default Dashboard;
