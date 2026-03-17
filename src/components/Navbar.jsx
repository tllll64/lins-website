import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { colors, spacing, typography, fontWeight } from '../design-system/tokens';
import { useMediaQuery } from '../design-system/hooks/useMediaQuery';
import { useLanguage } from '../contexts/LanguageContext';

export const Navbar = ({ theme = 'light' }) => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const location = useLocation();
    const [isHidden, setIsHidden] = useState(false);
    const lastScrollYRef = useRef(0);
    const isHiddenRef = useRef(false);
    const { language, toggleLanguage } = useLanguage();

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
        background: isDark ? 'rgba(30, 30, 30, 0.7)' : `${colors.grey[98]}80`,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : colors.grey[92]}`,
        borderRadius: '9999px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        transition: 'background 0.3s ease, border-color 0.3s ease',
    };

    const wrapperStyle = {
        position: 'fixed',
        top: spacing.lg,
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

    const THUMB_SIZE = 38;
    const BUBBLE_PAD = 5;

    const langBubbleStyle = {
        ...pillBase,
        height: `${THUMB_SIZE + BUBBLE_PAD * 2}px`,
        padding: `${BUBBLE_PAD}px`,
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        cursor: 'pointer',
        userSelect: 'none',
        overflow: 'hidden',
    };

    const langThumbStyle = {
        position: 'absolute',
        top: `${BUBBLE_PAD}px`,
        left: language === 'en' ? `${BUBBLE_PAD}px` : `${BUBBLE_PAD + THUMB_SIZE}px`,
        width: `${THUMB_SIZE}px`,
        height: `${THUMB_SIZE}px`,
        borderRadius: '9999px',
        background: isDark ? 'rgba(255,255,255,0.15)' : colors.white.solid,
        boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.12)',
        transition: 'left 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 0,
    };

    const getLangOptionStyle = (isActive) => ({
        width: `${THUMB_SIZE}px`,
        height: `${THUMB_SIZE}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1,
        color: isActive ? highlightColor : baseColor,
        fontFamily: typography.body.fontFamily,
        fontSize: typography.body.fontSize,
        fontWeight: fontWeight.medium,
        letterSpacing: '0.05em',
        transition: 'color 0.25s ease',
    });

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
    const isAboutActive = location.pathname === '/about';

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
                        Works
                    </Link>
                    <Link
                        to="/about"
                        style={getLinkStyle(isAboutActive)}
                        onMouseEnter={(e) => handleMouseEnter(e, isAboutActive)}
                        onMouseLeave={(e) => handleMouseLeave(e, isAboutActive)}
                    >
                        About
                    </Link>
                    <Link
                        to="/sandbox"
                        style={getLinkStyle(isSandboxActive)}
                        onMouseEnter={(e) => handleMouseEnter(e, isSandboxActive)}
                        onMouseLeave={(e) => handleMouseLeave(e, isSandboxActive)}
                    >
                        Sandbox
                    </Link>
                </div>
            </nav>

            <div style={langBubbleStyle} onClick={toggleLanguage}>
                <div style={langThumbStyle} />
                <span style={getLangOptionStyle(language === 'en')}>EN</span>
                <span style={getLangOptionStyle(language === 'zh')}>CN</span>
            </div>
        </div>
    );
};
