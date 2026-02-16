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

const StackedCards = ({ assets }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Combine provided assets with placeholders if needed to reach 8
  const cards = CARD_DATA.map((card, index) => {
    // Try to map to available assets photo1...photo6
    const assetKey = `photo${(index % 6) + 1}`;
    const image = assets && assets[assetKey] ? assets[assetKey] : null;
    return { ...card, image };
  });

  // Card dimensions
  const CARD_WIDTH = 200;
  const CARD_HEIGHT = 250;
  const EXPANDED_GAP = 20;
  
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
      padding: '60px 0',
      overflow: 'hidden', // Hide scrollbar for cleaner look, or 'auto' if scrolling needed
      display: 'flex',
      flexDirection: 'column',
      gap: '40px'
    }}>
      {/* Title Section */}
      <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
        <h2 style={{
          fontFamily: 'Lora, "Times New Roman", Georgia, serif',
          fontSize: '48px',
          fontWeight: 600,
          lineHeight: '56px',
          letterSpacing: '0px',
          color: 'rgb(23, 23, 23)',
          marginBottom: '12px'
        }}>
          Recently Work with
        </h2>
      </div>

      {/* Interactive Area */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative',
        height: CARD_HEIGHT + 60, // Add padding for rotation/shadows
        paddingLeft: '40px', // Initial offset
        width: '100%',
        overflowX: isExpanded ? 'auto' : 'visible', // Allow scrolling when expanded if needed
        overflowY: 'hidden'
      }}>
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
            minWidth: isExpanded ? (cards.length * (CARD_WIDTH + EXPANDED_GAP) + 300) : 'auto' // Ensure space for scrolling
          }}
        >
          {cards.map((card, index) => {
            // Calculated styles for collapsed state
            const collapsedX = index * 15; // Tight overlap
            const collapsedY = index % 2 === 0 ? 5 : -5; // Slight Y offset for randomness
            const collapsedRotate = 5 + (index * 1); // Slight progressive rotation
            
            // Calculated styles for expanded state
            const expandedX = index * (CARD_WIDTH + EXPANDED_GAP);
            
            return (
              <motion.div
                key={card.id}
                style={{
                  position: 'absolute',
                  width: CARD_WIDTH,
                  height: CARD_HEIGHT,
                  borderRadius: '16px',
                  backgroundColor: 'white',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                  overflow: 'hidden',
                  zIndex: index, // Stack order
                  transformOrigin: 'bottom left', // Pivot point for fan effect
                  left: 0, // Base position, animated via x
                }}
                variants={{
                  collapsed: {
                    x: collapsedX,
                    y: collapsedY,
                    rotate: collapsedRotate,
                    scale: 1,
                    zIndex: index
                  },
                  expanded: {
                    x: expandedX,
                    y: 0,
                    rotate: 0,
                    scale: 1,
                    zIndex: index
                  }
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1], // Custom ease (easeOutExpo-ish)
                  delay: index * 0.02 // Stagger effect
                }}
              >
                {card.image ? (
                  <img 
                    src={card.image} 
                    alt={card.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    background: card.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '24px'
                  }}>
                    {index + 1}
                  </div>
                )}
              </motion.div>
            );
          })}

          {/* Trigger Button - Positioned after the last card in collapsed state, or far right in expanded */}
          <motion.div
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              position: 'absolute',
              width: 200,
              height: 200, // Slightly smaller than cards
              border: '2px dashed #ccc',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              backgroundColor: 'transparent',
              zIndex: 100
            }}
            variants={{
              collapsed: {
                x: (cards.length * 15) + 220, // Positioned after the collapsed stack
                y: 0,
                opacity: 1
              },
              expanded: {
                x: (cards.length * (CARD_WIDTH + EXPANDED_GAP)) + 20, // Positioned after expanded cards
                y: 0,
                opacity: 1
              }
            }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1]
            }}
            whileHover={{ scale: 1.05, borderColor: '#333' }}
            whileTap={{ scale: 0.95 }}
          >
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '18px',
              fontWeight: 500,
              color: '#333',
              textAlign: 'center',
              padding: '20px'
            }}>
              Let's make it resonate.
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default StackedCards;
