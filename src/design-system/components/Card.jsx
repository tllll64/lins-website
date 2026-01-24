import React from 'react';
import { colors, spacing } from '../tokens';

export const Card = ({
  children,
  variant = 'default',
  padding = 'medium',
  className = '',
  onClick,
  hoverable = false,
  ...props
}) => {
  const variants = {
    default: {
      background: colors.white.solid,
      border: `1px solid ${colors.grey[92]}`,
    },
    elevated: {
      background: colors.white.solid,
      border: 'none',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
    },
    outlined: {
      background: 'transparent',
      border: `1px solid ${colors.grey[92]}`,
    },
    filled: {
      background: colors.grey[98],
      border: 'none',
    },
    dark: {
      background: colors.black.solid,
      border: 'none',
      color: colors.white.solid,
    },
  };

  const paddings = {
    none: '0',
    small: spacing[16],
    medium: spacing[32],
    large: spacing[56],
  };

  const variantStyle = variants[variant] || variants.default;
  const paddingValue = paddings[padding] || paddings.medium;

  const baseStyles = {
    borderRadius: '12px',
    padding: paddingValue,
    transition: 'all 0.2s ease',
    cursor: onClick || hoverable ? 'pointer' : 'default',
    ...variantStyle,
  };

  const hoverStyles = hoverable || onClick ? {
    transform: 'translateY(-2px)',
    boxShadow: variant === 'elevated'
      ? '0 8px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.08)'
      : '0 4px 8px rgba(0, 0, 0, 0.08)',
  } : {};

  return (
    <div
      className={className}
      onClick={onClick}
      style={baseStyles}
      onMouseEnter={(e) => {
        if (hoverable || onClick) {
          Object.assign(e.currentTarget.style, hoverStyles);
        }
      }}
      onMouseLeave={(e) => {
        if (hoverable || onClick) {
          Object.assign(e.currentTarget.style, baseStyles);
        }
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
