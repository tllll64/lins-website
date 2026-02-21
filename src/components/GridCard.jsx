import React from 'react';
import { colors, spacing, typography, stackSpacing } from '../design-system/tokens';
import { ArrowRight } from 'lucide-react';
import { useMediaQuery } from '../design-system/hooks/useMediaQuery';

export const GridCard = ({ title, category, image, className = "", onClick }) => {
    const isCompact = useMediaQuery('(max-width: 1024px)');

    return (
        <div className={`group cursor-pointer ${className}`} onClick={onClick}>
            <div style={{
                width: '100%',
                aspectRatio: '4 / 3',
                overflow: 'hidden',
                borderRadius: '16px',
                background: colors.grey[95],
                marginBottom: stackSpacing.md,
                position: 'relative'
            }}>
                {image && (
                    <img
                        src={image}
                        alt={title}
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'block',
                            objectFit: 'cover',
                            transition: 'transform 0.7s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                )}
                <div style={{
                    position: 'absolute',
                    bottom: spacing.lg,
                    right: spacing.lg,
                    background: `${colors.white.solid}E6`,
                    padding: spacing.xs,
                    borderRadius: '50%',
                    opacity: '0',
                    transition: 'opacity 0.3s ease'
                }} className="group-hover:opacity-100">
                    <ArrowRight size={16} style={{ color: colors.grey[9] }} />
                </div>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: isCompact ? 'column' : 'row',
                justifyContent: isCompact ? 'flex-start' : 'space-between',
                alignItems: isCompact ? 'flex-start' : 'center',
                gap: isCompact ? '4px' : '0'
            }}>
                <h3 style={{
                    fontFamily: typography.heading5.fontFamily,
                    fontSize: typography.heading5.fontSize,
                    fontWeight: typography.heading5.fontWeight,
                    lineHeight: typography.heading5.lineHeight,
                    letterSpacing: typography.heading5.letterSpacing,
                    color: colors.grey[9]
                }}>
                    {title}
                </h3>
                <span style={{
                    fontSize: '16px',
                    color: colors.grey[56],
                    letterSpacing: '0.05em'
                }}>
                    {category}
                </span>
            </div>
        </div>
    );
};
