import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useMediaQuery } from '../design-system/hooks/useMediaQuery';

const ROWS = 8;
const COLS = 8;

// Generate random letter
const getRandomChar = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return chars.charAt(Math.floor(Math.random() * chars.length));
};

const NothingWordClock = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // Responsive constants
  // Adjusted to maintain similar total size with 8x8 grid instead of 10x10
  const CELL_SIZE = isMobile ? '6.5px' : '10.5px';
  const GAP_SIZE = isMobile ? '2.5px' : '6.5px';
  const PADDING_SIZE = isMobile ? '8px' : '16px';
  const FONT_SIZE = isMobile ? '5px' : '8px';
  const BORDER_RADIUS = isMobile ? '10px' : '16px';

  // Generate grid data
  const gridData = useMemo(() => {
    // Initialize empty grid
    let grid = [];
    for (let r = 0; r < ROWS; r++) {
      let row = [];
      for (let c = 0; c < COLS; c++) {
        row.push({ char: getRandomChar(), isTarget: false });
      }
      grid.push(row);
    }

    // Place target words scattered vertically
    const words = [
      { text: "THIS", row: 1 },
      { text: "IS", row: 3, forceCol: 1 }, // Left side
      { text: "MY", row: 5, forceCol: 5 }, // Right side offset
      { text: "WEBSITE", row: 7 }
    ];

    words.forEach(({ text, row, forceCol }) => {
        // Use forced column if provided, otherwise random valid column
        let startCol;
        if (forceCol !== undefined) {
            startCol = forceCol;
        } else {
            const maxStart = COLS - text.length;
            startCol = Math.floor(Math.random() * (maxStart + 1));
        }
        
        for (let i = 0; i < text.length; i++) {
            if (row < ROWS && (startCol + i) < COLS) {
                grid[row][startCol + i] = { char: text[i], isTarget: true };
            }
        }
    });

    // Add Gemini-style 4-pointed star at top-left (0,0)
    grid[0][0] = {
      char: (
        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '80%', height: '80%', display: 'block' }}>
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
      ),
      isTarget: true
    };

    return grid;
  }, []);

  return (
    <div style={{
      position: 'relative',
      backgroundColor: '#121212',
      borderRadius: BORDER_RADIUS,
      padding: PADDING_SIZE,
      overflow: 'hidden',
      display: 'inline-flex',
      flexDirection: 'column',
      gap: GAP_SIZE, // Vertical gap between rows
      boxShadow: '0 2px 1px rgba(0, 0, 0, 0.15)',
      fontFamily: '"Inter", "Roboto Mono", monospace',
      userSelect: 'none',
      width: 'fit-content',
      maxWidth: '100%',
      margin: '0 auto' // Center in container
    }}>
      {/* Grid */}
      {gridData.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex', gap: GAP_SIZE, justifyContent: 'center' }}>
          {row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="matrix-char"
              style={{
                color: cell.isTarget ? '#FFFFFF' : '#333333',
                textShadow: cell.isTarget ? '0 0 8px rgba(255, 255, 255, 0.4)' : 'none',
                fontSize: FONT_SIZE,
                fontWeight: '600',
                width: CELL_SIZE,
                height: CELL_SIZE,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color 0.2s ease, text-shadow 0.2s ease',
                zIndex: 2,
                position: 'relative',
                opacity: cell.isTarget ? 1 : 0.4 // Lower opacity for non-target
              }}
            >
              {cell.char}
            </div>
          ))}
        </div>
      ))}

      {/* Scanning Beam */}
      <motion.div
        initial={{ x: '-150%' }} // Start further left
        animate={{ x: '300%' }} // Move further right
        transition={{
          repeat: Infinity,
          repeatDelay: 15, // 15 seconds delay
          duration: 2.5, // Slower scan
          ease: "linear"
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '200px', // Wider beam
          height: '100%',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)',
          zIndex: 3,
          pointerEvents: 'none',
          mixBlendMode: 'screen' // Brightens everything
        }}
      />
      
    </div>
  );
};

export default NothingWordClock;
