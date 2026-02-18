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
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <div 
            style={{ 
                position: 'relative', 
                width: '158px', 
                height: '178px',
                transform: `scale(${scale})`,
                transformOrigin: 'center center'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Custom Annotation (Arrow + Text) */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 20,
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 0.3s ease-out',
            }}>
                <svg style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    overflow: 'visible',
                    pointerEvents: 'none'
                }}>
                    <defs>
                        <marker id="forkedArrowPolaroid" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
                           <path d="M 0 2 L 10 6 L 0 10" fill="none" stroke="#000" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </marker>
                    </defs>
                    <path 
                        d="M 145 45 Q 205 10 132 -25" 
                        fill="none" 
                        stroke="#000" 
                        strokeWidth="1.2" 
                        strokeLinecap="round"
                        markerEnd="url(#forkedArrowPolaroid)"
                        style={{
                            transition: 'd 0.3s ease-out'
                        }}
                    />
                </svg>
                
                <div style={{
                    position: 'absolute',
                    top: '-45px', // Above the component
                    left: '50%',
                    transform: 'translateX(-50%)', 
                    width: 'max-content',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '16px',
                    color: '#000',
                    fontWeight: 'normal',
                    pointerEvents: 'none'
                }}>
                    About Me 🙋🏻‍♀️
                </div>
            </div>

            {/* Background Shape: Black with 10% opacity, no shadow, halve opacity on hover */}
            <div style={{
                position: 'absolute',
                top: 4,
                right: 14,
                width: '158px',
                height: '174px',
                backgroundColor: isHovered ? 'rgba(0, 0, 0, 0.05)' : 'rgba(0, 0, 0, 0.1)', // Halved opacity on hover
                borderRadius: '4px',
                transform: 'rotate(-8deg)',
                zIndex: 0,
                transition: 'background-color 0.3s ease'
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
