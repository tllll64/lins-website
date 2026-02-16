import React from 'react';
import { motion } from 'framer-motion';

const PolaroidCard = ({ image, rotation, zIndex }) => {
  return (
    <motion.div
      style={{
        position: 'relative',
        width: '280px',
        height: '340px',
        backgroundColor: '#fff',
        padding: '16px 16px 40px 16px', // Polaroid-style padding (extra at bottom)
        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
        borderRadius: '8px',
        transformOrigin: 'center center',
        zIndex: zIndex,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
      initial={{ rotate: rotation, y: 0 }}
      whileHover={{
        scale: 1.05,
        zIndex: 100, // Bring to front on hover
        rotate: 0, // Straighten slightly on hover
        transition: { duration: 0.3 }
      }}
    >
      {/* Image Container */}
      <div style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#eee',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <img 
          src={image} 
          alt="Polaroid" 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            display: 'block'
          }} 
        />
      </div>
    </motion.div>
  );
};

const PolaroidGallery = ({ images }) => {
  // Select top 3 images or fallback
  const displayImages = images.slice(0, 3);
  
  // Configuration for the 3 cards
  const cardsConfig = [
    { rotation: -6, zIndex: 1 },
    { rotation: 4, zIndex: 2 },
    { rotation: -3, zIndex: 3 } // Third one
  ];

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      minHeight: '600px', // Ensure enough space
      backgroundColor: '#f9f9f9', // Light grey background
      borderRadius: '24px',
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px'
    }}>
      {/* Background Grid */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'linear-gradient(#e5e5e5 1px, transparent 1px), linear-gradient(90deg, #e5e5e5 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        opacity: 0.5,
        pointerEvents: 'none'
      }} />

      {/* Dashed Path (SVG) */}
      <svg 
        width="100%" 
        height="100%" 
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 0 }}
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Dashed Path - A simple curve connecting the area */}
        <path 
          d="M 100 300 C 200 100, 600 100, 700 300" 
          fill="none" 
          stroke="#ccc" 
          strokeWidth="2" 
          strokeDasharray="10, 10" 
        />
      </svg>

      {/* Cards Container */}
      <div style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '-40px', // Overlap effect
        maxWidth: '1000px',
        width: '100%'
      }}>
        {displayImages.map((imgSrc, index) => {
          const config = cardsConfig[index % cardsConfig.length];
          // Determine offsets to create irregular stacking look
          const yOffset = index === 1 ? '-20px' : '20px'; // Middle one higher

          return (
            <div 
              key={index} 
              style={{ 
                position: 'relative',
                marginLeft: index > 0 ? '-60px' : '0', // Negative margin for overlap
                marginTop: yOffset
              }}
            >
              <PolaroidCard 
                image={imgSrc}
                rotation={config.rotation}
                zIndex={config.zIndex}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PolaroidGallery;
