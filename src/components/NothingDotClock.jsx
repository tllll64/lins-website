import React, { useMemo, useState } from 'react';
import { useMediaQuery } from '../design-system/hooks/useMediaQuery';

const ROWS = 32;
const COLS = 32;

const NothingDotClock = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isHovered, setIsHovered] = useState(false);
  
  // Responsive constants
  const CELL_SIZE = isMobile ? '1.65px' : '3.3px';
  const GAP_SIZE = isMobile ? '0.5px' : '1px';
  const PADDING_SIZE = isMobile ? '5.5px' : '11px';
  
  const gridData = useMemo(() => {
    let grid = [];
    const center = (ROWS - 1) / 2;
    // Circular mask radius
    const maskRadius = center + 0.2; 

    // Donut Shape Configuration
    // Main Body (White/Lit)
    const mainCenter = { r: center - 1, c: center }; // Shifted up slightly
    const mainRadiusOuter = 11;
    const mainRadiusInner = 4;

    // Shadow Body (Grey/Half-lit)
    const shadowCenter = { r: center + 1.8, c: center }; // Shifted down moderately
    const shadowRadiusOuter = 11.2; // Slightly smaller than before
    const shadowRadiusInner = 4;

    // Helper to check if a point is inside a donut shape
    const isInsideDonut = (r, c, centerR, centerC, rOuter, rInner) => {
      // Use elliptical check for slight perspective (flattened Y)
      // (x/a)^2 + (y/b)^2 <= 1
      const dy = (r - centerR) * 1.1; // Stretch Y slightly to correct for flattening or just keep 1
      const dx = c - centerC;
      const dist = Math.sqrt(dx*dx + dy*dy);
      return dist <= rOuter && dist >= rInner;
    };

    // Pre-calculate sprinkles with constraints:
    // 1. Max 13 sprinkles
    // 2. Uniform distribution (min distance)
    // 3. No adjacent/touching sprinkles
    const generateSprinkles = () => {
      const candidates = [];
      
      // 1. Collect all valid positions in the Main Body
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
           const distFromCenter = Math.sqrt(Math.pow(r - center, 2) + Math.pow(c - center, 2));
           if (distFromCenter <= maskRadius) {
             if (isInsideDonut(r, c, mainCenter.r, mainCenter.c, mainRadiusOuter, mainRadiusInner)) {
               candidates.push({ r, c });
             }
           }
        }
      }

      // 2. Deterministic shuffle (Fisher-Yates with seeded random)
      // Simple LCG PRNG for consistency
      let seed = 12345;
      const random = () => {
        seed = (seed * 1664525 + 1013904223) % 4294967296;
        return seed / 4294967296;
      };

      for (let i = candidates.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
      }

      // 3. Select up to 20 sprinkles with distance constraint
      const selected = [];
      const sprinkles = new Set();
      const MIN_DIST = 3.5; // Slightly reduced to fit more sprinkles uniformly

      for (const cand of candidates) {
        if (selected.length >= 20) break;

        let valid = true;
        for (const s of selected) {
          const dist = Math.sqrt(Math.pow(cand.r - s.r, 2) + Math.pow(cand.c - s.c, 2));
          if (dist < MIN_DIST) {
            valid = false;
            break;
          }
        }

        if (valid) {
          selected.push(cand);
          sprinkles.add(`${cand.r}-${cand.c}`);
        }
      }
      
      return sprinkles;
    };

    const sprinkleSet = generateSprinkles();

    for (let r = 0; r < ROWS; r++) {
      let row = [];
      for (let c = 0; c < COLS; c++) {
        // 1. Circular Mask Check
        const distFromCenter = Math.sqrt(Math.pow(r - center, 2) + Math.pow(c - center, 2));
        const isVisible = distFromCenter <= maskRadius;

        // 2. Determine Pixel Type
        let type = 'BACKGROUND'; // Default
        
        if (isVisible) {
          const inMain = isInsideDonut(r, c, mainCenter.r, mainCenter.c, mainRadiusOuter, mainRadiusInner);
          const inShadow = isInsideDonut(r, c, shadowCenter.r, shadowCenter.c, shadowRadiusOuter, shadowRadiusInner);

          if (inMain) {
            if (sprinkleSet.has(`${r}-${c}`)) {
              type = 'SPRINKLE';
            } else {
              type = 'HIGHLIGHT'; // Lit
            }
          } else if (inShadow) {
            type = 'SHADOW'; // Half-lit
          }
        }

        row.push({ 
          type,
          isVisible
        });
      }
      grid.push(row);
    }
    return grid;
  }, []);

  // Color mapping logic
  const getStyleForType = (type, isVisible) => {
    if (!isVisible) return { backgroundColor: 'transparent', opacity: 0 };

    let style;
    switch (type) {
      case 'HIGHLIGHT':
        style = { backgroundColor: '#FFFFFF', opacity: 1 };
        break;
      case 'SHADOW':
        style = { backgroundColor: '#FFFFFF', opacity: 0.4 }; // Half-lit greyish
        break;
      case 'SPRINKLE':
        style = { backgroundColor: '#333333', opacity: 1 }; // Dark dot inside white
        break;
      case 'BACKGROUND':
      default:
        style = { backgroundColor: '#333333', opacity: 0.5 }; // Restore visibility of base grid
        break;
    }

    if (isHovered) {
      style.opacity = style.opacity * 0.3;
    }
    return style;
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Custom Tooltip */}
      <div style={{
        position: 'absolute',
        top: '14.6%',
        left: '85.4%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fff',
        color: '#000',
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        fontSize: '24px',
        opacity: isHovered ? 1 : 0,
        pointerEvents: 'none',
        transition: 'opacity 0.15s ease-out, transform 0.15s ease-out',
        zIndex: 10,
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        🍩
      </div>

      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'relative',
          backgroundColor: '#000000',
          borderRadius: '50%',
          padding: PADDING_SIZE,
      overflow: 'hidden',
      display: 'grid',
      gridTemplateColumns: `repeat(${COLS}, ${CELL_SIZE})`,
      gap: GAP_SIZE,
      boxShadow: '0 2px 1px rgba(0, 0, 0, 0.15)',
      userSelect: 'none',
      width: 'fit-content',
      height: 'fit-content',
      margin: '0 auto',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {gridData.map((row, rowIndex) => (
        row.map((cell, colIndex) => {
          const style = getStyleForType(cell.type, cell.isVisible);
          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={{
                ...style,
                width: CELL_SIZE,
                height: CELL_SIZE,
                borderRadius: '0.5px',
                transition: 'opacity 0.15s ease-out',
              }}
            />
          );
        })
      ))}
    </div>
  </div>
  );
};

export default NothingDotClock;
