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

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = () => {
    if (input.trim() === "") return;
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    setTimeout(() => {
      const botReply = [
        ...newMessages,
        { text: "I got your message!", sender: "bot" },
      ];
      setMessages(botReply);
    }, 1000);
  };

  const startNewChat = () => {
    const defaultMessages = [
      { text: "Hello! 👋", sender: "bot" },
      { text: "I am here to help you with your translations!", sender: "bot" },
    ];
    setMessages(defaultMessages);
    localStorage.setItem("chatMessages", JSON.stringify(defaultMessages));
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
