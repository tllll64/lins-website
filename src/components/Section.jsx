import React from 'react';
import { colors, spacing, typography } from '../design-system/tokens';
import { useMediaQuery } from '../design-system/hooks/useMediaQuery';

export const Section = ({ title, subtitle, children, className = "", dark = false }) => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isTablet = useMediaQuery('(max-width: 1024px)');

    const sectionStyle = {
        paddingTop: spacing[56],
        paddingBottom: spacing[56],
        background: dark ? colors.black.solid : 'transparent',
        color: dark ? colors.white.solid : 'inherit',
        ...(className ? {} : {})
    };

    const containerStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        paddingLeft: isMobile ? spacing[32] : spacing[56],
        paddingRight: isMobile ? spacing[32] : spacing[56]
    };

    const headerStyle = {
        marginBottom: spacing[32]
    };

    const titleStyle = {
        fontFamily: typography.heading1.fontFamily,
        fontSize: isMobile ? '36px' : isTablet ? '48px' : typography.heading1.fontSize,
        fontWeight: typography.heading1.fontWeight,
        lineHeight: typography.heading1.lineHeight,
        letterSpacing: typography.heading1.letterSpacing,
        color: dark ? colors.white.solid : colors.grey[9],
        marginBottom: spacing[16]
    };

    const subtitleStyle = {
        fontFamily: typography.body.fontFamily,
        fontSize: typography.body.fontSize,
        fontWeight: typography.body.fontWeight,
        lineHeight: typography.body.lineHeight,
        letterSpacing: typography.body.letterSpacing,
        color: colors.grey[56]
    };

    return (
        <section style={sectionStyle} className={className}>
            <div style={containerStyle}>
                {(title || subtitle) && (
                    <div style={headerStyle}>
                        {title && (
                            <h2 style={titleStyle}>
                                {title}
                            </h2>
                        )}
                        {subtitle && (
                            <p style={subtitleStyle}>
                                {subtitle}
                            </p>
                        )}
                    </div>
                )}
                {children}
            </div>
        </section>
    );
};
