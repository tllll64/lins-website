import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

// Mock data for the cards
const CARDS = [
  { id: 1, title: 'Project One', category: 'GRAPHIC IDENTITY', image: 'https://picsum.photos/300/400?random=1' },
  { id: 2, title: 'Project Two', category: 'SITE DESIGN', image: 'https://picsum.photos/300/400?random=2' },
  { id: 3, title: 'Project Three', category: 'VIDEO', image: 'https://picsum.photos/300/400?random=3' },
  { id: 4, title: 'Project Four', category: 'GRAPHIC IDENTITY', image: 'https://picsum.photos/300/400?random=4' },
  { id: 5, title: 'Project Five', category: 'SITE DESIGN', image: 'https://picsum.photos/300/400?random=5' },
  { id: 6, title: 'Project Six', category: 'VIDEO', image: 'https://picsum.photos/300/400?random=6' },
  { id: 7, title: 'Project Seven', category: 'GRAPHIC IDENTITY', image: 'https://picsum.photos/300/400?random=7' },
  { id: 8, title: 'Project Eight', category: 'SITE DESIGN', image: 'https://picsum.photos/300/400?random=8' },
];

const FILTERS = ['ALL', 'GRAPHIC IDENTITY', 'SITE DESIGN', 'VIDEO'];

export const StackCardGallery = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedId, setSelectedId] = useState(null);
  const containerRef = useRef(null);

  // Mouse position for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth mouse movement with spring physics
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Calculate rotation based on mouse position
  // Range: -10 to 10 degrees for X and Y axes
  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    // Normalize mouse position from -0.5 to 0.5
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const filteredCards = activeFilter === 'ALL' 
    ? CARDS 
    : CARDS.filter(card => card.category === activeFilter);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-[600px] flex items-center justify-center relative overflow-hidden"
    >
      {/* Right Filter Buttons - Simplified */}
      <div className="absolute top-1/2 right-4 md:right-12 -translate-y-1/2 z-20 flex flex-col gap-4 items-end">
        {FILTERS.map(filter => (
          <div 
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className="group flex items-center gap-3 cursor-pointer"
          >
            <span className={`text-[10px] font-bold tracking-widest transition-all duration-300 ${
              activeFilter === filter ? 'opacity-100 translate-x-0 text-black' : 'opacity-0 translate-x-4 group-hover:opacity-50 group-hover:translate-x-0 text-gray-500'
            }`}>
              {filter}
            </span>
            <div 
              className={`w-2 h-2 rounded-full border border-black/20 transition-all duration-300 ${
                activeFilter === filter ? 'bg-black scale-125 border-black' : 'bg-transparent hover:bg-black/10'
              }`}
            />
          </div>
        ))}
      </div>

      {/* 3D Card Stack Area */}
      <div className="absolute inset-0 flex items-center justify-center perspective-[1000px]">
        <motion.div
          style={{ 
            rotateX, 
            rotateY,
            transformStyle: 'preserve-3d' 
          }}
          className="relative w-[300px] h-[400px]"
        >
          <AnimatePresence>
            {filteredCards.map((card, index) => {
              const isSelected = selectedId === card.id;
              
              // New layout calculation based on the diagonal stream reference
              // Front cards (lower index) should be bottom-left
              // Back cards (higher index) should be top-right
              // We center the stream relative to the container
              
              const centerIndex = (filteredCards.length - 1) / 2;
              const offsetFromCenter = index - centerIndex;

              // Spread parameters
              const xStep = 60;  // Horizontal spacing
              const yStep = -30; // Vertical spacing (negative moves up)
              const zStep = -150; // Depth spacing (negative moves back)

              const xPos = offsetFromCenter * xStep;
              const yPos = offsetFromCenter * yStep;
              const zPos = offsetFromCenter * zStep; // Center is 0, others spread out

              return (
                <motion.div
                  key={card.id}
                  layoutId={`card-${card.id}`}
                  onClick={() => setSelectedId(isSelected ? null : card.id)}
                  initial={{ 
                    opacity: 0, 
                    x: xPos, 
                    y: yPos + 200, // Start from bottom
                    z: zPos - 500, // Start from back
                    rotateY: -25,
                    rotateX: 10
                  }}
                  animate={isSelected ? {
                    // Expanded State
                    opacity: 1,
                    x: 0,
                    y: 0,
                    z: 200, // Bring forward
                    rotateY: 0,
                    rotateX: 0,
                    rotateZ: 0,
                    scale: 1.2,
                    filter: 'saturate(1)',
                    zIndex: 100
                  } : {
                    // Stream State
                    opacity: 1,
                    x: xPos,
                    y: yPos,
                    z: zPos,
                    rotateY: -35, // Stronger Y rotation to face left
                    rotateX: 10,  // Slight tilt back
                    rotateZ: 0,   // No Z rotation for clean stream look
                    scale: 1,
                    filter: 'saturate(0.5)',
                    zIndex: filteredCards.length - index // Lower index (front) has higher z-index
                  }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 20
                  }}
                  className="absolute top-0 left-0 w-full h-full rounded-xl shadow-xl overflow-hidden cursor-pointer bg-gray-100"
                  style={{
                    transformStyle: 'preserve-3d',
                    boxShadow: '10px 10px 30px rgba(0, 0, 0, 0.2)' // Adjusted shadow direction
                  }}
                >
                  <img 
                    src={card.image} 
                    alt={card.title}
                    className="w-full h-full object-cover pointer-events-none"
                  />
                  
                  {/* Card Overlay Content (Visible on Hover/Select) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                    <h3 className="text-white text-xl font-bold">{card.title}</h3>
                    <p className="text-gray-300 text-xs tracking-wider mt-1">{card.category}</p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Background Click to Reset */}
      {selectedId && (
        <div 
          className="absolute inset-0 z-0" 
          onClick={() => setSelectedId(null)}
        />
      )}
    </div>
  );
};

export default StackCardGallery;
