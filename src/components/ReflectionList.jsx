import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { colors } from '../design-system/tokens';
import { useMediaQuery } from '../design-system/hooks/useMediaQuery';

const ReflectionList = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

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
    </div>
  );
};

export default ReflectionList;
