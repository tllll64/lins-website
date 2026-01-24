import React from 'react';
import { Card } from '../design-system/components';
import { colors, spacing, typography, stackSpacing, componentSpacing } from '../design-system/tokens';
import { ArrowRight } from 'lucide-react';

export const ProjectCard = ({ title, subtitle, image, link, className = "" }) => {
    return (
        <div className={`group relative block w-full ${className}`}>
            <Card variant="outlined" padding="none">
                <div style={{ position: 'relative' }}>
                    <div style={{
                        aspectRatio: '16/9',
                        width: '100%',
                        overflow: 'hidden',
                        background: colors.grey[95]
                    }}>
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

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: componentSpacing.card.padding.lg
                    }}>
                        <div>
                            <h3 style={{
                                fontFamily: typography.heading3.fontFamily,
                                fontSize: typography.heading3.fontSize,
                                fontWeight: typography.heading3.fontWeight,
                                lineHeight: typography.heading3.lineHeight,
                                letterSpacing: typography.heading3.letterSpacing,
                                color: colors.grey[9],
                                marginBottom: stackSpacing.md
                            }}>
                                {title}
                            </h3>
                            {subtitle && (
                                <p style={{
                                    fontFamily: typography.body.fontFamily,
                                    fontSize: typography.body.fontSize,
                                    fontWeight: typography.body.fontWeight,
                                    lineHeight: typography.body.lineHeight,
                                    letterSpacing: typography.body.letterSpacing,
                                    color: colors.grey[56]
                                }}>
                                    {subtitle}
                                </p>
                            )}
                        </div>

                        <div style={{
                            opacity: '0',
                            transform: 'translateX(-16px)',
                            transition: 'all 0.3s ease'
                        }} className="group-hover:opacity-100 group-hover:translate-x-0">
                            <ArrowRight style={{ color: colors.grey[9] }} />
                        </div>
                    </div>
                </div>
            </Card>
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
