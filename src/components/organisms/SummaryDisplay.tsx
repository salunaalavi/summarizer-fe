import { Card, Typography, Button } from 'antd';

interface SummaryDisplayProps {
  summary: string;
  onBackToChat: () => void;
}

export const SummaryDisplay = ({ summary, onBackToChat }: SummaryDisplayProps) => {
  return (
    <div>
      <Card
        title="Summary"
        style={{ marginBottom: 16 }}
        extra={
          <Button type="primary" onClick={onBackToChat}>
            Back to Chat
          </Button>
        }
      >
        <Typography.Paragraph>{summary}</Typography.Paragraph>
      </Card>
    </div>
  );
};