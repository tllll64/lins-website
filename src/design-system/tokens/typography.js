// Design tokens - Typography
// Based on Figma design system

export const fontFamily = {
  primary: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  secondary: 'Georgia, serif',
  font1: 'Inter',
  font2: 'Georgia',
};

export const fontSize = {
  11: '11px',
  14: '14px',
  20: '20px',
  24: '24px',
  40: '40px',
  72: '72px',
};

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  400: '400',
  500: '500',
  600: '600',
};

export const lineHeight = {
  14: '14px',
  20: '20px',
  26: '26px',
  36: '36px',
  48: '48px',
  83.52: '83.52px',
  100: '100%',
};

export const letterSpacing = {
  '-4.32': '-4.32px',
  '-2.4': '-2.4px',
  '-1.28': '-1.28px',
  '-0.96': '-0.96px',
  '-0.4': '-0.4px',
  '-0.32': '-0.32px',
  0: '0',
};

// Semantic typography styles
export const typography = {
  heading1: {
    fontFamily: fontFamily.primary,
    fontSize: fontSize[72],
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight[83.52],
    letterSpacing: letterSpacing['-4.32'],
  },

  heading2: {
    fontFamily: fontFamily.primary,
    fontSize: fontSize[14],
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight[100],
    letterSpacing: letterSpacing[0],
  },

  heading3: {
    fontFamily: fontFamily.primary,
    fontSize: fontSize[20],
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight[26],
    letterSpacing: letterSpacing['-0.4'],
  },

  heading5: {
    fontFamily: fontFamily.primary,
    fontSize: fontSize[14],
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight[20],
    letterSpacing: letterSpacing[0],
  },

  body: {
    fontFamily: fontFamily.primary,
    fontSize: fontSize[14],
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight[20],
    letterSpacing: letterSpacing['-0.32'],
  },

  button: {
    fontFamily: fontFamily.primary,
    fontSize: fontSize[14],
    fontWeight: fontWeight.regular,
    lineHeight: fontSize[14],
    letterSpacing: letterSpacing[0],
  },

  link: {
    fontFamily: fontFamily.primary,
    fontSize: fontSize[14],
    fontWeight: fontWeight.regular,
    lineHeight: fontSize[14],
    letterSpacing: letterSpacing[0],
  },

  item: {
    fontFamily: fontFamily.primary,
    fontSize: '16px',
    fontWeight: fontWeight.regular,
    lineHeight: fontSize[24],
    letterSpacing: letterSpacing[0],
  },

  strong: {
    fontFamily: fontFamily.primary,
    fontSize: '16px',
    fontWeight: fontWeight.semibold,
    lineHeight: fontSize[24],
    letterSpacing: letterSpacing['-0.32'],
  },

  mediumTitle: {
    fontFamily: fontFamily.primary,
    fontSize: '12px',
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight[20],
    letterSpacing: letterSpacing[0],
  },
};

export default typography;
