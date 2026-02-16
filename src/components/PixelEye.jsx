import React from 'react';

const PixelEye = ({ size = 8, gap = 2, color = '#e5e5e5', highlightColor = '#808080' }) => {
    // 24x24 grid for higher resolution
    const rows = 24;
    const cols = 24;
    
    // Helper to create empty grid
    const createGrid = () => Array(rows).fill().map(() => Array(cols).fill(0));
    
    const eyePattern = createGrid();

    // Define shapes
    // Left Eye (C shape, opening right)
    // Position: x=5 to 10, y=7 to 15
    const leftEye = [
        {r: 7, c: [6,7,8,9]},       // Top curve
        {r: 8, c: [5,6,7,8,9,10]},  // Top full
        {r: 9, c: [5,6,9,10]},      // Upper sides
        {r: 10, c: [5,6]},          // Left side
        {r: 11, c: [5,6]},          // Left side
        {r: 12, c: [5,6]},          // Left side
        {r: 13, c: [5,6,9,10]},     // Lower sides
        {r: 14, c: [5,6,7,8,9,10]}, // Bottom full
        {r: 15, c: [6,7,8,9]}       // Bottom curve
    ];

    // Right Eye (Reverse C shape, opening left)
    // Position: x=13 to 18, y=7 to 15
    const rightEye = [
        {r: 7, c: [14,15,16,17]},      // Top curve
        {r: 8, c: [13,14,15,16,17,18]},// Top full
        {r: 9, c: [13,14,17,18]},      // Upper sides
        {r: 10, c: [17,18]},           // Right side
        {r: 11, c: [17,18]},           // Right side
        {r: 12, c: [17,18]},           // Right side
        {r: 13, c: [13,14,17,18]},     // Lower sides
        {r: 14, c: [13,14,15,16,17,18]},// Bottom full
        {r: 15, c: [14,15,16,17]}      // Bottom curve
    ];

    // Apply shapes to grid
    leftEye.forEach(({r, c}) => {
        c.forEach(col => {
            if (r >= 0 && r < rows && col >= 0 && col < cols) {
                eyePattern[r][col] = 1;
            }
        });
    });
    rightEye.forEach(({r, c}) => {
        c.forEach(col => {
            if (r >= 0 && r < rows && col >= 0 && col < cols) {
                eyePattern[r][col] = 1;
            }
        });
    });

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${cols}, ${size}px)`,
            gridTemplateRows: `repeat(${rows}, ${size}px)`,
            gap: `${gap}px`,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%'
        }}>
            {eyePattern.flat().map((isActive, index) => (
                <div
                    key={index}
                    style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        backgroundColor: isActive ? highlightColor : 'transparent',
                        opacity: 1, 
                        borderRadius: '0px' // Square pixels
                    }}
                />
            ))}
        </div>
    );
};

export default PixelEye;
