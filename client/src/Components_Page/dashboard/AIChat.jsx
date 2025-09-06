import { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `
You are Resume Helper AI, a friendly and professional assistant.

- Always introduce yourself as "your personal resume helper."
- Only answer questions related to resumes, job applications, ATS optimization, or career advice.
- Provide clear, practical, and professional guidance to users.
- If a user asks how to improve their resume or ATS score, give genuine advice first, then add:
  "You can also try our platform ACES to build your resume and instantly check your ATS score."
- If someone asks "Who are you?", reply exactly:
  "I am your personal resume helper, here to make your resume stand out."
- Keep responses concise, engaging, and tailored to the resume/job context.
`;



// 📝 Typewriter effect (word by word for readability)
const typeWriterEffect = async (fullText, updateCallback, speed = 50) => {
  const words = fullText.split(/(\s+)/); // keep spaces intact
  let displayedText = "";
  for (let i = 0; i < words.length; i++) {
    displayedText += words[i];
    updateCallback(displayedText);
    await new Promise((resolve) => setTimeout(resolve, speed));
  }
};

const AIChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize Google Generative AI
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Auto-scroll when new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isStreaming) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setIsStreaming(true);
    let aiResponseText = "";

    try {
      // Get streaming response
      const result = await model.generateContentStream(
        `${SYSTEM_PROMPT}\n\nUser: ${input}\nAI:`
      );

      const aiMessage = { text: "", sender: "ai" };
      setMessages((prev) => [...prev, aiMessage]);

      for await (const chunk of result.stream) {
        aiResponseText += chunk.text();
      }

      // ✅ Animate typing after full response
      await typeWriterEffect(aiResponseText, (typedText) => {
        setMessages((prev) => {
          const updatedMessages = [...prev];
          updatedMessages[updatedMessages.length - 1] = {
            text: typedText,
            sender: "ai",
          };
          return updatedMessages;
        });
      });
    } catch (error) {
      console.error("Error streaming Gemini API:", error);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { text: "⚠️ Oops, something went wrong. Try again?", sender: "ai" },
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

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="min-h-full flex flex-col justify-end">
          {messages.length === 0 ? (
            <div className="text-center py-10">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                👋 Hi, I’m your personal resume helper!
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Ask me anything about resumes, ATS optimization, or job applications.
              </p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`inline-block p-3 rounded-lg max-w-[85%] ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <pre className="whitespace-pre-wrap break-words font-sans">{msg.text}</pre>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shrink-0">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask me about your resume..."
            className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isStreaming}
          />
          <button
            onClick={sendMessage}
            className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg ${
              isStreaming ? "opacity-50 cursor-not-allowed" : ""
            }`}
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
