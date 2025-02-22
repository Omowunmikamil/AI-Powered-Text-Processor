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
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const detectLanguage = async (text) => {
    if ("ai" in self && "languageDetector" in self.ai) {
      const languageDetectorCapabilities =
        await self.ai.languageDetector.capabilities();
      if (languageDetectorCapabilities.capabilities === "readily") {
        const detector = await self.ai.languageDetector.create();
        const results = await detector.detect(text);
        return results[0]?.detectedLanguage || "en";
      }
    }
    return "en";
  };

  const translateText = async (text, targetLanguage) => {
    if ("ai" in self && "translator" in self.ai) {
      const translator = await self.ai.translator.create({
        sourceLanguage: await detectLanguage(text),
        targetLanguage,
      });
      return await translator.translate(text);
    }
    return text;
  };

  const sendMessage = async () => {
    if (input.trim() === "") return;
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    setTimeout(() => {
      const botReply = [...newMessages];
      setMessages(botReply);
    }, 1000);
  };

  const handleTranslate = async (text) => {
    const translatedText = await translateText(text, selectedLanguage);
    setMessages((prev) => [...prev, { text: translatedText, sender: "bot" }]);
  };

  const handleSummarize = async (text) => {
    setMessages((prev) => [
      ...prev,
      { text: "Summary: " + text, sender: "bot" },
    ]);
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
        selectedLanguage,
        setSelectedLanguage,
        handleTranslate,
        handleSummarize,
      }}
    >
      {children}
    </TextContext.Provider>
  );
};

export default TextProvider;
