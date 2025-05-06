import { Card, Typography } from 'antd';
import { format } from 'date-fns';

interface ChatMessageProps {
  sender: string;
  message: string;
  timestamp: Date;
  isCurrentUser: boolean;
}

export const ChatMessage = ({ sender, message, timestamp, isCurrentUser }: ChatMessageProps) => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
      marginBottom: 8
    }}>
      <Card
        bordered={false}
        style={{
          maxWidth: '80%',
          backgroundColor: isCurrentUser ? '#1890ff' : '#f0f0f0',
          color: isCurrentUser ? 'white' : 'inherit',
          borderRadius: isCurrentUser ? '18px 18px 0 18px' : '18px 18px 18px 0'
        }}
        bodyStyle={{ padding: '8px 12px' }}
      >
        <Typography.Text strong style={{ color: isCurrentUser ? 'white' : 'inherit' }}>
          {sender}
        </Typography.Text>
        <Typography.Paragraph style={{ marginBottom: 0, color: isCurrentUser ? 'white' : 'inherit' }}>
          {message}
        </Typography.Paragraph>
        <Typography.Text 
          type="secondary" 
          style={{ 
            fontSize: 12, 
            color: isCurrentUser ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.45)' 
          }}
        >
          {format(timestamp, 'HH:mm')}
        </Typography.Text>
      </Card>
    </div>
  );
};