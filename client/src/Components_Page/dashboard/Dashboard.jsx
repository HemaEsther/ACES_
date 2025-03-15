import HeaderDashboard from "../HeaderDashboard";
import LeftSideDashboard from "./LeftSideDashboard";
import RightSideDashboard from "./RightSideDashboard";

const Dashboard = () => {
  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <HeaderDashboard />
      <div className="flex flex-1 overflow-hidden pt-14"> {/* Added pt-14 to offset header height */}
        <LeftSideDashboard />
        <RightSideDashboard />
      </div>
    </div>
  );
};

export default Dashboard;