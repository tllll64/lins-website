import React from 'react';
import { colors, spacing, typography, stackSpacing, fontWeight } from '../design-system/tokens';
import { useMediaQuery } from '../design-system/hooks/useMediaQuery';

export const PublicationCard = ({ title, authors, venue, links, image }) => {
    const isMobile = useMediaQuery('(max-width: 768px)');

    const containerStyle = {
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'flex-start',
        gap: spacing.xl,
        width: '100%',
        marginBottom: stackSpacing.xl
    };

    const imageContainerStyle = {
        width: isMobile ? '100%' : '280px',
        flexShrink: 0,
        borderRadius: '8px',
        overflow: 'hidden',
        background: colors.grey[92]
    };

    const imageStyle = {
        width: '100%',
        height: 'auto',
        objectFit: 'contain',
        display: 'block',
        borderRadius: '8px'
    };

    const contentStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        justifyContent: 'flex-start',
        paddingTop: isMobile ? 0 : spacing.xs
    };

    const titleStyle = {
        fontFamily: typography.heading1.fontFamily,
        fontSize: '18px',
        fontWeight: fontWeight.bold,
        lineHeight: '1.4',
        color: colors.grey[9],
        whiteSpace: 'pre-line'
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
        color: '#0056b3',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'opacity 0.2s ease'
    };

    return (
        <div style={containerStyle}>
            <div style={imageContainerStyle}>
                {image && <img src={image} alt={title} style={imageStyle} />}
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
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={linkStyle}
                                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
                                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                                >
                                    {link.label}
                                </a>
                                {index < links.length - 1 && <span style={{ color: 'rgba(0, 0, 0, 0.2)' }}>|</span>}
                            </React.Fragment>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
