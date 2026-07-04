import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { colors, spacing, typography, fontWeight } from '../design-system/tokens';

export const Navbar = ({ theme = 'light' }) => {
    const location = useLocation();
    const [isHidden, setIsHidden] = useState(false);
    const lastScrollYRef = useRef(0);
    const isHiddenRef = useRef(false);

    useEffect(() => {
        const hideThreshold = 8;
        const showThreshold = 8;
        const topRevealOffset = 80;

        const onScroll = () => {
            const currentY = window.scrollY;
            const delta = currentY - lastScrollYRef.current;

            if (currentY < topRevealOffset) {
                if (isHiddenRef.current) {
                    isHiddenRef.current = false;
                    setIsHidden(false);
                }
            } else if (delta > hideThreshold) {
                if (!isHiddenRef.current) {
                    isHiddenRef.current = true;
                    setIsHidden(true);
                }
            } else if (delta < -showThreshold) {
                if (isHiddenRef.current) {
                    isHiddenRef.current = false;
                    setIsHidden(false);
                }
            }

            lastScrollYRef.current = currentY;
        };

        const onScrollWithRaf = () => {
            window.requestAnimationFrame(onScroll);
        };

        window.addEventListener('scroll', onScrollWithRaf, { passive: true });
        return () => window.removeEventListener('scroll', onScrollWithRaf);
    }, []);

    const isDark = theme === 'dark';
    const baseColor = isDark ? colors.grey[63] : colors.grey[56];
    const highlightColor = isDark ? colors.white.solid : colors.grey[9];

    const pillBase = {
        background: isDark ? 'rgba(30, 30, 30, 0.7)' : '#FFFFFF',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : colors.grey[92]}`,
        borderRadius: '6px',
        transition: 'background 0.3s ease, border-color 0.3s ease',
    };

    const wrapperStyle = {
        position: 'fixed',
        top: '24px',
        left: '50%',
        transform: `translateX(-50%) translateY(${isHidden ? '-120%' : '0'})`,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        gap: spacing.sm,
        opacity: isHidden ? 0 : 1,
        transition: 'transform 0.28s ease, opacity 0.28s ease',
    };

    const containerStyle = {
        paddingLeft: spacing.xl,
        paddingRight: spacing.xl,
        height: '44px',
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

    const THUMB_SIZE = 34;
    const BUBBLE_PAD = 5;

    const isEchoActive = location.pathname === '/echo';
    const isAboutActive = location.pathname === '/about';

    const aboutBubbleStyle = {
        ...pillBase,
        height: `${THUMB_SIZE + BUBBLE_PAD * 2}px`,
        paddingLeft: spacing.lg,
        paddingRight: spacing.lg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        fontFamily: typography.body.fontFamily,
        fontSize: typography.body.fontSize,
        fontWeight: fontWeight.medium,
        letterSpacing: '0.05em',
        color: isAboutActive ? highlightColor : baseColor,
        transition: 'color 0.2s ease, background 0.3s ease, border-color 0.3s ease',
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
    const isSandboxActive = location.pathname === '/sandbox';

    return (
        <div style={wrapperStyle}>
            <nav style={pillBase}>
                <div style={containerStyle}>
                    <Link
                        to="/"
                        style={getLinkStyle(isWorksActive)}
                        onMouseEnter={(e) => handleMouseEnter(e, isWorksActive)}
                        onMouseLeave={(e) => handleMouseLeave(e, isWorksActive)}
                    >
                        Design
                    </Link>
                    <Link
                        to="/sandbox"
                        style={getLinkStyle(isSandboxActive)}
                        onMouseEnter={(e) => handleMouseEnter(e, isSandboxActive)}
                        onMouseLeave={(e) => handleMouseLeave(e, isSandboxActive)}
                    >
                        Creative
                    </Link>
                    <Link
                        to="/echo"
                        style={getLinkStyle(isEchoActive)}
                        onMouseEnter={(e) => handleMouseEnter(e, isEchoActive)}
                        onMouseLeave={(e) => handleMouseLeave(e, isEchoActive)}
                    >
                        Research
                    </Link>
                </div>
            </nav>

            {/* About — standalone pill on the right */}
            <Link to="/about" style={{ textDecoration: 'none' }}>
                <div
                    style={aboutBubbleStyle}
                    onMouseEnter={(e) => { if (!isAboutActive) e.currentTarget.style.color = highlightColor; }}
                    onMouseLeave={(e) => { if (!isAboutActive) e.currentTarget.style.color = baseColor; }}
                >
                    About
                </div>
            </Link>

        </div>
    );
};
