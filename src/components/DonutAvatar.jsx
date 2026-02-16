import React, { useMemo, useState } from 'react';

// Full-featured donut avatar - exact replica of NothingDotClock but scaled for avatar use
const DonutAvatar = ({ size = 64 }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Keep the same grid resolution as NothingDotClock for quality
  const ROWS = 32;
  const COLS = 32;

  // Calculate cell size based on desired avatar size
  // Original uses ~3.3px cells, we scale proportionally
  const scale = size / 140; // 140px is approximate original size
  const CELL_SIZE = `${3.3 * scale}px`;
  const GAP_SIZE = `${1 * scale}px`;
  const PADDING_SIZE = `${11 * scale}px`;

  const gridData = useMemo(() => {
    let grid = [];
    const center = (ROWS - 1) / 2;
    const maskRadius = center + 0.2;

    // Donut Shape Configuration - EXACT same as NothingDotClock
    const mainCenter = { r: center - 1, c: center };
    const mainRadiusOuter = 11;
    const mainRadiusInner = 4;

    const shadowCenter = { r: center + 1.8, c: center };
    const shadowRadiusOuter = 11.2;
    const shadowRadiusInner = 4;

    const isInsideDonut = (r, c, centerR, centerC, rOuter, rInner) => {
      const dy = (r - centerR) * 1.1;
      const dx = c - centerC;
      const dist = Math.sqrt(dx*dx + dy*dy);
      return dist <= rOuter && dist >= rInner;
    };

    const generateSprinkles = () => {
      const candidates = [];

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

      let seed = 12345;
      const random = () => {
        seed = (seed * 1664525 + 1013904223) % 4294967296;
        return seed / 4294967296;
      };

      for (let i = candidates.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
      }

      const selected = [];
      const sprinkles = new Set();
      const MIN_DIST = 3.5;

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
        const distFromCenter = Math.sqrt(Math.pow(r - center, 2) + Math.pow(c - center, 2));
        const isVisible = distFromCenter <= maskRadius;

        let type = 'BACKGROUND';

        if (isVisible) {
          const inMain = isInsideDonut(r, c, mainCenter.r, mainCenter.c, mainRadiusOuter, mainRadiusInner);
          const inShadow = isInsideDonut(r, c, shadowCenter.r, shadowCenter.c, shadowRadiusOuter, shadowRadiusInner);

          if (inMain) {
            if (sprinkleSet.has(`${r}-${c}`)) {
              type = 'SPRINKLE';
            } else {
              type = 'HIGHLIGHT';
            }
          } else if (inShadow) {
            type = 'SHADOW';
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
  }, [ROWS, COLS]);

  const getStyleForType = (type, isVisible) => {
    if (!isVisible) return { backgroundColor: 'transparent', opacity: 0 };

    let style;
    switch (type) {
      case 'HIGHLIGHT':
        style = { backgroundColor: '#FFFFFF', opacity: 1 };
        break;
      case 'SHADOW':
        style = { backgroundColor: '#FFFFFF', opacity: 0.4 };
        break;
      case 'SPRINKLE':
        style = { backgroundColor: '#333333', opacity: 1 };
        break;
      case 'BACKGROUND':
      default:
        style = { backgroundColor: '#333333', opacity: 0.5 };
        break;
    }

    if (isHovered) {
      style.opacity = style.opacity * 0.3;
    }
    return style;
  };

  return (
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
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.2s ease',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
      }}
    >
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
  );
};

export default DonutAvatar;

