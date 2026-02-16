import React from 'react';

const PixelLock = ({ size = 6, gap = 2, color = '#e5e5e5', highlightColor = '#808080' }) => {
    // 24x24 grid
    const rows = 24;
    const cols = 24;

    // Helper to create empty grid
    const createGrid = () => Array(rows).fill().map(() => Array(cols).fill(0));

    const lockPattern = createGrid();

    // Define lock shape - classic padlock with smooth rounded shackle (reference: 🔒)
    // Shackle: smooth U-shape with rounded top
    const shackleOuter = [
        {r: 6, c: [10, 11, 12, 13]},                            // Top arc (4 dots forming curve)
        {r: 7, c: [9, 14]},                                     // Round corner transition
        {r: 8, c: [8, 15]},                                      // Upper sides
        {r: 9, c: [7, 16]},                                      // Middle sides
        {r: 10, c: [7, 16]},                                     // Lower sides
        {r: 11, c: [7, 16]},                                     // Bottom (connects to body)
    ];

    // Lock body (rectangular bottom part) - hollow style
    const lockBody = [
        {r: 11, c: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]},  // Top edge
        {r: 12, c: [5, 18]},                          // Upper sides
        {r: 13, c: [5, 18]},                          // Sides
        {r: 14, c: [5, 18]},                          // Sides
        {r: 15, c: [5, 18]},                          // Sides
        {r: 16, c: [5, 18]},                          // Sides
        {r: 17, c: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]},  // Bottom edge
    ];

    // Keyhole (2x3 pattern) - centered in lock body
    const keyhole = [
        {r: 13, c: [11, 12]},                         // Top row
        {r: 14, c: [11, 12]},                         // Middle row
        {r: 15, c: [11, 12]},                         // Bottom row
    ];

    // Apply shapes to grid
    shackleOuter.forEach(({r, c}) => {
        c.forEach(col => {
            if (r >= 0 && r < rows && col >= 0 && col < cols) {
                lockPattern[r][col] = 1;
            }
        });
    });

    lockBody.forEach(({r, c}) => {
        c.forEach(col => {
            if (r >= 0 && r < rows && col >= 0 && col < cols) {
                lockPattern[r][col] = 1;
            }
        });
    });

    keyhole.forEach(({r, c}) => {
        c.forEach(col => {
            if (r >= 0 && r < rows && col >= 0 && col < cols) {
                lockPattern[r][col] = 1;
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
            {lockPattern.flat().map((isActive, index) => (
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

export default PixelLock;
