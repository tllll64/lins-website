import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { colors, spacing, typography, fontWeight } from '../design-system/tokens';
import { useMediaQuery } from '../design-system/hooks/useMediaQuery';

export const Navbar = ({ theme = 'light' }) => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const location = useLocation();

    const isDark = theme === 'dark';
    const textColor = isDark ? colors.white.solid : colors.grey[56];
    const activeColor = isDark ? colors.white.solid : colors.grey[9];
    const hoverColor = isDark ? colors.grey[40] : colors.grey[9]; // On dark bg, hover to dim? Or hover to white?
    // User wants: "In black background... improve readability (change font color)"
    // Typically on dark bg: Default White, Hover slightly dimmer or accent?
    // Let's stick to: Default White (high contrast), Active White, Hover Grey.
    // Wait, on light bg: Default Grey56, Active Grey9 (Darker), Hover Grey9 (Darker).
    // On dark bg: Default Grey66 (dim), Active White, Hover White?
    // Let's try: Default White (solid), Hover Grey (dimmer).
    
    // Adjusted logic:
    // Light Theme: Default Grey56, Hover/Active Grey9.
    // Dark Theme: Default Grey66 (readable on black), Hover/Active White.
    
    // Actually user said "improve readability".
    // Maybe Default White is better for readability on black.
    // Let's use:
    // Dark Theme: Default colors.grey[66] (Light Grey), Hover/Active colors.white.solid.
    
    const baseColor = isDark ? colors.grey[63] : colors.grey[56];
    const highlightColor = isDark ? colors.white.solid : colors.grey[9];

    const navStyle = {
        position: 'fixed',
        top: spacing.lg,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        background: isDark ? 'rgba(30, 30, 30, 0.7)' : `${colors.grey[98]}80`, // Slight adjustment for dark mode bg?
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : colors.grey[92]}`, // Adjust border for dark mode visibility?
        borderRadius: '9999px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        transition: 'all 0.3s ease',
        width: 'auto',
        maxWidth: '90%'
    };

    const containerStyle = {
        paddingLeft: spacing.xl,
        paddingRight: spacing.xl,
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.md,
        fontFamily: typography.body.fontFamily,
        fontSize: typography.body.fontSize,
        fontWeight: fontWeight.medium,
        color: baseColor,
        letterSpacing: '0.05em',
        transition: 'color 0.3s ease'
    };

    const getLinkStyle = (isActive) => ({
        color: isActive ? highlightColor : baseColor,
        textDecoration: 'none',
        transition: 'color 0.2s ease',
        cursor: 'pointer'
    });

    const handleMouseEnter = (e, isActive) => {
        if (!isActive) e.currentTarget.style.color = highlightColor;
    };

    const handleMouseLeave = (e, isActive) => {
        if (!isActive) e.currentTarget.style.color = baseColor;
    };

    const isWorksActive = location.pathname === '/' && location.hash === '';
    const isResearchActive = location.pathname === '/research';
    const isAboutActive = location.pathname === '/about';

    return (
        <>
            <div 
                className="gradual-blur gradual-blur-fixed" 
                style={{ 
                    zIndex: 40, 
                    bottom: 'auto', 
                    height: '160px' 
                }}
            >
                <div 
                    className="gradual-blur-inner" 
                    style={{ 
                        backdropFilter: 'blur(12px)', 
                        WebkitBackdropFilter: 'blur(12px)', 
                        maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)', 
                        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)' 
                    }}
                >
                    <div></div>
                </div>
            </div>
            <nav style={navStyle}>
                <div style={containerStyle}>
                    <Link 
                        to="/" 
                        style={getLinkStyle(isWorksActive)} 
                        onMouseEnter={(e) => handleMouseEnter(e, isWorksActive)} 
                        onMouseLeave={(e) => handleMouseLeave(e, isWorksActive)}
                    >
                        Works
                    </Link>
                    <Link 
                        to="/research" 
                        style={getLinkStyle(isResearchActive)} 
                        onMouseEnter={(e) => handleMouseEnter(e, isResearchActive)} 
                        onMouseLeave={(e) => handleMouseLeave(e, isResearchActive)}
                    >
                        Research
                    </Link>
                    <Link 
                        to="/about" 
                        style={getLinkStyle(isAboutActive)} 
                        onMouseEnter={(e) => handleMouseEnter(e, isAboutActive)} 
                        onMouseLeave={(e) => handleMouseLeave(e, isAboutActive)}
                    >
                        About
                    </Link>
                    <a 
                        href="#" 
                        style={getLinkStyle(false)} 
                        onMouseEnter={(e) => handleMouseEnter(e, false)} 
                        onMouseLeave={(e) => handleMouseLeave(e, false)}
                    >
                        Resume
                    </a>
                </div>
            </nav>
        </>
    );
};
