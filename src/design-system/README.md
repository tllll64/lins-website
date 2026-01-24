# Lin Website Design System

A comprehensive design system built from Figma design files, featuring reusable components, design tokens, and utility hooks.

## 📁 Folder Structure

```
design-system/
├── components/           # React components
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Card.jsx
│   ├── SegmentedControl.jsx
│   └── index.js
│
├── tokens/              # Design tokens
│   ├── colors.js       # Color palette
│   ├── spacing.js      # Spacing, width, height, radius, borders
│   ├── typography.js   # Font families, sizes, weights, line heights
│   └── index.js
│
├── hooks/               # Custom React hooks
│   └── useMediaQuery.js
│
└── index.js            # Main export
```

## 🎨 Design Tokens

### Colors
Based on Vercel's design language with extended color palette:
- Grey scale (4, 7, 9, 16, 18, 40, 41, 56, 63, 66, 92, 93, 95, 98)
- Primary: Black, White
- Brand: Azure (Blue tones)
- Accents: Cyan, Red, Orange, Violet, Yellow, Spring Green

### Typography
- Primary font: Geist
- Secondary font: Georgia
- Predefined styles: heading1, heading2, heading3, heading5, body, button, link, item, strong

### Spacing
- Semantic: xs (8px), s (16px), m (32px)
- Numeric: 4, 6, 8, 12, 16, 19, 32, 36, 44, 47, 56, 59, 61, 66, 69, 121, 563

## 🧩 Components

### Button
```jsx
import { Button } from './design-system';

// Variants: primary, secondary, outline
// Sizes: small, medium, large
<Button variant="primary" size="medium">Click me</Button>
<Button variant="secondary" disabled>Disabled</Button>
```

### Input
```jsx
import { Input } from './design-system';

<Input
  label="Username"
  placeholder="Enter username"
  value={value}
  onChange={handleChange}
/>

<Input
  error={true}
  errorMessage="Invalid input"
/>
```

### Card
```jsx
import { Card } from './design-system';

// Variants: default, elevated, outlined, filled, dark
// Padding: none, small, medium, large
<Card variant="elevated" padding="medium" hoverable>
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>
```

### SegmentedControl
```jsx
import { SegmentedControl } from './design-system';

<SegmentedControl
  options={[
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
  ]}
  value={selected}
  onChange={setSelected}
/>
```

## 🔧 Hooks

### useMediaQuery
```jsx
import { useMediaQuery } from './design-system';

const isMobile = useMediaQuery('(max-width: 768px)');
const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
```

## 📦 Usage

Import components and tokens:

```jsx
// Import specific components
import { Button, Input, Card, SegmentedControl } from './design-system/components';

// Import tokens
import { colors, spacing, typography } from './design-system/tokens';

// Import hooks
import { useMediaQuery } from './design-system/hooks/useMediaQuery';

// Or import everything
import { Button, colors, useMediaQuery } from './design-system';
```

## 🎯 Preview Page

Visit `/design-system` route to see all components and design tokens in action.

```
http://localhost:5173/design-system
```

The preview page includes:
- Complete color palette showcase
- Typography examples
- Spacing visualization
- All component variants with code examples
- Interactive component demos

## 🚀 Getting Started

1. Start the development server:
```bash
npm run dev
```

2. Navigate to the design system preview:
```
http://localhost:5173/design-system
```

3. Import and use components in your pages:
```jsx
import { Button, Card } from './design-system';

function MyPage() {
  return (
    <Card variant="elevated">
      <h1>Hello World</h1>
      <Button variant="primary">Get Started</Button>
    </Card>
  );
}
```

## 🎨 Design Source

This design system is based on Figma design files from:
- File: Lin's 设计探索
- Node ID: 466:4905

All design tokens (colors, typography, spacing) are extracted directly from Figma variables to ensure design-development consistency.
