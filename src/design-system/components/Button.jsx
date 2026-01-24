import React from 'react';
import { colors, typography } from '../tokens';

export const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  className = '',
  type = 'button',
  ...props
}) => {
  const variants = {
    primary: {
      background: colors.black.solid,
      color: colors.white.solid,
      border: 'none',
      hover: {
        background: colors.grey[9],
      },
    },
    secondary: {
      background: colors.white.solid,
      color: colors.black.solid,
      border: `1px solid ${colors.grey[92]}`,
      hover: {
        background: colors.grey[98],
      },
    },
    outline: {
      background: 'transparent',
      color: colors.black.solid,
      border: `1px solid ${colors.grey[66]}`,
      hover: {
        background: colors.grey[98],
      },
    },
  };

  const sizes = {
    small: {
      padding: '8px 16px',
      fontSize: typography.body.fontSize,
      height: '34px',
    },
    medium: {
      padding: '12px 20px',
      fontSize: typography.body.fontSize,
      height: '40px',
    },
    large: {
      padding: '16px 24px',
      fontSize: '16px',
      height: '48px',
    },
  };

  const variantStyle = variants[variant] || variants.primary;
  const sizeStyle = sizes[size] || sizes.medium;

  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: typography.button.fontFamily,
    fontWeight: typography.button.fontWeight,
    borderRadius: '6px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    opacity: disabled ? 0.5 : 1,
    outline: 'none',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    ...variantStyle,
    ...sizeStyle,
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={className}
      style={baseStyles}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.background = variantStyle.hover.background;
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.background = variantStyle.background;
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
