import { Button, Input } from 'antd';
import { H2 } from '../atoms/Title';

const { TextArea } = Input;

interface SummaryActionProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onPaste: (e: React.ClipboardEvent) => void;
}

export const SummaryAction = ({ 
  value, 
  onChange, 
  onSubmit, 
  onPaste 
}: SummaryActionProps) => (
  <div>
    <H2>1. Mage Writer</H2>
    <p>Enter or paste your text and press summarize</p>
    <TextArea 
      rows={6} 
      placeholder="Paste your chat text here (e.g. [11.12, 28/4/2025] Sender: Message)..." 
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onPaste={onPaste}
    />
    <div style={{ marginTop: 16 }}>
      <Button type="primary" size="large" onClick={onSubmit}>
        {value.match(/\[\d+\.\d+, \d+\/\d+\/\d+\]/) ? 'Parse Chat' : 'Summarize'}
      </Button>
    </div>
  </div>
);