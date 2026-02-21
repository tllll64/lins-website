import React, { useState } from 'react';
import { Card } from '../design-system/components';
import { colors, spacing, typography, stackSpacing, componentSpacing } from '../design-system/tokens';
import { ArrowRight } from 'lucide-react';
import { useMediaQuery } from '../design-system/hooks/useMediaQuery';
import PixelEye from './PixelEye';

export const ProjectCard = ({ date, title, description, tags, image, link, className = "", customCursor, onClick, logo, pixelPattern, reversed = false }) => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [isHovered, setIsHovered] = useState(false);

    const containerStyle = {
        display: 'flex',
        flexDirection: isMobile ? 'column' : (reversed ? 'row-reverse' : 'row'),
        alignItems: 'stretch',
        justifyContent: 'space-between',
        gap: spacing.md,
        width: '100%',
        padding: 0,
        background: 'transparent',
        borderRadius: '24px',
        transition: 'all 0.3s ease',
        cursor: onClick ? 'pointer' : 'default'
    };

    const leftCoverStyle = {
        flex: 3,
        aspectRatio: '5/3',
        borderRadius: '24px',
        overflow: 'hidden',
        position: 'relative',
        background: colors.grey[95],
        cursor: 'default'
    };

    const rightColumnStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: spacing.md,
        justifyContent: 'space-between'
    };

    const squareBlockStyle = {
        width: '100%',
        aspectRatio: '1/1',
        background: '#fff',
        borderRadius: '24px',
        position: 'relative'
    };

    const dotMatrixStyle = {
        border: '12px solid #fff',
        background: '#fff',
        backgroundClip: 'padding-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    };

    const circleDotMatrixStyle = {
        backgroundImage: `radial-gradient(rgba(229, 229, 229, 0.7) 1.3px, transparent 1.3px)`,
        backgroundSize: '12px 12px',
        backgroundPosition: '0 0',
        border: '12px solid #fff',
        backgroundClip: 'padding-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    const textOverlayStyle = {
        position: 'absolute',
        bottom: spacing.md,
        left: spacing.md,
        right: spacing.md,
        padding: `${spacing.sm} ${spacing.xl}`, // Increased vertical padding (xs->sm) for +8px height
        background: 'rgba(255, 255, 255, 0.8)', // 80% opacity white
        backdropFilter: 'blur(40px)',
        borderRadius: '100px',
        border: '1px solid rgba(0, 0, 0, 0.06)', // Black border with 6% opacity
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: spacing.xs,
        color: colors.grey[9], // Dark text for light background
        opacity: isHovered ? 1 : 0,
        transition: 'all 0.3s ease',
    };

    const imageContainerStyle = {
        height: '100%',
        width: '100%',
        transition: 'all 0.3s ease',
        filter: isHovered ? 'grayscale(100%) brightness(0.7)' : 'none', // Optional: desaturate and darken image
    };

    const headerRowStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: spacing.md,
        width: '100%'
    };

    const titleStyle = {
        fontFamily: typography.heading5.fontFamily,
        fontSize: typography.heading5.fontSize,
        fontWeight: typography.heading5.fontWeight,
        lineHeight: typography.heading5.lineHeight,
        letterSpacing: typography.heading5.letterSpacing,
        color: colors.grey[9], // Changed to dark grey for light overlay
        margin: 0,
        flex: 1
    };

    const descriptionStyle = {
        fontFamily: typography.body.fontFamily,
        fontSize: '16px',
        lineHeight: '1.6',
        color: 'rgba(255, 255, 255, 0.8)', // Lighter white for description
        maxWidth: '480px'
    };

    const tagsContainerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: spacing.sm,
        flexShrink: 0
    };

    const tagStyle = {
        padding: 0,
        background: 'transparent',
        fontFamily: typography.body.fontFamily,
        fontSize: '14px',
        color: colors.grey[9],
        opacity: 0.6 // Slight opacity for hierarchy
    };

    return (
        <div 
            className={`group relative block w-full ${className}`} 
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div style={containerStyle}>
                {/* Left Side: 5:3 Cover with Image and Text */}
                <div 
                    style={leftCoverStyle}
                >
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url(${image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        transition: 'transform 0.5s ease'
                    }} />
                    
                    <div style={textOverlayStyle}>
                        <div style={headerRowStyle}>
                            <h2 style={titleStyle}>{title}</h2>
                            
                            {tags && tags.length > 0 && (
                            <div style={tagsContainerStyle}>
                                <span style={tagStyle}>
                                    {tags.join(' · ')}
                                </span>
                            </div>
                        )}
                        </div>
                        
                        {/* Description removed per user request */}
                    </div>
                </div>
                
                {/* Mobile Title */}
                {isMobile && (
                    <h3 style={{
                        fontFamily: 'Lora, "Times New Roman", Georgia, serif',
                        fontSize: '20px',
                        fontWeight: 600,
                        lineHeight: '28px',
                        color: 'rgb(23, 23, 23)',
                        marginTop: '12px',
                        marginBottom: '12px'
                    }}>
                        {title}
                    </h3>
                )}

                {/* Right Side: Two Square Blocks */}
                <div style={rightColumnStyle}>
                    <div 
                  style={{...squareBlockStyle, ...circleDotMatrixStyle, position: 'relative'}}
                >
                    {logo && (
                      <img 
                        src={logo} 
                        alt="logo" 
                        style={{
                          width: '80%',
                          height: '80%',
                          objectFit: 'contain',
                          filter: isHovered ? 'none' : 'grayscale(100%)',
                          transition: 'filter 0.3s ease'
                        }} 
                      />
                    )}
                  </div>
                    <div style={{...squareBlockStyle, ...dotMatrixStyle}}>
                        {pixelPattern || <PixelEye size={6} gap={2} />}
                    </div>
                </div>
            </div>

            {link && (
                <a
                    href={link}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 10
                    }}
                >
                    <span style={{ position: 'absolute', left: '-9999px' }}>View project</span>
                </a>
            )}
        </div>
    );
};
