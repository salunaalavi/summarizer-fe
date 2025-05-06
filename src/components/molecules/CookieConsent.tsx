import { Button, Space } from 'antd';
import { P } from '@/components/atoms/Paragraph';

export const CookieConsent = () => (
  <div>
    <P>
      We use essential cookies to make Canva work. We&apos;d like to use other cookies to improve and personalize your visit, 
      tailor ads you see from us on Canva and partner sites, and to analyse our websites&apos; performance, 
      but only if you accept. Learn more about your choices in our cookie policy.
    </P>
    <Space>
      <Button type="primary">Accept all cookies</Button>
      <Button>Manage cookies</Button>
    </Space>
  </div>
);