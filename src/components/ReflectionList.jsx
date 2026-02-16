import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import { colors } from '../design-system/tokens';
import { useMediaQuery } from '../design-system/hooks/useMediaQuery';

const ReflectionList = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const imageContainerRef = useRef(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // Store GSAP quickTo functions
  const xTo = useRef(null);
  const yTo = useRef(null);

  useEffect(() => {
    if (isMobile) return;
    
    // Initial setup
    const imageContainer = imageContainerRef.current;
    
    // Center the image on the cursor initially (or just offset it)
    gsap.set(imageContainer, { xPercent: -50, yPercent: -50, scale: 0.8, opacity: 0 });

    // Create quickTo functions
    xTo.current = gsap.quickTo(imageContainer, "x", { duration: 0.4, ease: "power3" });
    yTo.current = gsap.quickTo(imageContainer, "y", { duration: 0.4, ease: "power3" });

    const handleMouseMove = (e) => {
      // Update position
      if (xTo.current && yTo.current) {
        xTo.current(e.clientX);
        yTo.current(e.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;
    
    const imageContainer = imageContainerRef.current;
    
    if (activeIndex !== null) {
      // Show container
      gsap.to(imageContainer, { 
        scale: 1, 
        opacity: 1, 
        duration: 0.3, 
        ease: "power2.out" 
      });
    } else {
      // Hide container
      gsap.to(imageContainer, { 
        scale: 0.8, 
        opacity: 0, 
        duration: 0.3, 
        ease: "power2.out" 
      });
    }
  }, [activeIndex, isMobile]);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Header Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr auto' : '2fr 1fr 150px',
        padding: '16px 0',
        borderBottom: `1px solid ${colors.grey[18]}`,
        color: colors.grey[56],
        fontSize: '12px',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}>
        <div>Blog Name</div>
        {!isMobile && <div>Category</div>}
        <div style={{ textAlign: 'right' }}>Action</div>
      </div>

      {/* List Items */}
      <div onMouseLeave={() => setActiveIndex(null)}>
        {items.map((item, index) => (
          <div
            key={index}
            onMouseEnter={() => setActiveIndex(index)}
            onClick={item.onClick}
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr auto' : '2fr 1fr 150px',
              padding: '32px 0',
              borderBottom: `1px solid ${colors.grey[18]}`,
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'opacity 0.3s ease',
              opacity: activeIndex !== null && activeIndex !== index ? 0.3 : 1
            }}
          >
            <div style={{ 
              fontSize: isMobile ? '14px' : '14px', 
              fontWeight: 400, 
              color: colors.white.solid 
            }}>
              {item.title}
            </div>
            
            {!isMobile && (
              <div style={{ fontSize: '12px', color: colors.grey[66] }}>
                {item.category}
              </div>
            )}
            
            <div style={{ 
              textAlign: 'right', 
              display: 'flex', 
              justifyContent: 'flex-end', 
              alignItems: 'center', 
              gap: '8px',
              color: colors.white.solid,
              fontSize: '12px'
            }}>
              <span style={{ 
                opacity: activeIndex === index ? 1 : 0, 
                transition: 'opacity 0.2s ease',
                display: isMobile ? 'none' : 'inline'
              }}>
                See project
              </span>
              <ArrowUpRight size={18} />
            </div>
          </div>
        ))}
      </div>

      {/* Floating Image Container */}
      {!isMobile && (
        <div
          ref={imageContainerRef}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '320px',
            height: '220px',
            pointerEvents: 'none',
            zIndex: 9999,
            overflow: 'hidden',
            borderRadius: '12px',
            backgroundColor: colors.grey[16], // Fallback background
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
          }}
        >
          {items.map((item, index) => (
            <img
              key={index}
              src={item.image}
              alt={item.title}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: activeIndex === index ? 1 : 0,
                transform: activeIndex === index ? 'scale(1)' : 'scale(1.1)',
                transition: 'opacity 0.3s ease, transform 0.4s ease'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReflectionList;
