# Ant Design Integration Guide

## 📦 Installed Packages

```json
{
  "antd": "5.27.4",                          // Core Ant Design components
  "@ant-design/nextjs-registry": "1.1.0",   // NextJS 15 App Router integration
  "@ant-design/icons": "6.1.0"              // Icon library
}
```

## 🎨 Theme Configuration

Custom theme is configured in `/src/components/ThemeProvider.tsx` with:
- Primary color: `#1677ff` (blue)
- Custom border radius: `8px`
- Geist font integration
- Component-specific styling for Button, Card, Input, etc.

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ThemeProvider.tsx    # Ant Design theme configuration
│   ├── AppLayout.tsx        # Main layout with navbar and footer
│   └── Navbar.tsx          # Navigation component with responsive design
├── app/
│   ├── layout.tsx          # Root layout with AntdRegistry
│   └── page.tsx            # Home page with demo components
└── ...
```

## 🚀 Usage Examples

### Basic Components
```tsx
import { Button, Card, Space, Typography } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

const { Title } = Typography;

function MyComponent() {
  return (
    <Card>
      <Title level={2}>Hello World</Title>
      <Space>
        <Button type="primary" icon={<SmileOutlined />}>
          Primary Button
        </Button>
        <Button>Default Button</Button>
      </Space>
    </Card>
  );
}
```

### Layout Components
```tsx
import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;

function MyLayout({ children }) {
  return (
    <Layout>
      <Header>
        <Menu mode="horizontal" />
      </Header>
      <Content>{children}</Content>
      <Footer>Footer Content</Footer>
    </Layout>
  );
}
```

### Form Components
```tsx
import { Form, Input, Button, Select } from 'antd';

function MyForm() {
  return (
    <Form layout="vertical">
      <Form.Item label="Name" name="name" rules={[{ required: true }]}>
        <Input placeholder="Enter your name" />
      </Form.Item>
      <Form.Item label="Level" name="level">
        <Select>
          <Select.Option value="beginner">Beginner</Select.Option>
          <Select.Option value="intermediate">Intermediate</Select.Option>
          <Select.Option value="advanced">Advanced</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
}
```

## 📱 Responsive Design

### Using Ant Design Grid System
```tsx
import { Row, Col } from 'antd';

function ResponsiveGrid() {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card>Card 1</Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card>Card 2</Card>
      </Col>
    </Row>
  );
}
```

### Combining with Tailwind CSS
```tsx
// Use Tailwind classes for responsive design
<Button className="hidden md:block">
  Desktop Only Button
</Button>

<Button className="block md:hidden">
  Mobile Only Button
</Button>
```

## 🎯 Best Practices

### 1. Use 'use client' directive for interactive components
```tsx
'use client';
import { useState } from 'react';
import { Button, Modal } from 'antd';

function InteractiveComponent() {
  const [visible, setVisible] = useState(false);
  // ... component logic
}
```

### 2. Import only needed components
```tsx
// ✅ Good - Tree shaking friendly
import { Button, Card } from 'antd';

// ❌ Avoid - Imports entire library
import * as antd from 'antd';
```

### 3. Use TypeScript interfaces
```tsx
import type { ButtonProps, CardProps } from 'antd';

interface MyButtonProps extends ButtonProps {
  customProp?: string;
}
```

## 🎨 Theme Customization

### Updating Theme Colors
Edit `/src/components/ThemeProvider.tsx`:
```tsx
const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: '#your-primary-color',
    colorSuccess: '#your-success-color',
    // ... other tokens
  },
};
```

### Component-specific Styling
```tsx
components: {
  Button: {
    borderRadius: 8,
    controlHeight: 40,
  },
  Card: {
    borderRadius: 12,
    paddingLG: 24,
  },
},
```

## 📚 Useful Components for English Learning App

### Educational Components
- `Steps` - Learning progress
- `Progress` - Lesson completion
- `Badge` - Achievements
- `Statistic` - Learning stats
- `Timeline` - Learning history
- `Card` - Lesson cards
- `Collapse` - FAQ sections
- `Tabs` - Different lesson types

### Interactive Components
- `Form` - User input/quizzes
- `Modal` - Lesson dialogs
- `Drawer` - Side navigation
- `Tooltip` - Help text
- `Popover` - Additional info
- `Rate` - Lesson ratings
- `Slider` - Difficulty levels

### Data Display
- `Table` - Progress tracking
- `List` - Lesson lists
- `Calendar` - Study schedule
- `Tag` - Skill labels
- `Avatar` - User profiles

## 🌐 Server URLs

- **Frontend (NextJS)**: http://localhost:3001
- **Demo Page**: Visit the home page to see all Ant Design components in action

## 🔧 Troubleshooting

### Common Issues

1. **SSR Hydration Errors**: Make sure to use `'use client'` for interactive components
2. **Style Conflicts**: Ant Design CSS is properly isolated with AntdRegistry
3. **Icon Not Found**: Import icons from `@ant-design/icons`
4. **Theme Not Applied**: Check ThemeProvider is wrapping your app correctly

### Performance Tips

- Use dynamic imports for large components
- Leverage Ant Design's built-in lazy loading
- Optimize bundle size with proper tree shaking
- Use CSS-in-JS sparingly for better performance

## 📖 Resources

- [Ant Design Documentation](https://ant.design/)
- [Ant Design NextJS Integration](https://ant.design/docs/react/use-with-next)
- [Ant Design Icons](https://ant.design/components/icon)
- [Theme Customization](https://ant.design/docs/react/customize-theme)

---

Happy coding with Ant Design! 🎉