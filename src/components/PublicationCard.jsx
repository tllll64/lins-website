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
        width: isMobile ? '100%' : '336px',
        flexShrink: 0,
        borderRadius: '8px',
        overflow: 'hidden',
        background: colors.grey[16]
    };

    const imageStyle = {
        width: '100%',
        height: 'auto',
        objectFit: 'contain',
        display: 'block'
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
        fontSize: '20px',
        fontWeight: fontWeight.bold,
        lineHeight: '1.6',
        color: colors.grey[93]
    };

    const authorsStyle = {
        fontFamily: typography.body.fontFamily,
        fontSize: '15px',
        lineHeight: '1.5',
        color: colors.grey[63]
    };

    const venueTagStyle = {
        display: 'inline-block',
        width: 'fit-content',
        fontFamily: typography.body.fontFamily,
        fontSize: '14px',
        fontWeight: fontWeight.bold,
        fontStyle: 'normal',
        lineHeight: '1.4',
        color: colors.grey[93],
        background: colors.grey[18],
        borderRadius: '999px',
        padding: '8px 16px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.4)',
        marginBottom: spacing[1]
    };

    const linksStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: spacing.xs,
        marginTop: '6px',
        fontFamily: typography.body.fontFamily,
        fontSize: '14px',
        color: colors.grey[93]
    };

    const linkStyle = {
        color: colors.grey[93],
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'opacity 0.2s ease'
    };

    const highlightName = 'Lin Tian';

    const renderAuthors = (authors) => {
        const parts = String(authors).split(highlightName);
        if (parts.length <= 1) return authors;
        return parts.map((part, i) => (
            <React.Fragment key={i}>
                {part}
                {i < parts.length - 1 && (
                    <span style={{ textDecoration: 'underline', textDecorationThickness: '1.5px' }}>{highlightName}</span>
                )}
            </React.Fragment>
        ));
    };

    return (
        <div style={containerStyle}>
            <div style={imageContainerStyle}>
                {image && <img src={image} alt={title} style={imageStyle} />}
            </div>
            <div style={contentStyle}>
                <div style={venueTagStyle}>{venue}</div>
                <h3 style={titleStyle}>{title}</h3>
                <p style={authorsStyle}>{renderAuthors(authors)}</p>
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
                                {index < links.length - 1 && <span style={{ color: 'rgba(255, 255, 255, 0.25)' }}>|</span>}
                            </React.Fragment>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
