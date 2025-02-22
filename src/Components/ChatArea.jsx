import { useContext } from "react";
import { TextContext } from "../context/TextContext";

const ChatArea = () => {
  const {
    messages,
    input,
    setInput,
    sendMessage,
    selectedLanguage,
    setSelectedLanguage,
    handleTranslate,
    handleSummarize,
  } = useContext(TextContext);

  return (
    <div className="flex flex-col w-full md:w-3/4 h-screen p-6 bg-white rounded-xl shadow-lg">
      <div className="flex-1 overflow-y-auto p-4 border-b border-gray-300">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 p-3 max-w-xs md:max-w-md rounded-lg ${
              msg.sender === "bot"
                ? "bg-gray-200 text-gray-800"
                : "bg-blue-500 text-white self-end"
            }`}
          >
            {msg.text}
            {msg.sender === "bot" && (
              <div className="flex gap-2 mt-2">
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="en">English</option>
                  <option value="pt">Portuguese</option>
                  <option value="es">Spanish</option>
                  <option value="ru">Russian</option>
                  <option value="tr">Turkish</option>
                  <option value="fr">French</option>
                </select>
                <button
                  className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600"
                  onClick={() => handleTranslate(msg.text)}
                >
                  Translate
                </button>
                <button
                  className="px-3 py-1 bg-yellow-500 text-white rounded-md text-sm hover:bg-yellow-600"
                  onClick={() => handleSummarize(msg.text)}
                >
                  Summarize
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Type a message..."
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatArea;
