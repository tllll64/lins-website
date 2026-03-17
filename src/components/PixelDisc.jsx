import React, { useMemo } from 'react';
import { useMediaQuery } from '../design-system/hooks/useMediaQuery';

const ROWS = 32;
const COLS = 32;

/**
 * PixelDisc — 空白圆盘，视觉与 NothingDotClock 一致。
 *
 * pattern prop: Array<{ r: number, c: number, type: 'HIGHLIGHT' | 'SHADOW' | 'SPRINKLE' }>
 *   用于指定要点亮的像素。默认为空数组（全暗背景）。
 *
 * 颜色规则（与 NothingDotClock 相同）：
 *   HIGHLIGHT  → #FFFFFF, opacity 1
 *   SHADOW     → #FFFFFF, opacity 0.4
 *   SPRINKLE   → #333333, opacity 1
 *   BACKGROUND → #333333, opacity 0.5
 */
const PixelDisc = ({ pattern = [] }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const CELL_SIZE = isMobile ? '1.65px' : '3.3px';
  const GAP_SIZE  = isMobile ? '0.5px'  : '1px';
  const PADDING_SIZE = isMobile ? '5.5px' : '11px';

  // Build pattern lookup: "r-c" → type
  const patternMap = useMemo(() => {
    const map = {};
    pattern.forEach(({ r, c, type }) => {
      map[`${r}-${c}`] = type;
    });
    return map;
  }, [pattern]);

  const gridData = useMemo(() => {
    const center = (ROWS - 1) / 2;
    const maskRadius = center + 0.2;
    const grid = [];

    for (let r = 0; r < ROWS; r++) {
      const row = [];
      for (let c = 0; c < COLS; c++) {
        const dist = Math.sqrt(Math.pow(r - center, 2) + Math.pow(c - center, 2));
        const isVisible = dist <= maskRadius;
        const type = isVisible
          ? (patternMap[`${r}-${c}`] || 'BACKGROUND')
          : 'OUTSIDE';
        row.push({ type, isVisible });
      }
      grid.push(row);
    }
    return grid;
  }, [patternMap]);

  const getStyle = (type, isVisible) => {
    if (!isVisible) return { backgroundColor: 'transparent', opacity: 0 };
    switch (type) {
      case 'HIGHLIGHT': return { backgroundColor: '#FFFFFF', opacity: 1 };
      case 'SHADOW':    return { backgroundColor: '#FFFFFF', opacity: 0.4 };
      case 'SPRINKLE':  return { backgroundColor: '#333333', opacity: 1 };
      default:          return { backgroundColor: '#333333', opacity: 0.5 };
    }
  };

  return (
    <div
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
      }}
    >
      {gridData.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const style = getStyle(cell.type, cell.isVisible);
          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={{
                ...style,
                width: CELL_SIZE,
                height: CELL_SIZE,
                borderRadius: '0.5px',
              }}
            />
          );
        })
      )}
    </div>
  );
};

export default PixelDisc;
