import React, { useState } from 'react';
import { ArrowUpRight, Lock } from 'lucide-react';
import { colors, typography } from '../design-system/tokens';
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
              cursor: item.locked ? 'not-allowed' : 'pointer',
              transition: 'opacity 0.3s ease',
              opacity: activeIndex !== null && activeIndex !== index ? 0.3 : 1
            }}
          >
            <div style={{ 
              ...typography.heading5,
              color: colors.white.solid 
            }}>
              {item.title}
            </div>
            
            {!isMobile && (
              <div style={{ 
                fontSize: '16px', 
                color: activeIndex === index ? colors.white.solid : colors.grey[66],
                transition: 'color 0.3s ease'
              }}>
                {item.category}
              </div>
            )}
            
            <div style={{ 
              textAlign: 'right', 
              display: 'flex', 
              justifyContent: 'flex-end', 
              alignItems: 'center', 
              gap: '8px',
              color: activeIndex === index ? colors.white.solid : colors.grey[66],
              transition: 'color 0.3s ease',
              fontSize: '16px'
            }}>
              <span style={{ 
                opacity: activeIndex === index ? 1 : 0, 
                transition: 'opacity 0.2s ease',
                display: isMobile ? 'none' : 'inline'
              }}>
                {item.locked ? 'Coming Soon' : 'See More'}
              </span>
              {item.locked ? <Lock size={16} /> : <ArrowUpRight size={20} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReflectionList;
