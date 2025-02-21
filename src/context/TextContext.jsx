import { createContext, useState, useEffect } from "react";

export const TextContext = createContext();

const TextProvider = ({ children }) => {
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    return savedMessages
      ? JSON.parse(savedMessages)
      : [
          { text: "Hello! 👋", sender: "bot" },
          {
            text: "I am here to help you with your translations!",
            sender: "bot",
          },
        ];
  });
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages((prev) => {
      const newMessages = [...prev, { text: input, sender: "user" }];
      localStorage.setItem("chatMessages", JSON.stringify(newMessages));
      return newMessages;
    });
    setInput("");

    // Simulate bot response after 1 second
    setTimeout(() => {
      setMessages((prev) => {
        const newMessages = [
          ...prev,
          {
            text: "Choose your preferred language!",

            buttons: [
              {
                text: "Translate",
                action: "translate",
                style:
                  "bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-md hover:bg-gray-600 hover:text-whit",
              },
              {
                text: "Summarize",
                action: "summarize",
                style:
                  "bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-md hover:bg-gray-600 hover:text-whit",
              },
            ],
            sender: "bot",
          },
        ];
        localStorage.setItem("chatMessages", JSON.stringify(newMessages));
        return newMessages;
      });
    }, 1000);
  };

  const startNewChat = () => {
    const defaultMessages = [
        { text: "Hello! 👋", sender: "bot" },
        { text: "I am here to help you with your translations!", sender: "bot" },
      ];
      setMessages(defaultMessages);
      localStorage.removeItem("chatMessages");
  };

  return (
    <TextContext.Provider
      value={{
        messages,
        setMessages,
        input,
        setInput,
        sendMessage,
        startNewChat,
      }}
    >
      {children}
    </TextContext.Provider>
  );
};

export default TextProvider;
