import React, { useMemo } from 'react';
import { useMediaQuery } from '../design-system/hooks/useMediaQuery';

const ROWS = 32;
const COLS = 32;

const NothingDotClock = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // Responsive constants
  // Target content size ~130px (Desktop) to match NothingWordClock
  // 32 * 3px + 31 * 1px = 96 + 31 = 127px
  const CELL_SIZE = isMobile ? '1.5px' : '3px';
  const GAP_SIZE = isMobile ? '0.5px' : '1px';
  const PADDING_SIZE = isMobile ? '8px' : '16px';
  
  // Generate grid data with circular mask and soft edges
  const gridData = useMemo(() => {
    let grid = [];
    const center = (ROWS - 1) / 2;
    // Radius slightly larger to fill corners better, but strictly controlled
    const radius = center; 

    for (let r = 0; r < ROWS; r++) {
      let row = [];
      for (let c = 0; c < COLS; c++) {
        // Calculate distance from center
        const distance = Math.sqrt(Math.pow(r - center, 2) + Math.pow(c - center, 2));
        
        // Edge smoothing logic
        let opacity = 0;
        let isVisible = false;

        if (distance <= radius - 0.5) {
          // Fully inside
          opacity = 1;
          isVisible = true;
        } else if (distance <= radius + 0.5) {
          // Edge: Anti-aliasing fade
          // 1.0 at radius-0.5, 0.0 at radius+0.5
          opacity = 1 - (distance - (radius - 0.5));
          isVisible = true;
        }

        row.push({ 
          active: false,
          isVisible,
          opacity: Math.max(0, Math.min(1, opacity)) // Clamp between 0 and 1
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
                backgroundColor: cell.isVisible ? `rgba(51, 51, 51, ${cell.opacity})` : 'transparent', // #333333 is 51,51,51
                width: CELL_SIZE,
                height: CELL_SIZE,
                borderRadius: '0.5px', // Tiny rounding for smooth square look
                opacity: cell.isVisible ? 1 : 0,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default NothingDotClock;
