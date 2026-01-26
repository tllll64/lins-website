import React from 'react';
import { colors, spacing, typography, stackSpacing, fontWeight } from '../design-system/tokens';
import { useMediaQuery } from '../design-system/hooks/useMediaQuery';

export const PublicationCard = ({ title, authors, venue, links, image }) => {
    const isMobile = useMediaQuery('(max-width: 768px)');

    const containerStyle = {
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: spacing.xl,
        width: '100%',
        marginBottom: stackSpacing.xl
    };

    const imageContainerStyle = {
        width: isMobile ? '100%' : '280px',
        flexShrink: 0,
        aspectRatio: '16/9',
        borderRadius: '8px',
        overflow: 'hidden',
        background: colors.grey[92]
    };

    const contentStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: spacing[1], // Reduced from stackSpacing.xs (8px) to 4px
        justifyContent: 'flex-start',
        paddingTop: isMobile ? 0 : spacing.xs
    };

    const titleStyle = {
        fontFamily: typography.body.fontFamily,
        fontSize: '18px',
        fontWeight: fontWeight.bold,
        lineHeight: '1.4',
        color: colors.grey[9]
    };

    const authorsStyle = {
        fontFamily: typography.body.fontFamily,
        fontSize: '15px',
        lineHeight: '1.5',
        color: colors.grey[40]
    };

    const venueStyle = {
        fontFamily: typography.body.fontFamily,
        fontSize: '15px',
        fontWeight: fontWeight.bold,
        fontStyle: 'italic',
        lineHeight: '1.5',
        color: colors.grey[9]
    };

    const linksStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: spacing.xs,
        fontFamily: typography.body.fontFamily,
        fontSize: '14px',
        color: colors.grey[9]
    };

    const linkStyle = {
        color: colors.grey[9],
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'opacity 0.2s ease'
    };

    return (
        <div style={containerStyle}>
            <div style={imageContainerStyle}>
                {/* Image placeholder - always gray block as requested */}
            </div>
            <div style={contentStyle}>
                <h3 style={titleStyle}>{title}</h3>
                <p style={authorsStyle}>{authors}</p>
                <div style={venueStyle}>{venue}</div>
                {links && links.length > 0 && (
                    <div style={linksStyle}>
                        {links.map((link, index) => (
                            <React.Fragment key={index}>
                                <a 
                                    href={link.url} 
                                    style={linkStyle}
                                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
                                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                                >
                                    {link.label}
                                </a>
                                {index < links.length - 1 && <span style={{ color: colors.grey[92] }}>|</span>}
                            </React.Fragment>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
