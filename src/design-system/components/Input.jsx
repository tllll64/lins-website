import React, { forwardRef } from 'react';
import { colors, typography, spacing } from '../tokens';

export const Input = forwardRef(({
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  error = false,
  errorMessage,
  label,
  className = '',
  ...props
}, ref) => {
  const inputStyles = {
    width: '100%',
    padding: `${spacing[12]} ${spacing[16]}`,
    fontFamily: typography.body.fontFamily,
    fontSize: typography.body.fontSize,
    fontWeight: typography.body.fontWeight,
    lineHeight: typography.body.lineHeight,
    color: colors.black.solid,
    background: colors.white.solid,
    border: `1px solid ${error ? colors.red[59] : colors.grey[92]}`,
    borderRadius: '6px',
    outline: 'none',
    transition: 'all 0.2s ease',
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'text',
  };

  const labelStyles = {
    display: 'block',
    marginBottom: spacing[8],
    fontFamily: typography.body.fontFamily,
    fontSize: typography.body.fontSize,
    fontWeight: typography.medium,
    color: colors.grey[9],
  };

  const errorStyles = {
    marginTop: spacing[6],
    fontFamily: typography.body.fontFamily,
    fontSize: '12px',
    color: colors.red[59],
  };

  return (
    <div className={className}>
      {label && <label style={labelStyles}>{label}</label>}
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        style={inputStyles}
        onFocus={(e) => {
          if (!disabled && !error) {
            e.currentTarget.style.borderColor = colors.azure[48];
            e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.azure[48]}20`;
          }
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = error ? colors.red[59] : colors.grey[92];
          e.currentTarget.style.boxShadow = 'none';
        }}
        {...props}
      />
      {error && errorMessage && (
        <div style={errorStyles}>{errorMessage}</div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
