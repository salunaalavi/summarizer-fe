import { useState, useCallback } from "react";
import { HeaderSection } from "../components/organisms/HeaderSection";
import { MainContent } from "../components/organisms/MainContent";
import { parseChatText, convertMessagesToText } from "../utils/chatParser";
import { message } from "antd";
import axios from "axios";
import { Message } from "@/types";

export default function HomePage() {
  const [inputValue, setInputValue] = useState("");
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [summaryText, setSummaryText] = useState("");
  const [viewMode, setViewMode] = useState<"chat" | "summary">("chat");
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [currentUserNames] = useState<string[]>(["You", "Me"]);

  // Handle paste event with enhanced parser
  const handlePaste = (e: React.ClipboardEvent) => {
    const pastedText = e.clipboardData.getData("text");
    try {
      const parsedMessages = parseChatText(pastedText, currentUserNames);
      if (parsedMessages.length > 0) {
        e.preventDefault();
        setChatMessages((prev) => [...prev, ...parsedMessages]);
        setInputValue("");
        message.success(`Parsed ${parsedMessages.length} messages`);
      }
    } catch (error) {
      console.error("err", error);
      message.error("Could not parse chat messages");
    }
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleSubmit = () => {
    if (inputValue.trim()) {
      // Check if input is a chat message
      try {
        const parsedMessages = parseChatText(inputValue, currentUserNames);
        if (parsedMessages.length > 0) {
          setChatMessages((prev) => [...prev, ...parsedMessages]);
        } else {
          // Regular message
          handleSummarize();
        }
        // setInputValue("");
      } catch (error) {
        console.error("err", error);
        message.error("Failed to parse message; err: ");
      }
    }
  };

  const handleReset = () => {
    setChatMessages([]);
    setInputValue("");
  };

  const handleBackToChat = () => {
    setViewMode("chat");
  };

  const handleSummarize = useCallback(async () => {
    try {
      setIsSummarizing(true);

      // Convert chat messages to text or use direct input
      const textToSummarize =
        inputValue.trim() || convertMessagesToText(chatMessages);

      if (!textToSummarize) {
        message.warning("No content to summarize");
        return;
      }

      // Call your summarization API
      const summary = await axios.post(`http://127.0.0.1:7860/summarize`, {
        text: JSON.stringify(textToSummarize),
      });

      // Set the summary and switch view
      setSummaryText(summary.data?.summary);
      setViewMode("summary");
    } catch (error) {
      message.error("Failed to generate summary");
      console.error("Summarization error:", error);
    } finally {
      setIsSummarizing(false);
    }
  }, [inputValue, chatMessages]);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <HeaderSection />
      <MainContent
        viewMode={viewMode}
        chatMessages={chatMessages}
        inputValue={inputValue}
        summaryText={summaryText}
        isSummarizing={isSummarizing}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        onPaste={handlePaste}
        onReset={handleReset}
        onSummarize={handleSummarize}
        onBackToChat={handleBackToChat}
      />
    </div>
  );
}
