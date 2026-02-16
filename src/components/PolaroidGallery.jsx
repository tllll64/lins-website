import React from 'react';
import { motion } from 'framer-motion';

const PolaroidCard = ({ image, rotation, zIndex, imageStyle = {} }) => {
  return (
    <motion.div
      style={{
        position: 'relative',
        width: '180px', // Reduced width (0.6x)
        height: '195px', // Reduced height (0.6x) -> 1:1 content ratio
        backgroundColor: '#fff',
        padding: '10px 10px 25px 10px', // Adjusted padding
        boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
        borderRadius: '6px',
        transformOrigin: 'center center',
        zIndex: zIndex,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
      initial={{ rotate: rotation, y: 0 }}
      whileHover={{
        scale: 1.1,
        zIndex: 100,
        rotate: 0,
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
            display: 'block',
            filter: 'brightness(0.96) saturate(0.9) contrast(0.96)',
            ...imageStyle
          }} 
        />
      </div>
    </motion.div>
  );
};

const PolaroidGallery = ({ images }) => {
  // Select top 6 images or fallback
  const displayImages = images.slice(0, 6);
  
  // Configuration for the 6 cards
  const cardsConfig = [
    { rotation: -6, zIndex: 1 },
    { rotation: 4, zIndex: 2 },
    { rotation: -3, zIndex: 3 },
    { rotation: 5, zIndex: 2 },
    { rotation: -5, zIndex: 1 },
    { rotation: 3, zIndex: 2 }
  ];

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      minHeight: '350px', // Reduced height
      backgroundColor: '#f9f9f9',
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

      {/* Cards Container */}
      <div style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // gap is removed as we use negative margins for overlap
        maxWidth: '1000px',
        width: '100%'
      }}>
        {displayImages.map((imgSrc, index) => {
          const config = cardsConfig[index % cardsConfig.length];
          // Determine offsets to create irregular stacking look
          const yOffset = index % 2 === 0 ? '0px' : '-20px'; // Alternating offset
          
          // Special zoom for photo4 (index 3)
          const imageStyle = index === 3 ? {
            transform: 'scale(1.3)',
            transformOrigin: 'bottom right'
          } : {};

          return (
            <div 
              key={index} 
              style={{ 
                position: 'relative',
                marginLeft: index > 0 ? '-30px' : '0', // Negative margin for overlap
                marginTop: yOffset
              }}
            >
              <PolaroidCard 
                image={imgSrc}
                rotation={config.rotation}
                zIndex={config.zIndex}
                imageStyle={imageStyle}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PolaroidGallery;
