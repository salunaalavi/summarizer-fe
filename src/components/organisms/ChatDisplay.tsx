import { ChatMessage } from '../atoms/ChatMessage';

interface Message {
  sender: string;
  message: string;
  timestamp: Date;
  isCurrentUser: boolean;
}

interface ChatDisplayProps {
  messages: Message[];
}

export const ChatDisplay = ({ messages }: ChatDisplayProps) => {
  return (
    <div style={{ 
      height: 160, 
      overflowY: 'auto', 
      padding: 16,
      backgroundColor: '#fafafa',
      borderRadius: 8,
      marginBottom: 16,
      border: '1px solid #f0f0f0'
    }}>
      {messages.length === 0 ? (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100%',
          color: 'rgba(0,0,0,0.45)'
        }}>
          No messages yet. Paste a chat log or type a message.
        </div>
      ) : (
        messages.map((msg, index) => (
          <ChatMessage
            key={index}
            sender={msg.sender}
            message={msg.message}
            timestamp={msg.timestamp}
            isCurrentUser={msg.isCurrentUser}
          />
        ))
      )}
    </div>
  );
};