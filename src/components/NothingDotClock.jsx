import React, { useMemo } from 'react';
import { useMediaQuery } from '../design-system/hooks/useMediaQuery';

const ROWS = 32;
const COLS = 32;

const NothingDotClock = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // Responsive constants
  // Increased cell size by 1.1x as requested
  // Mobile: 1.5 * 1.1 = 1.65px
  // Desktop: 3 * 1.1 = 3.3px
  const CELL_SIZE = isMobile ? '1.65px' : '3.3px';
  const GAP_SIZE = isMobile ? '0.5px' : '1px';
  
  // Reduced padding by 0.7x (maintained from previous step)
  const PADDING_SIZE = isMobile ? '5.5px' : '11px';
  
  // Generate grid data with hard circular mask (no fading)
  const gridData = useMemo(() => {
    let grid = [];
    const center = (ROWS - 1) / 2;
    // Radius set to maximize the circle within the grid without losing shape
    const radius = center + 0.2; 

    for (let r = 0; r < ROWS; r++) {
      let row = [];
      for (let c = 0; c < COLS; c++) {
        // Calculate distance from center
        const distance = Math.sqrt(Math.pow(r - center, 2) + Math.pow(c - center, 2));
        
        // Hard cut-off for visibility
        const isVisible = distance <= radius;

        row.push({ 
          active: false,
          isVisible
        });
      }
      grid.push(row);
    }
    return grid;
  }, []);

  return (
    <div style={{
      position: 'relative',
      backgroundColor: '#000000',
      borderRadius: '50%', // Circular container
      padding: PADDING_SIZE,
      overflow: 'hidden',
      display: 'inline-flex',
      flexDirection: 'column',
      gap: GAP_SIZE,
      boxShadow: '0 2px 1px rgba(0, 0, 0, 0.15)',
      userSelect: 'none',
      width: 'fit-content',
      height: 'fit-content',
      margin: '0 auto',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Grid */}
      {gridData.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex', gap: GAP_SIZE, justifyContent: 'center' }}>
          {row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={{
                backgroundColor: cell.isVisible ? '#333333' : 'transparent',
                width: CELL_SIZE,
                height: CELL_SIZE,
                borderRadius: '0.5px', // Tiny rounding for smooth square look
                opacity: cell.isVisible ? 0.5 : 0, // Reduced opacity to 0.5x as requested
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default NothingDotClock;
