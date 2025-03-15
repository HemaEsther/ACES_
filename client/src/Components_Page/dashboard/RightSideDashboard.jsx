import AIChat from "./AIChat";

const RightSideDashboard = () => {
  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 overflow-hidden p-6">
      <div className="container mx-auto max-w-2xl">
        <AIChat />
      </div>
    </div>
  );
};

export default RightSideDashboard;