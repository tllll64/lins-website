import React, { useState } from 'react';
import { colors, typography, spacing } from '../tokens';

export const SegmentedControl = ({
  options = [],
  value,
  onChange,
  className = '',
  ...props
}) => {
  const [selectedValue, setSelectedValue] = useState(value || options[0]?.value);

  const handleChange = (optionValue) => {
    setSelectedValue(optionValue);
    if (onChange) {
      onChange(optionValue);
    }
  };

  const containerStyles = {
    display: 'inline-flex',
    background: colors.grey[98],
    borderRadius: '8px',
    padding: '4px',
    gap: '4px',
  };

  const optionStyles = (isSelected) => ({
    padding: `${spacing[8]} ${spacing[16]}`,
    fontFamily: typography.body.fontFamily,
    fontSize: typography.body.fontSize,
    fontWeight: isSelected ? typography.fontWeight.medium : typography.fontWeight.regular,
    color: isSelected ? colors.black.solid : colors.grey[56],
    background: isSelected ? colors.white.solid : 'transparent',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    outline: 'none',
    whiteSpace: 'nowrap',
    boxShadow: isSelected ? '0 1px 3px rgba(0, 0, 0, 0.08)' : 'none',
  });

  if (!options || options.length === 0) {
    return null;
  }

  return (
    <div className={className} style={containerStyles} {...props}>
      {options.map((option) => {
        const isSelected = selectedValue === option.value;
        return (
          <button
            key={option.value}
            onClick={() => handleChange(option.value)}
            style={optionStyles(isSelected)}
            onMouseEnter={(e) => {
              if (!isSelected) {
                e.currentTarget.style.color = colors.black.solid;
              }
            }}
            onMouseLeave={(e) => {
              if (!isSelected) {
                e.currentTarget.style.color = colors.grey[56];
              }
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default SegmentedControl;
