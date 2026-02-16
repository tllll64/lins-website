import React, { useState } from 'react';
import { Card } from '../design-system/components';
import { colors, spacing, typography, stackSpacing, componentSpacing } from '../design-system/tokens';
import { ArrowRight } from 'lucide-react';
import { useMediaQuery } from '../design-system/hooks/useMediaQuery';
import PixelEye from './PixelEye';

export const ProjectCard = ({ date, title, description, tags, image, link, className = "", customCursor, onClick }) => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [isHovered, setIsHovered] = useState(false);

    const containerStyle = {
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
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
        cursor: customCursor ? `url("${customCursor}"), auto` : 'default'
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
        inset: 0,
        padding: spacing.lg,
        background: 'rgba(0, 0, 0, 0.6)', // Deep gray/black overlay
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        gap: spacing.xs,
        color: '#fff',
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
    };

    const imageContainerStyle = {
        height: '100%',
        width: '100%',
        transition: 'all 0.3s ease',
        filter: isHovered ? 'grayscale(100%) brightness(0.7)' : 'none', // Optional: desaturate and darken image
    };

    const dateStyle = {
        fontFamily: typography.body.fontFamily,
        fontSize: '16px',
        color: '#FF5733', 
        fontStyle: 'italic',
        marginBottom: spacing.xs
    };

    const titleStyle = {
        fontFamily: typography.heading2.fontFamily,
        fontSize: '32px',
        fontWeight: typography.heading2.fontWeight,
        lineHeight: typography.heading2.lineHeight,
        color: '#fff', // Changed to white for overlay
        marginBottom: spacing.xs
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
        marginTop: spacing.md
    };

    const tagStyle = {
        padding: `${spacing.xs} ${spacing.md}`,
        background: 'rgba(255, 255, 255, 0.2)', // Translucent white
        backdropFilter: 'blur(4px)',
        borderRadius: '8px',
        fontFamily: typography.body.fontFamily,
        fontSize: '14px',
        color: '#fff'
    };

    return (
        <div 
            className={`group relative block w-full ${className}`} 
            onClick={onClick}
        >
            <div style={containerStyle}>
                {/* Left Side: 5:3 Cover with Image and Text */}
                <div 
                    style={leftCoverStyle}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {image && (
                        <div style={imageContainerStyle}>
                             <img
                                src={image}
                                alt={title}
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                    transition: 'transform 0.7s ease',
                                    transform: 'scale(1)',
                                    cursor: 'inherit'
                                }}
                            />
                        </div>
                    )}
                    
                    <div style={textOverlayStyle}>
                        {date && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.xs }}>
                                <span style={dateStyle}>{date}</span>
                            </div>
                        )}
                        
                        <h2 style={titleStyle}>{title}</h2>
                        
                        {description && (
                            <p style={descriptionStyle}>
                                {description}
                            </p>
                        )}

                        {tags && tags.length > 0 && (
                            <div style={tagsContainerStyle}>
                                {tags.map((tag, index) => (
                                    <span key={index} style={tagStyle}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side: Two Square Blocks */}
                <div style={rightColumnStyle}>
                    <div style={{...squareBlockStyle, ...circleDotMatrixStyle}}></div>
                    <div style={{...squareBlockStyle, ...dotMatrixStyle}}>
                        <PixelEye size={6} gap={2} />
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
