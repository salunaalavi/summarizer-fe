import { Typography } from 'antd';

const { Paragraph } = Typography;

export const P = ({ children }: { children: React.ReactNode }) => (
  <Paragraph style={{ marginBottom: 24 }}>{children}</Paragraph>
);