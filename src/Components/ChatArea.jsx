import { useContext, useRef, useEffect } from "react";
import { IoSend } from "react-icons/io5";
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
  } = useContext(TextContext);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 flex-col w-full h-screen px-6 py-6 overflow-hidden">
      {/* Chat Messages */}
      <div className="h-[550px] overflow-y-auto bg-transparent flex flex-col space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${
              msg.sender === "bot"
                ? "bg-purple-700 text-white self-start mb-4"
                : "bg-gray-300 self-end"
            }`}
          >
            {msg.text}
            {msg.sender !== "bot" && (
              <div className="flex gap-2 mt-2">
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md bg-white text-black"
                >
                  <option value="en">English</option>
                  <option value="pt">Portuguese</option>
                  <option value="es">Spanish</option>
                  <option value="ru">Russian</option>
                  <option value="tr">Turkish</option>
                  <option value="fr">French</option>
                </select>
                <button
                  className="px-3 py-1 bg-gray-700 text-white rounded-md text-sm hover:bg-gray-400 hover:text-700"
                  onClick={() => handleTranslate(msg.text)}
                >
                  Translate
                </button>
              </div>
            )}
          </div>
        ))}
        <div ref={chatEndRef} /> {/* Invisible div for auto-scroll */}
      </div>

      {/* Input Area */}
      <div className="w-[90%] md:w-[70%] bg-slate-800 px-6 py-10 mx-auto rounded-md absolute bottom-6 left-[50%] md:left-[63%] transform -translate-x-1/2 shadow-lg">
        <form action="" className="flex flex-row items-center gap-4">
          <input
            type="text"
            className="w-full text-white outline-none bg-transparent border border-gray-600 rounded-xl shadow-lg py-3 px-4"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="rounded-full p-4 bg-gray-600 shadow-lg"
            onClick={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          >
            <IoSend className="text-white text-2xl" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatArea;
