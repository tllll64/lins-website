import React, { useMemo, useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
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
  const controls = useAnimation();
  const [wordSetIndex, setWordSetIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  // Responsive constants
  // Adjusted for 8x8 grid to match NothingDotClock width (~158px desktop, ~79px mobile)
  const CELL_SIZE = isMobile ? '6.2px' : '11.5px';
  const GAP_SIZE = isMobile ? '2px' : '5px';
  const PADDING_SIZE = isMobile ? '8px' : '16px';
  const FONT_SIZE = isMobile ? '4.5px' : '9.5px';
  const BORDER_RADIUS = isMobile ? '10px' : '16px';

  // Animation sequence
  useEffect(() => {
    const sequence = async () => {
      // Start scanning
      const animationPromise = controls.start({
        x: ['-150%', '300%'],
        transition: { duration: 2.5, ease: "linear" }
      });

      // Change word halfway through the scan (1.25s)
      const timeoutId = setTimeout(() => {
        setWordSetIndex((prev) => (prev + 1) % 3);
      }, 1250);

      await animationPromise;
      
      // Wait before next scan
      await new Promise(resolve => setTimeout(resolve, 3500)); // 6s total cycle approx
      
      // Loop
      sequence();
    };

    sequence();

    return () => controls.stop();
  }, [controls]);

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

    // Define word sets for 8x8 grid
    // Constraint: Start from Row 3 (index 2), avoid last row (index 7)
    // Available Rows: 2, 3, 4, 5, 6
    const wordSets = [
      // Set 0: CURIO SITY DRIVEN
      [
        { text: "CURIO", row: 2, col: 0 },     // Row 3, Left (5 chars -> cols 0-4)
        { text: "SITY", row: 3, col: 4 },      // Row 4, Right (4 chars -> cols 4-7)
        { text: "DRIVEN", row: 6, col: 2 }     // Row 7 (Index 6), Centered (6 chars -> cols 2-7)
      ],
      // Set 1: HANDS ON
      [
        { text: "HANDS", row: 3, col: 0 },     // Row 4 (5 chars)
        { text: "ON", row: 6, col: 6 }         // Row 7 (Index 6), Bottom Right
      ],
      // Set 2: TECH FOR ALL
      [
        { text: "TECH", row: 2, col: 0 },      // Row 3 (4 chars)
        { text: "FOR", row: 4, col: 3 },       // Row 5, Middle (3 chars)
        { text: "ALL", row: 6, col: 5 }        // Row 7 (Index 6), Right (3 chars)
      ]
    ];

    const currentWords = wordSets[wordSetIndex];

    currentWords.forEach(({ text, row, col }) => {
        for (let i = 0; i < text.length; i++) {
            if (row < ROWS && (col + i) < COLS) {
                grid[row][col + i] = { char: text[i], isTarget: true };
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
  }, [wordSetIndex]);

  return (
    <div 
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
        {/* Custom Annotation (Arrow + Text) */}
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 20,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease-out',
        }}>
            <svg style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                overflow: 'visible',
                pointerEvents: 'none'
            }}>
                <defs>
                    <marker id="forkedArrowClock" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
                        <path d="M 0 2 L 10 6 L 0 10" fill="none" stroke="#000" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </marker>
                </defs>
                <path 
                    d="M 22 38 Q -65 10 -12 -30" 
                    fill="none" 
                    stroke="#000" 
                    strokeWidth="1.2" 
                    strokeLinecap="round"
                    markerEnd="url(#forkedArrowClock)"
                    style={{
                        transition: 'd 0.3s ease-out'
                    }}
                />
            </svg>
            
            <div style={{
                position: 'absolute',
                top: '-45px',
                left: '50%',
                transform: 'translateX(-50%)', 
                width: 'max-content',
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
                color: '#000',
                fontWeight: 'normal',
                pointerEvents: 'none'
            }}>
                Human-AI Sandbox
            </div>
        </div>

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
            <motion.div
              key={`${rowIndex}-${colIndex}`}
              initial={false}
              animate={cell.isTarget ? "active" : "inactive"}
               variants={{
                 active: {
                   color: '#FFFFFF',
                   textShadow: 'none', // Removed glow effect as requested
                   opacity: 1,
                   scale: 1.05,
                   transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] } // Spring-like ease
                 },
                 inactive: {
                   color: '#333333',
                   textShadow: 'none',
                   opacity: 0.3,
                   scale: 0.95,
                   transition: { duration: 0.4, ease: "easeOut" }
                 }
               }}
              className="matrix-char"
              style={{
                fontSize: FONT_SIZE,
                fontWeight: '600',
                width: CELL_SIZE,
                height: CELL_SIZE,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
                position: 'relative',
                cursor: 'default'
              }}
            >
              {cell.char}
            </motion.div>
          ))}
        </div>
      ))}

      {/* Scanning Beam */}
      <motion.div
        animate={controls}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '80px', // Reduced width to 1/2 (was 200px, but 100px is still wide, 80px is sharper)
          height: '100%',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)', // Reduced brightness to 1/3
          zIndex: 3,
          pointerEvents: 'none',
          mixBlendMode: 'screen' // Brightens everything
        }}
      />
      
    </div>
    </div>
  );
};

export default NothingWordClock;
