import React from 'react';
import { colors, typography } from '../design-system/tokens';

export const StickerText = ({ 
    children, 
    as: Component = 'h1',
    color = colors.azure[48], // Default to brand blue
    strokeColor = colors.white.solid,
    strokeWidth = '8px',
    fontSize = '64px',
    shadowColor = 'rgba(0, 0, 0, 0.15)',
    style = {}
}) => {
    const stickerStyle = {
        fontFamily: typography.heading1?.fontFamily || 'sans-serif',
        fontWeight: 900,
        fontSize: fontSize,
        color: color,
        // The core sticker effect
        WebkitTextStroke: `${strokeWidth} ${strokeColor}`,
        paintOrder: 'stroke fill',
        // Shadow for the sticker shape
        filter: `drop-shadow(0 2px 4px ${shadowColor})`,
        // Reset margin
        margin: 0,
        // Ensure it's inline-block or similar if needed, but block is fine for h1
        lineHeight: 1.1,
        ...style
    };

    return (
        <Component style={stickerStyle}>
            {children}
        </Component>
    );
};
