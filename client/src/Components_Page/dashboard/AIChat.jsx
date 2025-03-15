import { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const AIChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false); // Track streaming state
  const messagesEndRef = useRef(null);

  // Initialize Google Generative AI
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // Replace with your actual API key
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Use a valid model

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isStreaming) return; // Prevent sending if already streaming

    // Add user message
    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Start streaming AI response
    setIsStreaming(true);
    let aiResponseText = ""; // Accumulate streamed text

    try {
      const result = await model.generateContentStream(input);

      // Add an empty AI message to start displaying chunks
      const aiMessage = { text: "", sender: "ai" };
      setMessages((prev) => [...prev, aiMessage]);

      // Process the stream
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        aiResponseText += chunkText;
        // Update the last message with the accumulated text
        setMessages((prev) => {
          const updatedMessages = [...prev];
          updatedMessages[updatedMessages.length - 1] = { text: aiResponseText, sender: "ai" };
          return updatedMessages;
        });
      }
    } catch (error) {
      console.error("Error streaming Gemini API:", error);
      setMessages((prev) => [
        ...prev.slice(0, -1), // Remove the empty AI message
        { text: "Oops, something went wrong. Try again?", sender: "ai" },
      ]);
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
      {/* Header */}
      <div className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shrink-0">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Resume Helper AI</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Your personal AI assistant</p>
      </div>

      {/* Messages Container with Internal Scrollbar */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="min-h-full flex flex-col justify-end">
          {messages.length === 0 ? (
            <div className="text-center py-10">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Hello!</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Ask me anything about your resume!</p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`inline-block p-3 rounded-lg max-w-[85%] ${
                    msg.sender === "user" ? "bg-blue-600 text-white" : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shrink-0">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask me about your resume..."
            className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isStreaming} // Disable input while streaming
          />
          <button
            onClick={sendMessage}
            className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg ${isStreaming ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isStreaming}
          >
            {isStreaming ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;