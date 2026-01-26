import React from 'react';
import { Card } from '../design-system/components';
import { colors, spacing, typography, stackSpacing, componentSpacing } from '../design-system/tokens';
import { ArrowRight } from 'lucide-react';
import { useMediaQuery } from '../design-system/hooks/useMediaQuery';

export const ProjectCard = ({ date, title, description, tags, image, link, className = "" }) => {
    const isMobile = useMediaQuery('(max-width: 768px)');

    const containerStyle = {
        display: 'flex',
        flexDirection: isMobile ? 'column-reverse' : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: spacing.xl,
        width: '100%',
        padding: 0,
        background: 'transparent',
        borderRadius: '24px',
        transition: 'all 0.3s ease'
    };

    const leftContentStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: stackSpacing.md,
        width: isMobile ? '100%' : '33%'
    };

    const rightContentStyle = {
        flex: 2,
        width: isMobile ? '100%' : '67%',
        display: 'flex',
        justifyContent: isMobile ? 'center' : 'flex-end'
    };

    const imageStyle = {
        width: '100%',
        aspectRatio: '16/9',
        borderRadius: '16px',
        overflow: 'hidden',
        background: colors.grey[95],
        position: 'relative'
    };

    const dateStyle = {
        fontFamily: typography.body.fontFamily, // Handwritten style if possible, using body for now or specific token
        fontSize: '16px',
        color: '#FF5733', // Example accent color like in screenshot (orange/red)
        fontStyle: 'italic', // Mimic handwritten feel
        marginBottom: spacing.xs
    };

    const titleStyle = {
        fontFamily: typography.heading2.fontFamily,
        fontSize: '32px',
        fontWeight: typography.heading2.fontWeight,
        lineHeight: typography.heading2.lineHeight,
        color: colors.grey[9],
        marginBottom: spacing.xs
    };

    const descriptionStyle = {
        fontFamily: typography.body.fontFamily,
        fontSize: '16px',
        lineHeight: '1.6',
        color: colors.grey[56],
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
        background: colors.grey[95],
        borderRadius: '8px',
        fontFamily: typography.body.fontFamily,
        fontSize: '14px',
        color: colors.grey[56]
    };

    return (
        <div className={`group relative block w-full ${className}`}>
            <div style={containerStyle}>
                {/* Left Side: Content */}
                <div style={leftContentStyle}>
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

                {/* Right Side: Image */}
                <div style={rightContentStyle}>
                    <div style={imageStyle}>
                         {image && (
                            <img
                                src={image}
                                alt={title}
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                    transition: 'transform 0.7s ease'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            />
                        )}
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
