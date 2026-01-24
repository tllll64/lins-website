import React from 'react';
import { colors, spacing, typography, stackSpacing, width, layoutSpacing } from '../design-system/tokens';
import { useMediaQuery } from '../design-system/hooks/useMediaQuery';

export const Section = ({ title, subtitle, children, className = "", dark = false, style = {} }) => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isTablet = useMediaQuery('(max-width: 1024px)');

    const sectionStyle = {
        paddingTop: layoutSpacing.section.md,
        paddingBottom: layoutSpacing.section.md,
        background: dark ? colors.black.solid : 'transparent',
        color: dark ? colors.white.solid : 'inherit',
        ...style,
        ...(className ? {} : {})
    };

    const containerStyle = {
        maxWidth: width.container.xl,
        margin: '0 auto',
        paddingLeft: isMobile ? layoutSpacing.page.mobile : layoutSpacing.page.desktop,
        paddingRight: isMobile ? layoutSpacing.page.mobile : layoutSpacing.page.desktop
    };

    const headerStyle = {
        marginBottom: stackSpacing.xl
    };

    const titleStyle = {
        fontFamily: typography.heading1.fontFamily,
        fontSize: isMobile ? '36px' : isTablet ? '48px' : typography.heading1.fontSize,
        fontWeight: typography.heading1.fontWeight,
        lineHeight: typography.heading1.lineHeight,
        letterSpacing: '0px',
        color: dark ? colors.white.solid : colors.grey[9],
        marginBottom: stackSpacing.sm
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
