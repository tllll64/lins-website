import React from 'react';

const PixelEye = ({ size = 6, gap = 2, color = '#e5e5e5', highlightColor = '#808080' }) => {
    // 24x24 grid
    const rows = 24;
    const cols = 24;
    
    // Helper to create empty grid
    const createGrid = () => Array(rows).fill().map(() => Array(cols).fill(0));
    
    const eyePattern = createGrid();

    // Define shapes
    // Left Eye (Open - Looking Left)
    // Ring: x=5..10, y=7..15
    // Pupil: x=6..7, y=10..12
    const leftEye = [
        {r: 7, c: [6,7,8,9]},           // Top
        {r: 15, c: [6,7,8,9]},          // Bottom
        {r: 8, c: [5,10]},              // Sides
        {r: 9, c: [5,10]},
        {r: 10, c: [5,6,7,10]},         // Pupil starts
        {r: 11, c: [5,6,7,10]},
        {r: 12, c: [5,6,7,10]},         // Pupil ends
        {r: 13, c: [5,10]},
        {r: 14, c: [5,10]},
    ];

    // Right Eye (Open - Looking Left)
    // Ring: x=13..18, y=7..15
    // Pupil: x=14..15, y=10..12
    const rightEye = [
        {r: 7, c: [14,15,16,17]},       // Top
        {r: 15, c: [14,15,16,17]},      // Bottom
        {r: 8, c: [13,18]},             // Sides
        {r: 9, c: [13,18]},
        {r: 10, c: [13,14,15,18]},      // Pupil starts
        {r: 11, c: [13,14,15,18]},
        {r: 12, c: [13,14,15,18]},      // Pupil ends
        {r: 13, c: [13,18]},
        {r: 14, c: [13,18]},
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
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
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
                        width: '100%',
                        height: '100%',
                        backgroundColor: isActive ? highlightColor : color,
                        opacity: isActive ? 1 : 0.5,
                        borderRadius: '0px' // Square pixels
                    }}
                />
            ))}
        </div>
    );
};

export default PixelEye;
