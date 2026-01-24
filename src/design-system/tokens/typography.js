// Design tokens - Typography (Claude-inspired)
// Headings: Serif (Tiempos Text style) - Lora as free alternative
// Body: Sans-serif (Inter)
// Code: Mono (JetBrains Mono)

// === Font Families ===
export const fontFamily = {
  // Display font for headings (Tiempos Text alternative)
  display: 'Lora, "Times New Roman", Georgia, serif',

  // Body font for UI and content
  body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',

  // Monospace font for code
  mono: 'JetBrains Mono, "Fira Code", Consolas, Monaco, "Courier New", monospace',

  // Legacy aliases
  primary: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  secondary: 'Lora, Georgia, serif',
  font1: 'Inter',
  font2: 'Lora',
};

// === Font Sizes ===
export const fontSize = {
  // Base sizes
  10: '10px',
  11: '11px',
  12: '12px',
  14: '14px',
  16: '16px',
  18: '18px',
  20: '20px',
  24: '24px',
  28: '28px',
  32: '32px',
  40: '40px',
  48: '48px',
  56: '56px',
  64: '64px',
  72: '72px',

  // Semantic sizes
  xs: '12px',
  sm: '14px',
  base: '16px',
  lg: '18px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '32px',
  '4xl': '40px',
  '5xl': '48px',
  '6xl': '64px',
};

// === Font Weights ===
export const fontWeight = {
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',

  // Numeric aliases
  300: '300',
  400: '400',
  500: '500',
  600: '600',
  700: '700',
};

// === Line Heights ===
export const lineHeight = {
  // Pixel values
  14: '14px',
  16: '16px',
  20: '20px',
  24: '24px',
  26: '26px',
  28: '28px',
  32: '32px',
  36: '36px',
  40: '40px',
  48: '48px',
  56: '56px',
  64: '64px',
  72: '72px',
  80: '80px',

  // Relative values
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',

  // Percentage
  100: '100%',
  110: '110%',
  120: '120%',
  130: '130%',
  140: '140%',
};

// === Letter Spacing ===
export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',

  // Pixel values (legacy Figma)
  '-4.32': '-0.06em',  // For very large headings
  '-2.4': '-0.03em',   // For large headings
  '-1.28': '-0.02em',  // For medium headings
  '-0.96': '-0.015em', // For small headings
  '-0.4': '-0.01em',   // For body text
  '-0.32': '-0.008em', // For small text
  0: '0',
};

// === Semantic Typography Styles ===
export const typography = {
  // === Display Headings (Serif - Tiempos Text style) ===

  display1: {
    fontFamily: fontFamily.display,
    fontSize: fontSize[72],
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight[80],
    letterSpacing: letterSpacing['-4.32'],
  },

  display2: {
    fontFamily: fontFamily.display,
    fontSize: fontSize[64],
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight[72],
    letterSpacing: letterSpacing['-2.4'],
  },

  // === Headings (Serif - Tiempos Text style) ===

  heading1: {
    fontFamily: fontFamily.display,
    fontSize: fontSize[48],
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight[56],
    letterSpacing: letterSpacing['-1.28'],
  },

  heading2: {
    fontFamily: fontFamily.display,
    fontSize: fontSize[40],
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight[48],
    letterSpacing: letterSpacing['-0.96'],
  },

  heading3: {
    fontFamily: fontFamily.display,
    fontSize: fontSize[32],
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight[40],
    letterSpacing: letterSpacing['-0.4'],
  },

  heading4: {
    fontFamily: fontFamily.display,
    fontSize: fontSize[24],
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight[32],
    letterSpacing: letterSpacing['-0.32'],
  },

  heading5: {
    fontFamily: fontFamily.display,
    fontSize: fontSize[20],
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight[28],
    letterSpacing: letterSpacing.normal,
  },

  heading6: {
    fontFamily: fontFamily.display,
    fontSize: fontSize[18],
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight[24],
    letterSpacing: letterSpacing.normal,
  },

  // === Body Text (Sans-serif - Inter) ===

  bodyLarge: {
    fontFamily: fontFamily.body,
    fontSize: fontSize[18],
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight[28],
    letterSpacing: letterSpacing.normal,
  },

  body: {
    fontFamily: fontFamily.body,
    fontSize: fontSize[16],
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight[24],
    letterSpacing: letterSpacing.normal,
  },

  bodySmall: {
    fontFamily: fontFamily.body,
    fontSize: fontSize[14],
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight[20],
    letterSpacing: letterSpacing.normal,
  },

  caption: {
    fontFamily: fontFamily.body,
    fontSize: fontSize[12],
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight[16],
    letterSpacing: letterSpacing.normal,
  },

  // === UI Elements (Sans-serif - Inter) ===

  button: {
    fontFamily: fontFamily.body,
    fontSize: fontSize[14],
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight[14],
    letterSpacing: letterSpacing.normal,
  },

  buttonLarge: {
    fontFamily: fontFamily.body,
    fontSize: fontSize[16],
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight[16],
    letterSpacing: letterSpacing.normal,
  },

  buttonSmall: {
    fontFamily: fontFamily.body,
    fontSize: fontSize[12],
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight[12],
    letterSpacing: letterSpacing.wide,
  },

  link: {
    fontFamily: fontFamily.body,
    fontSize: fontSize[14],
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight[20],
    letterSpacing: letterSpacing.normal,
  },

  label: {
    fontFamily: fontFamily.body,
    fontSize: fontSize[14],
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight[20],
    letterSpacing: letterSpacing.normal,
  },

  // === Special Text Styles ===

  code: {
    fontFamily: fontFamily.mono,
    fontSize: fontSize[14],
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight[20],
    letterSpacing: letterSpacing.normal,
  },

  strong: {
    fontFamily: fontFamily.body,
    fontSize: fontSize[16],
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight[24],
    letterSpacing: letterSpacing.normal,
  },

  quote: {
    fontFamily: fontFamily.display,
    fontSize: fontSize[20],
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight[32],
    letterSpacing: letterSpacing.normal,
    fontStyle: 'italic',
  },

  // === Legacy Styles (for backward compatibility) ===

  item: {
    fontFamily: fontFamily.body,
    fontSize: fontSize[16],
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight[24],
    letterSpacing: letterSpacing.normal,
  },

  mediumTitle: {
    fontFamily: fontFamily.body,
    fontSize: fontSize[12],
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight[20],
    letterSpacing: letterSpacing.wide,
  },
};

// === Responsive Typography ===
export const responsiveTypography = {
  hero: {
    mobile: typography.display1,
    tablet: {
      ...typography.display1,
      fontSize: fontSize[64],
      lineHeight: lineHeight[72],
    },
    desktop: {
      ...typography.display1,
      fontSize: fontSize[72],
      lineHeight: lineHeight[80],
    },
  },

  h1: {
    mobile: {
      ...typography.heading1,
      fontSize: fontSize[32],
      lineHeight: lineHeight[40],
    },
    desktop: typography.heading1,
  },

  h2: {
    mobile: {
      ...typography.heading2,
      fontSize: fontSize[28],
      lineHeight: lineHeight[36],
    },
    desktop: typography.heading2,
  },

  h3: {
    mobile: {
      ...typography.heading3,
      fontSize: fontSize[24],
      lineHeight: lineHeight[32],
    },
    desktop: typography.heading3,
  },
};

// === Utility Functions ===

/**
 * Get responsive font size
 * @param {string} size - Font size key
 * @param {boolean} isMobile - Is mobile viewport
 * @returns {string} CSS font size value
 */
export const getResponsiveFontSize = (size, isMobile) => {
  const mobileScale = 0.875; // 87.5% on mobile
  const baseSize = fontSize[size] || size;

  if (isMobile && typeof baseSize === 'string') {
    const numericValue = parseFloat(baseSize);
    return `${numericValue * mobileScale}px`;
  }

  return baseSize;
};

/**
 * Create heading style with custom overrides
 * @param {number} level - Heading level (1-6)
 * @param {object} overrides - Style overrides
 * @returns {object} Heading style object
 */
export const createHeadingStyle = (level, overrides = {}) => {
  const headingKey = `heading${level}`;
  return {
    ...typography[headingKey],
    ...overrides,
  };
};

// === Export All ===
export default typography;

// === Usage Examples ===
/*
// Import fonts in your HTML or main CSS:
@import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap');

// Usage in components:
import { typography, fontFamily } from './typography';

// Heading (Serif)
<h1 style={typography.heading1}>Beautiful Title</h1>
<h2 style={typography.heading2}>Elegant Subtitle</h2>

// Body text (Sans-serif)
<p style={typography.body}>Clean body text with Inter</p>

// Code (Monospace)
<code style={typography.code}>const example = true;</code>

// Mixed usage
<article>
  <h1 style={typography.heading1}>Serif Heading</h1>
  <p style={typography.body}>Sans-serif body for readability</p>
</article>

// Responsive
const isMobile = useMediaQuery('(max-width: 768px)');
<h1 style={isMobile ? responsiveTypography.h1.mobile : responsiveTypography.h1.desktop}>
  Responsive Heading
</h1>
*/
