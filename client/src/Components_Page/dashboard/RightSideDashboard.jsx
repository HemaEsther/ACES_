import { useState } from "react";
import { MessageCircle, X, Minus } from "lucide-react";
import { Button } from "../../components/ui/button";
import AIChat from "./AIChat";

const RightSideDashboard = () => {
  const [showChat, setShowChat] = useState(false);
  const [minimized, setMinimized] = useState(false);

  return (
    <>
      <div className="flex-1 p-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200">
        <div className="flex flex-col items-center space-y-4">
          {/* Button to Open AI Chat */}
          <Button
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition duration-200 flex items-center space-x-2"
            onClick={() => setShowChat(true)}
          >
            <MessageCircle className="w-5 h-5" />
            <span>Talk to your Personalized RESUME HELPER</span>
          </Button>
        </div>
      </div>

      {/* AI Chat Box (Only Visible When showChat is True) */}
      {showChat && (
        <AIChat
          onClose={() => setShowChat(false)}
          minimized={minimized}
          setMinimized={setMinimized}
        />
      )}
    </>
  );
};

export default RightSideDashboard;
