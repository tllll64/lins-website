import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  const [isExpanded, setIsExpanded] = useState(false);

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
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '14px'
    }}>
      {/* Interactive Area */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          position: 'relative',
          height: CARD_HEIGHT + 56, // Increased height for large shadows
          paddingLeft: '28px', // Increased padding for left shadow
          width: '100%',
          overflowX: isExpanded ? 'auto' : 'visible', // Allow scrolling when expanded
          // overflowY: 'hidden', // Removed to prevent shadow clipping
          cursor: 'pointer' // Indicate interactivity
        }}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Cards Container */}
        <motion.div 
          variants={containerVariants}
          initial="collapsed"
          animate={isExpanded ? "expanded" : "collapsed"}
          style={{
            position: 'relative',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            minWidth: isExpanded ? (cards.length * (CARD_WIDTH * 4 / 5) + 70) : 'auto'
          }}
        >
          {cards.map((card, index) => {
            // Calculated styles for collapsed state
            // No rotation, just stacking
            const collapsedX = index * (CARD_WIDTH / 3); // Scaled overlap distance (1/3 exposed)
            const collapsedY = 0; // No Y offset
            const collapsedRotate = 0; // No rotation
            
            // Calculated styles for expanded state
            // Each card is covered by 1/5 by the previous card (meaning 4/5 exposed)
            const expandedX = index * (CARD_WIDTH * 4 / 5);
            
            return (
              <motion.div
                key={card.id}
                style={{
                  position: 'absolute',
                  width: CARD_WIDTH,
                  height: CARD_HEIGHT,
                  borderRadius: '16px', // Scaled border radius
                  backgroundColor: '#E5E5E5', // Grey background as requested
                  // Updated shadow style per request (softer, cleaner)
                  boxShadow: '0 6px 17px rgba(0,0,0,0.025), 0 1.5px 4px rgba(0,0,0,0.01)',
                  border: '4px solid white', // Scaled border to 4px
                  overflow: 'hidden',
                  zIndex: cards.length - index, // Reverse stack order so Left covers Right
                  transformOrigin: 'bottom left',
                  left: 0,
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
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1], // Custom ease
                  delay: index * 0.03 // Slightly faster stagger
                }}
              >
                {card.image && (
                  <img 
                    src={card.image} 
                    alt={`Card ${index}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
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
