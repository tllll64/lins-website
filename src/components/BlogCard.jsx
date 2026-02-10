import React from 'react';
import { colors, spacing, typography, fontWeight, stackSpacing } from '../design-system/tokens';

export const BlogCard = ({ title, image, className = "" }) => {
    return (
        <div className={`group cursor-pointer text-center ${className}`}>
            <div style={{
                aspectRatio: '4/3',
                width: '100%',
                overflow: 'hidden',
                borderRadius: '12px',
                background: colors.grey[16],
                marginBottom: stackSpacing.md,
                opacity: '0.8',
                transition: 'opacity 0.3s ease'
            }} className="group-hover:opacity-100">
                {image && (
                    <img
                        src={image}
                        alt={title}
                        style={{
                            aspectRatio: '4 / 3',
                            height: '100%',
                            width: '100%',
                            display: 'block',
                            objectFit: 'cover'
                        }}
                    />
                )}
            </div>
            <div>
                <h3 style={{
                    fontFamily: typography.body.fontFamily,
                    fontSize: typography.body.fontSize,
                    fontWeight: fontWeight.medium,
                    lineHeight: typography.body.lineHeight,
                    letterSpacing: typography.body.letterSpacing,
                    color: colors.white.solid,
                    marginBottom: stackSpacing.xs,
                    transition: 'color 0.2s ease'
                }} className="group-hover:text-ds-dusty">
                    {title}
                </h3>
            </div>
        </div>
    );
};
