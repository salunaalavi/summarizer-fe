import { Typography } from 'antd';

const { Title } = Typography;

export const H1 = ({ children }: { children: React.ReactNode }) => (
  <Title level={1} style={{ marginBottom: 16 }}>
    {children}
  </Title>
);

export const H2 = ({ children }: { children: React.ReactNode }) => (
  <Title level={2} style={{ marginBottom: 8 }}>
    {children}
  </Title>
);