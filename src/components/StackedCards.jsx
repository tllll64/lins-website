import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { colors, spacing, typography, fontWeight } from '../design-system/tokens';

// Placeholder images - using assets or fallback to solid colors/gradients
// You should replace these with actual project/client logos or screenshots
const CARD_DATA = [
  { id: 1, color: '#FF6B6B', title: 'Project 1' },
  { id: 2, color: '#4ECDC4', title: 'Project 2' },
  { id: 3, color: '#FFE66D', title: 'Project 3' },
  { id: 4, color: '#1A535C', title: 'Project 4' },
  { id: 5, color: '#FF9F1C', title: 'Project 5' },
  { id: 6, color: '#2EC4B6', title: 'Project 6' },
  { id: 7, color: '#E71D36', title: 'Project 7' },
  { id: 8, color: '#011627', title: 'Project 8' },
];

const StackedCards = ({ assets, images }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { 
    amount: 0.2, // Lower threshold to trigger earlier
    once: false,
    margin: "0px 0px -10% 0px" // Slight offset to ensure full engagement
  });
  const isExpanded = isInView;

  // Combine provided assets with placeholders if needed to reach 8
  const cards = CARD_DATA.map((card, index) => {
    let image = null;
    if (images && index < images.length) {
      image = images[index];
    } else {
      // Try to map to available assets photo1...photo6
      const assetKey = `photo${(index % 6) + 1}`;
      image = assets && assets[assetKey] ? assets[assetKey] : null;
    }
    return { ...card, image };
  });

  // Card dimensions - Square (Scaled to 0.7x of 120%)
  const CARD_WIDTH = 84;
  const CARD_HEIGHT = 84;
  
  // Animation variants
  const containerVariants = {
    collapsed: {
      width: '100%',
      transition: { duration: 0.5, ease: "easeInOut" }
    },
    expanded: {
      width: '100%',
      transition: { duration: 0.5, ease: "easeInOut" }
    }
  };

  return (
    <div 
      ref={containerRef}
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px'
      }}
    >
      {/* Scrollable Container */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center', // Changed from flex-start to center for content alignment
          position: 'relative',
          height: CARD_HEIGHT + 56, // Increased height for large shadows
          paddingLeft: '0px', // Removed padding for left shadow per request
          paddingRight: '0px', // Unified padding to 0 per request
          width: '100%',
          overflowX: isExpanded ? 'auto' : 'visible', // Allow scrolling when expanded
          // overflowY: 'hidden', // Removed to prevent shadow clipping
        }}
      >
        {/* Cards Container */}
        <motion.div 
          layout
          variants={containerVariants}
          initial="collapsed"
          animate={isExpanded ? "expanded" : "collapsed"}
          style={{
            position: 'relative',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            minWidth: isExpanded ? (cards.length * (CARD_WIDTH + 24)) : 'auto'
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1] // Smooth ease, no bounce
          }}
        >
          {cards.map((card, index) => {
            // Reverse Stagger Logic: Outer cards move first/fastest, inner cards move last/slowest
            const middleIndex = (cards.length - 1) / 2;
            const distFromCenter = Math.abs(index - middleIndex);
            // The max distance is roughly half the length. 
            // We want smaller distance (inner) to have HIGHER delay, and larger distance (outer) to have LOWER delay.
            const maxDist = middleIndex;
            // Delay = (MaxDist - CurrentDist) * factor. 
            // Outer cards (Dist ~ Max) -> Delay ~ 0
            // Inner cards (Dist ~ 0) -> Delay ~ Max * factor
            const staggerDelay = (maxDist - distFromCenter) * 0.1; 
            
            // Calculated styles for collapsed state
            // Overlap 40% (meaning offset is 60% of width? Or offset is 40% so overlap is 60%?)
            // "各自重叠40%" usually implies they share 40% of their area.
            // Let's assume user wants a tighter stack, so overlap is significant.
            // If offset is 40% of width (33.6px), overlap is 60%.
            // If offset is 60% of width (50.4px), overlap is 40%.
            // Let's go with offset = 40% (33.6px) for a tighter, centered stack look as requested "先居中展示"
            const collapsedOffset = CARD_WIDTH * 0.4; 
            const totalCollapsedWidth = (cards.length - 1) * collapsedOffset + CARD_WIDTH;
            const collapsedX = index * collapsedOffset - totalCollapsedWidth / 2; // Centered
            const collapsedY = 0; // No Y offset
            const collapsedRotate = 0; // No rotation
            
            // Calculated styles for expanded state
            // No overlap, cards are spaced with 24px gap (3x previous 8px)
            const totalExpandedWidth = (cards.length - 1) * (CARD_WIDTH + 24) + CARD_WIDTH;
            const expandedX = index * (CARD_WIDTH + 24) - totalExpandedWidth / 2; // Centered
            
            return (
              <motion.div
                key={card.id}
                layout
                style={{
                  position: 'absolute',
                  width: CARD_WIDTH,
                  height: CARD_HEIGHT,
                  borderRadius: '16px', // Restored border radius per request
                  backgroundColor: index === 0 ? '#000000' : '#FFFFFF', // First card black, others white per request
                  // Updated shadow style per request (softer, cleaner)
                  boxShadow: '0 6px 17px rgba(0,0,0,0.025), 0 1.5px 4px rgba(0,0,0,0.01)',
                  // border: '4px solid white', // Removed border per request
                  overflow: 'hidden',
                  zIndex: cards.length - index, // Reverse stack order so Left covers Right
                  transformOrigin: 'center center', // Changed to center center for more balanced expansion
                  left: '50%', // Centered relative to container
                  display: 'flex', // Added flex to center the scaled image
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                variants={{
                  collapsed: {
                    x: collapsedX,
                    y: collapsedY,
                    rotate: collapsedRotate,
                    scale: 1,
                    zIndex: cards.length - index
                  },
                  expanded: {
                    x: expandedX,
                    y: 0,
                    rotate: 0, // No rotation
                    scale: 1,
                    zIndex: cards.length - index
                  }
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.4, 0, 0.2, 1], // Standard EaseInOut (Material Design) - Smooth start and end
                  delay: staggerDelay
                }}
              >
                {card.image && (
                  <img 
                    src={card.image} 
                    alt={`Card ${index}`}
                    style={{
                      width: index === 0 ? '79.2%' : '88%', // First card scaled to 90% of 88% (79.2%), others remain at 88%
                      height: index === 0 ? '79.2%' : '88%', // First card scaled to 90% of 88% (79.2%), others remain at 88%
                      objectFit: 'contain' // Changed to contain to preserve aspect ratio within the box
                    }}
                  />
                )}
              </motion.div>
            );
          })}
          
          {/* Trigger Button Removed per user request */}
        </motion.div>
      </div>
    </div>
  );
};

export default StackedCards;
