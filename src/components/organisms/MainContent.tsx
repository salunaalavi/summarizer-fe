import { Button, Divider, Space } from "antd";
import { SummaryAction } from "../molecules/SummaryAction";
import { ChatDisplay } from "./ChatDisplay";
import { SummaryDisplay } from "./SummaryDisplay";
import { Message } from "@/types";

interface MainContentProps {
  viewMode: "chat" | "summary";
  chatMessages: Message[];
  inputValue: string;
  summaryText: string;
  isSummarizing: boolean;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
  onPaste: (e: React.ClipboardEvent) => void;
  onReset: () => void;
  onSummarize: () => Promise<void>;
  onBackToChat: () => void;
}

export const MainContent = ({
  viewMode,
  chatMessages,
  inputValue,
  summaryText,
  isSummarizing,
  onInputChange,
  onSubmit,
  onPaste,
  onReset,
  onSummarize,
  onBackToChat,
}: MainContentProps) => {
  return (
    <div>
      {viewMode === "chat" ? (
        <>
          <ChatDisplay messages={chatMessages} />
          <Space style={{ marginBottom: 16 }}>
            <Button
              danger
              onClick={onReset}
              disabled={chatMessages.length === 0}
            >
              Reset Chat
            </Button>
            <Button
              type="primary"
              onClick={onSummarize}
              loading={isSummarizing}
              disabled={chatMessages.length === 0 && !inputValue.trim()}
            >
              Summarize
            </Button>
          </Space>
          <SummaryAction
            value={inputValue}
            onChange={onInputChange}
            onSubmit={onSubmit}
            onPaste={onPaste}
          />
        </>
      ) : (
        <SummaryDisplay summary={summaryText} onBackToChat={onBackToChat} />
      )}
      <Divider />
    </div>
  );
};
