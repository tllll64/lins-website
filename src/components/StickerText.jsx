import React from 'react';
import { colors, typography } from '../design-system/tokens';

export const StickerText = ({ 
    children, 
    color = colors.azure[48],
    strokeColor = colors.white.solid,
    strokeWidth = '8px',
    fontSize = '64px',
    shadowColor = 'rgba(0, 0, 0, 0.1)',
    style = {}
}) => {
    // Extract numeric values for calculations
    const sizeVal = parseInt(fontSize) || 64;
    const strokeVal = parseInt(strokeWidth) || 8;
    
    // Ensure sufficient height for the stroke
    const height = sizeVal + strokeVal * 2.5;

    return (
        <svg 
            width="100%" 
            height={height}
            style={{ 
                overflow: 'visible',
                display: 'block',
                margin: '0 auto',
                pointerEvents: 'none', // Allow clicks to pass through if needed
                ...style 
            }}
            xmlns="http://www.w3.org/2000/svg"
        >
            <text
                x="50%"
                y="50%"
                dominantBaseline="central"
                textAnchor="middle"
                style={{
                    fill: color,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    fontFamily: typography.heading1?.fontFamily || 'sans-serif',
                    fontWeight: 900,
                    fontSize: fontSize,
                    // Key properties for rounded corners
                    strokeLinejoin: 'round',
                    strokeLinecap: 'round',
                    // Paint stroke first, then fill on top
                    paintOrder: 'stroke',
                    // Apply shadow
                    filter: `drop-shadow(0 2px 1px ${shadowColor})`,
                    // Inherit other styles like letterSpacing
                    ...style
                }}
            >
                {children}
            </text>
        </svg>
    );
};
