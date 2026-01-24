// Design tokens - Spacing (Enhanced from Figma)
// Based on 8px grid system from Figma design file
// Node ID: 466:4905

// === Base Unit ===
export const BASE_UNIT = 8;

// === Core Spacing System (8px grid) ===
export const spacing = {
  // Numeric spacing (multiples of base unit)
  0: '0px',
  1: '4px',      // 0.5 × 8
  2: '8px',      // 1 × 8
  3: '12px',     // 1.5 × 8
  4: '16px',     // 2 × 8
  5: '20px',     // 2.5 × 8
  6: '24px',     // 3 × 8
  7: '28px',     // 3.5 × 8
  8: '32px',     // 4 × 8
  10: '40px',    // 5 × 8
  12: '48px',    // 6 × 8
  14: '56px',    // 7 × 8
  16: '64px',    // 8 × 8
  18: '72px',    // 9 × 8
  20: '80px',    // 10 × 8
  24: '96px',    // 12 × 8
  30: '120px',   // 15 × 8
  32: '128px',   // 16 × 8
  40: '160px',   // 20 × 8

  // Semantic spacing (most commonly used)
  xs: '8px',     // Extra small - icon to text, tight spacing
  sm: '12px',    // Small - compact elements
  md: '16px',    // Medium - standard spacing
  lg: '24px',    // Large - generous spacing
  xl: '32px',    // Extra large - section spacing
  '2xl': '48px', // 2X large - major sections
  '3xl': '64px', // 3X large - page sections
  '4xl': '96px', // 4X large - hero sections
};

// Alias for legacy support
export const itemSpacing = spacing;

// === Width System ===
export const width = {
  // Icon sizes
  icon: {
    xs: '16px',
    sm: '20px',
    md: '24px',    // Standard icon
    lg: '32px',
    xl: '40px',
  },

  // Card widths
  card: {
    xs: '240px',   // Narrow card
    sm: '280px',   // Small card
    md: '360px',   // Medium card (Figma: 360px)
    lg: '480px',   // Large card
    xl: '600px',   // Extra large card
  },

  // Container widths
  container: {
    xs: '480px',   // Mobile landscape
    sm: '640px',   // Tablet portrait
    md: '768px',   // Tablet landscape
    lg: '1024px',  // Desktop
    xl: '1200px',  // Large desktop (standard max-width)
    '2xl': '1280px', // Extra large desktop
    '3xl': '1536px', // Ultra wide
  },

  // Content widths
  prose: '720px',     // Optimal reading width (Figma: 720px)
  content: '1080px',  // Wide content (Figma: 1080px)
  full: '100%',
  screen: '100vw',

  // Legacy Figma values (for reference)
  _figma: {
    172: '172.75px',
    197: '197.03px',
    238: '238.66px',
    246: '246.66px',
    248: '248px',
    250: '250px',
    254: '254.66px',
    262: '262.17px',
    360: '360px',
    700: '700px',
    720: '720px',
    1080: '1080px',
    1920: '1920px',
  },
};

// === Height System ===
export const height = {
  // Button heights
  button: {
    xs: '28px',    // Extra small
    sm: '32px',    // Small (4 × 8)
    md: '40px',    // Medium (5 × 8)
    lg: '48px',    // Large (6 × 8)
    xl: '56px',    // Extra large (7 × 8)
  },

  // Input heights
  input: {
    sm: '32px',    // Small input
    md: '40px',    // Medium input (standard)
    lg: '48px',    // Large input
    xl: '56px',    // Extra large input
  },

  // Layout heights
  navbar: '64px',    // Navigation bar (Figma: 64px)
  header: '80px',    // Page header
  footer: '320px',   // Footer section

  // Special heights
  full: '100%',
  screen: '100vh',
  auto: 'auto',

  // Legacy Figma values
  _figma: {
    34: '34px',
    64: '64px',
    66: '66px',
  },
};

// === Border Radius System ===
export const borderRadius = {
  none: '0px',
  xs: '4px',      // 0.5 × 8 - Small elements
  sm: '6px',      // 0.75 × 8 - Buttons, inputs
  md: '8px',      // 1 × 8 - Standard cards
  lg: '12px',     // 1.5 × 8 - Large cards (recommended over Figma's 15px)
  xl: '16px',     // 2 × 8 - Extra large cards
  '2xl': '20px',  // 2.5 × 8 - Modals
  '3xl': '24px',  // 3 × 8 - Hero sections
  full: '9999px', // Circular

  // Semantic aliases
  button: '6px',
  input: '6px',
  card: '12px',
  modal: '16px',
  circle: '9999px',

  // Legacy Figma value (for reference)
  _figma: {
    15: '15px', // Original Figma value
  },
};

// Alias for legacy support
export const radius = borderRadius;

// === Border Width System ===
export const borderWidth = {
  none: '0px',
  hairline: '0.5px',  // Ultra thin (Retina displays)
  thin: '1px',        // Standard border
  medium: '1.5px',    // Medium border
  thick: '2px',       // Thick border
  heavy: '3px',       // Heavy border
  ultra: '4px',       // Ultra heavy border

  // Semantic aliases
  default: '1px',
  inputBorder: '1px',
  focus: '2px',
  divider: '1px',
  outline: '2px',

  // Legacy Figma values (for reference)
  _figma: {
    0.28: '0.277px',
    0.29: '0.291px',
    0.3: '0.305px',
    0.31: '0.305px',
    0.32: '0.318px',
    0.34: '0.341px',
    0.35: '0.346px',
    0.88: '0.875px',
    1: '1px',
    1.25: '1.25px',
    1.5: '1.5px',
    1.84: '1.844px',
    2: '2px',
    3: '3px',
    3.2: '3.2px',
    4: '4px',
  },
};

// Alias for legacy support
export const strokeWeight = borderWidth;

// === Component-Specific Spacing ===
export const componentSpacing = {
  // Button internal spacing
  button: {
    paddingX: {
      sm: spacing[3],   // 12px
      md: spacing[4],   // 16px
      lg: spacing[5],   // 20px
    },
    paddingY: {
      sm: spacing[1],   // 4px
      md: spacing[2],   // 8px
      lg: spacing[3],   // 12px
    },
    gap: spacing[2],    // Icon to text: 8px
  },

  // Input spacing
  input: {
    paddingX: spacing[3],  // 12px
    paddingY: spacing[2],  // 8px
    gap: spacing[2],       // Icon to input: 8px
  },

  // Card spacing
  card: {
    padding: {
      none: spacing[0],    // 0px
      sm: spacing[4],      // 16px
      md: spacing[6],      // 24px
      lg: spacing[8],      // 32px
      xl: spacing[10],     // 40px
    },
    gap: spacing[4],       // Content gap: 16px
  },

  // List spacing
  list: {
    gap: spacing[2],       // List item gap: 8px
    padding: spacing[3],   // List padding: 12px
  },
};

// === Layout Spacing ===
export const layoutSpacing = {
  // Page padding (responsive)
  page: {
    mobile: spacing[4],    // 16px
    tablet: spacing[6],    // 24px
    desktop: spacing[14],  // 56px
  },

  // Section spacing
  section: {
    xs: spacing[8],        // 32px - Tight sections
    sm: spacing[10],       // 40px - Small sections
    md: spacing[14],       // 56px - Standard sections
    lg: spacing[18],       // 72px - Large sections
    xl: spacing[24],       // 96px - Extra large sections
  },

  // Hero spacing
  hero: {
    top: spacing[30],      // 120px - Hero top spacing
    bottom: spacing[18],   // 72px - Hero bottom spacing
  },

  // Container padding
  container: {
    xs: spacing[4],        // 16px
    sm: spacing[6],        // 24px
    md: spacing[8],        // 32px
    lg: spacing[14],       // 56px
  },
};

// === Grid & Gap System ===
export const gridGap = {
  xs: spacing[2],   // 8px
  sm: spacing[3],   // 12px
  md: spacing[4],   // 16px
  lg: spacing[6],   // 24px
  xl: spacing[8],   // 32px
  '2xl': spacing[12], // 48px
};

// === Stack Spacing (Vertical rhythm) ===
export const stackSpacing = {
  xs: spacing[2],   // 8px - Tight stack
  sm: spacing[3],   // 12px - Small stack
  md: spacing[4],   // 16px - Medium stack
  lg: spacing[6],   // 24px - Large stack
  xl: spacing[8],   // 32px - Extra large stack
};

// === Utility Functions ===

/**
 * Get spacing value by multiplier
 * @param {number} multiplier - Multiplier of base unit (8px)
 * @returns {string} CSS spacing value
 * @example getSpacing(2) => '16px'
 */
export const getSpacing = (multiplier) => {
  return `${BASE_UNIT * multiplier}px`;
};

/**
 * Create responsive spacing
 * @param {string} mobile - Mobile spacing
 * @param {string} desktop - Desktop spacing
 * @returns {object} Responsive spacing object
 */
export const responsiveSpacing = (mobile, desktop) => {
  return {
    mobile: spacing[mobile] || mobile,
    desktop: spacing[desktop] || desktop,
  };
};

// === Export All ===
export default spacing;

// Note: All named exports are already exported above with 'export const'
// No need to re-export them here to avoid duplicate export errors

// === Usage Examples ===
/*
import { spacing, width, height, borderRadius } from './spacing';

// Basic usage
style={{ padding: spacing[4] }}              // 16px
style={{ margin: spacing.md }}               // 16px
style={{ gap: spacing.xs }}                  // 8px

// Component usage
style={{ width: width.card.md }}             // 360px
style={{ height: height.button.md }}         // 40px
style={{ borderRadius: borderRadius.card }}  // 12px

// Layout usage
style={{ padding: layoutSpacing.section.md }} // 56px
style={{ marginTop: spacing[30] }}             // 120px (Hero)

// Responsive
const padding = isMobile ? spacing[4] : spacing[14];
*/
