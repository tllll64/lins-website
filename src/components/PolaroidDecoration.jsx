import React from 'react';

const Polaroid = ({ src, rotate = 0, zIndex = 1, scale = 1, shadow = 'rgba(0, 0, 0, 0.15) 0px 4px 14px', style = {} }) => {
    return (
        <div style={{
            position: 'relative',
            width: '158px',
            height: '174px',
            backgroundColor: '#ffffff',
            padding: '10px 10px 24px',
            boxShadow: shadow,
            borderRadius: '4px',
            transformOrigin: 'center center',
            zIndex: zIndex,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: `rotate(${rotate}deg) scale(${scale})`,
            transition: 'transform 0.3s ease, z-index 0.3s',
            ...style
        }}
        // Add hover effect to bring to front and straighten
        onMouseEnter={(e) => {
            e.currentTarget.style.zIndex = 10;
            // Always scale up to 1.05 relative to base size for clear view
            e.currentTarget.style.transform = `rotate(0deg) scale(1.05)`;
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.zIndex = zIndex;
            e.currentTarget.style.transform = `rotate(${rotate}deg) scale(${scale})`;
        }}
        >
            <div style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#eeeeee',
                overflow: 'hidden',
                position: 'relative'
            }}>
                <img 
                    alt="Polaroid" 
                    src={src} 
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        display: 'block',
                        filter: 'brightness(0.96) saturate(0.9) contrast(0.96)',
                    }} 
                />
            </div>
        </div>
    );
};

const PolaroidDecoration = ({ images, scale = 1 }) => {
    return (
        <div style={{ 
            position: 'relative', 
            width: '158px', 
            height: '178px',
            transform: `scale(${scale})`,
            transformOrigin: 'center center'
        }}>
            {/* Background Shape: Black with 10% opacity, small shadow */}
            <div style={{
                position: 'absolute',
                top: 4,
                right: 14,
                width: '158px',
                height: '174px',
                backgroundColor: 'rgba(0, 0, 0, 0.1)', // Black with 10% opacity
                borderRadius: '4px',
                transform: 'rotate(-8deg)',
                zIndex: 0,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' // Small shadow for depth
            }} />
            
            {/* Foreground Photo: Shadow matches FolderIcon (drop-shadow) */}
            <div style={{ position: 'absolute', top: 0, right: 0 }}>
                <Polaroid 
                    src={images[1]} 
                    rotate={6} 
                    zIndex={1} 
                    shadow="0px 8px 24px rgba(0, 0, 0, 0.12)" // Match FolderIcon's drop-shadow
                />
            </div>
        </div>
    );
};

export default PolaroidDecoration;
