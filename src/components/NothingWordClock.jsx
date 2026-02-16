import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

const ROWS = 8;
const COLS = 20;
const TARGET_PHRASE = "THIS IS MY WEBSITE";

// Generate random letter
const getRandomChar = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return chars.charAt(Math.floor(Math.random() * chars.length));
};

const NothingWordClock = () => {
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

    // Place target phrase
    // Center vertically and horizontally
    const phraseLen = TARGET_PHRASE.length;
    // We need to handle spaces in the phrase if we want them to be "blank" or just part of the grid?
    // "THIS IS MY WEBSITE" has spaces.
    // The PRD says: "Container filled with uppercase English letters... arranged in a neat grid."
    // It doesn't explicitly say spaces should be empty. But usually word clocks have letters everywhere.
    // However, "THIS IS MY WEBSITE" usually reads better with spaces or just continuous letters.
    // Let's assume continuous letters for the phrase, but maybe we can leave spaces as is or replace with random char but NOT highlighted?
    // "Default state... letters dark grey... Highlighted state... pure white"
    // If I put spaces, there will be holes in the grid.
    // I will replace spaces with random characters, but ONLY highlight the actual letters of the phrase.
    // OR, I just layout the phrase with spaces as actual spaces (empty cells)?
    // "Container filled with uppercase English letters" implies no empty spaces.
    // So I will use spaces in the phrase to determine where to BREAK the highlighting, but fill the cell with a random char.
    
    // Calculate start position
    const startRow = Math.floor((ROWS - 1) / 2); // e.g. 3
    // Phrase length is 18. Cols 20.
    // Start col = (20 - 18) / 2 = 1.
    const startCol = Math.floor((COLS - phraseLen) / 2);

    for (let i = 0; i < phraseLen; i++) {
      const char = TARGET_PHRASE[i];
      const r = startRow;
      const c = startCol + i;

      if (r < ROWS && c < COLS) {
        if (char !== ' ') {
          grid[r][c] = { char: char, isTarget: true };
        } else {
          // It's a space. Keep random char, isTarget false.
          // Or maybe we want the space to be "empty" visually?
          // PRD: "fill with uppercase English letters".
          // I'll keep it as random char, not highlighted.
          grid[r][c] = { char: getRandomChar(), isTarget: false };
        }
      }
    }

    return grid;
  }, []);

  return (
    <div style={{
      position: 'relative',
      backgroundColor: '#121212',
      borderRadius: '40px',
      padding: '40px',
      overflow: 'hidden',
      display: 'inline-flex',
      flexDirection: 'column',
      gap: '8px', // Vertical gap between rows
      // Nothing style dot grid background
      backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
      backgroundSize: '12px 12px',
      boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
      fontFamily: '"Inter", "Roboto Mono", monospace', // Monospace helps alignment
      userSelect: 'none'
    }}>
      {/* Grid */}
      {gridData.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          {row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="matrix-char" // For beam targeting
              style={{
                color: cell.isTarget ? '#FFFFFF' : '#333333',
                textShadow: cell.isTarget ? '0 0 8px rgba(255, 255, 255, 0.4)' : 'none',
                fontSize: '16px',
                fontWeight: '600',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color 0.2s ease, text-shadow 0.2s ease',
                zIndex: 2,
                position: 'relative'
              }}
            >
              {cell.char}
            </div>
          ))}
        </div>
      ))}

      {/* Scanning Beam */}
      {/* 
         The beam needs to scan from left to right.
         It should light up letters as it passes.
         We can use mix-blend-mode: overlay or screen with a white gradient.
         Or we can simply put a white gradient overlay with low opacity?
         "momentarily lighting up all letters" -> implies they turn bright.
         If I use `mix-blend-mode: difference` or `exclusion` it might look cool but maybe not "lighting up".
         `mix-blend-mode: color-dodge` on a dark background often creates a glowing effect.
      */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: '200%' }}
        transition={{
          repeat: Infinity,
          repeatDelay: 15, // Every 15 seconds (15s delay + duration)
          duration: 2, // Scan duration
          ease: "linear"
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '150px', // Beam width
          height: '100%',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%)',
          zIndex: 3,
          pointerEvents: 'none',
          mixBlendMode: 'overlay' // or screen, overlay works well to brighten
        }}
      />
      
      {/* Secondary sharper beam for "glitch" feel */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: '200%' }}
        transition={{
          repeat: Infinity,
          repeatDelay: 15,
          duration: 2,
          ease: "linear"
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '2px', // Thin line
          height: '100%',
          background: 'rgba(255, 255, 255, 0.9)',
          boxShadow: '0 0 15px white',
          zIndex: 4,
          pointerEvents: 'none',
          marginLeft: '75px' // Center in the gradient beam
        }}
      />

    </div>
  );
};

export default NothingWordClock;
