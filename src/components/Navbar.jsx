import React from 'react';
import { Link } from 'react-router-dom';
import { colors, spacing, typography, fontWeight } from '../design-system/tokens';
import { useMediaQuery } from '../design-system/hooks/useMediaQuery';

export const Navbar = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');

    const navStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: `${colors.grey[98]}E6`,
        backdropFilter: 'blur(8px)',
        borderBottom: `1px solid ${colors.grey[92]}`,
        transition: 'all 0.3s ease'
    };

    const containerStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        paddingLeft: isMobile ? spacing[32] : spacing[56],
        paddingRight: isMobile ? spacing[32] : spacing[56],
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: spacing[32],
        fontFamily: typography.body.fontFamily,
        fontSize: typography.body.fontSize,
        fontWeight: fontWeight.medium,
        color: colors.grey[9],
        letterSpacing: '0.05em'
    };

    const linkStyle = {
        color: colors.grey[9],
        textDecoration: 'none',
        transition: 'color 0.2s ease',
        cursor: 'pointer'
    };

    return (
        <nav style={navStyle}>
            <div style={containerStyle}>
                <Link to="/" style={linkStyle} onMouseEnter={(e) => e.currentTarget.style.color = colors.grey[56]} onMouseLeave={(e) => e.currentTarget.style.color = colors.grey[9]}>
                    Works
                </Link>
                <a href="/#explorations" style={linkStyle} onMouseEnter={(e) => e.currentTarget.style.color = colors.grey[56]} onMouseLeave={(e) => e.currentTarget.style.color = colors.grey[9]}>
                    Explorations
                </a>
                <Link to="/about" style={linkStyle} onMouseEnter={(e) => e.currentTarget.style.color = colors.grey[56]} onMouseLeave={(e) => e.currentTarget.style.color = colors.grey[9]}>
                    About
                </Link>
                <a href="#" style={linkStyle} onMouseEnter={(e) => e.currentTarget.style.color = colors.grey[56]} onMouseLeave={(e) => e.currentTarget.style.color = colors.grey[9]}>
                    Resume
                </a>
            </div>
        </nav>
    );
};
