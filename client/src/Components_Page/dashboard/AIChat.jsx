import { X, Minus } from "lucide-react";
import { useState, useRef } from "react";

const AIChat = ({ onClose, minimized, setMinimized }) => {
  const [size, setSize] = useState({ width: 320, height: 400 }); // Default size
  const chatBoxRef = useRef(null);
  const isResizing = useRef(false);

  // Handle resizing
  const handleMouseDown = (e) => {
    isResizing.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (isResizing.current) {
      setSize((prevSize) => ({
        width: Math.max(280, prevSize.width + e.movementX), // Min width: 280px
        height: Math.max(300, prevSize.height + e.movementY), // Min height: 300px
      }));
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      ref={chatBoxRef}
      className="fixed bottom-5 right-5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg shadow-xl flex flex-col transition-all duration-300"
      style={{ width: `${size.width}px`, height: `${size.height}px` }}
    >
      {/* Chat Header with Minimize & Close Buttons */}
      <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-800 border-b cursor-move">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
          Resume Helper AI
        </h2>
        <div className="flex space-x-2">
          {/* Minimize Button */}
          <button
            onClick={() => setMinimized(!minimized)}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <Minus className="w-5 h-5" />
          </button>
          {/* Close Button */}
          <button
            onClick={onClose}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Chat Content */}
      {!minimized && (
        <>
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            <p className="text-gray-500 dark:text-gray-400 text-center">
              Your AI assistant will appear here...
            </p>
          </div>

          {/* Chat Input */}
          <div className="border-t p-3 flex">
            <input
              type="text"
              placeholder="Ask AI..."
              className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none"
            />
            <button className="px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg">
              Send
            </button>
          </div>
        </>
      )}

      {/* Resize Handle */}
      <div
        className="absolute bottom-0 right-0 w-4 h-4 bg-gray-500 cursor-se-resize"
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};

export default AIChat;
