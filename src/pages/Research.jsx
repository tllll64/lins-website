import React from 'react';
import { Navbar } from '../components/Navbar';
import { colors, layoutSpacing, typography } from '../design-system/tokens';
import { useMediaQuery } from '../design-system/hooks/useMediaQuery';

const SandboxCard = ({ title, date, preview, button, span = 1 }) => {
    return (
        <div style={{
            gridColumn: span > 1 ? `span ${span}` : undefined,
            background: '#fff',
            borderRadius: '12px',
            border: `1px solid ${colors.grey[92]}`,
            padding: '4px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
        }}>
            {/* Media area — preview with title + date overlaid at top */}
            <div style={{
                position: 'relative',
                background: '#fff',
                borderRadius: '8px',
                aspectRatio: '2 / 1',
                overflow: 'hidden',
            }}>
                {/* Title + date overlaid on top of the image */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 2,
                    padding: '10px 12px',
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    gap: '12px',
                    pointerEvents: 'none',
                }}>
                    <span style={{
                        fontFamily: typography.body.fontFamily,
                        fontSize: '15px',
                        fontWeight: 600,
                        color: colors.grey[9],
                        lineHeight: 1.3,
                    }}>
                        {title}
                    </span>
                    {date && (
                        <span style={{
                            fontFamily: typography.body.fontFamily,
                            fontSize: '15px',
                            color: colors.grey[56],
                            whiteSpace: 'nowrap',
                            flexShrink: 0,
                        }}>
                            {date}
                        </span>
                    )}
                </div>

                {/* Preview content */}
                <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    {preview}
                </div>
            </div>

            {/* Full-width button inside card */}
            {button && (
                <button
                    onClick={button.onClick}
                    style={{
                        width: '100%',
                        padding: '9px 16px',
                        background: colors.grey[95],
                        border: 'none',
                        borderRadius: '8px',
                        fontFamily: typography.body.fontFamily,
                        fontSize: '15px',
                        fontWeight: 500,
                        color: colors.grey[16],
                        cursor: button.onClick ? 'pointer' : 'default',
                        transition: 'background 0.15s',
                        textAlign: 'center',
                    }}
                    onMouseEnter={e => {
                        if (button.onClick) e.currentTarget.style.background = colors.grey[92];
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = colors.grey[95];
                    }}
                >
                    {button.label}
                </button>
            )}
        </div>
    );
};

const sandboxItems = [
    {
        title: 'GenFaceUI: Meta-Design Tool',
        date: '2025.02',
        button: { label: 'View Paper →', onClick: () => window.open('https://arxiv.org/abs/2602.11055', '_blank') },
    },
    {
        title: 'Jokeasy: Human-AI Joke Collaboration',
        date: '2024.11',
        button: { label: 'View Paper →' },
    },
    {
        title: 'NothingOS Word Clock',
        date: '2024.12',
        button: { label: 'View Live →' },
    },
    {
        title: '支小宝周边出行探索',
        date: '2024.10',
        button: { label: 'Case Study →', onClick: () => window.open('https://lynntian.framer.website/works/zhi-xiao-bao', '_blank') },
    },
    {
        title: 'Dark Patterns in Screen Reader Accessibility',
        date: '2024.09',
        button: { label: 'View Paper →' },
    },
    {
        title: 'Facial Expression Interface for AI Agents',
        date: '2025.03',
        button: { label: 'View Paper →' },
    },
];

export const Research = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');

    const pageStyle = {
        minHeight: '100vh',
        background: colors.grey[98],
        backgroundImage: `url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='80'%20height='80'%3E%3Crect%20width='1.5'%20height='1.5'%20fill='%23000'/%3E%3C/svg%3E")`,
        backgroundSize: '80px 80px',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
    };

    const containerStyle = {
        width: '100%',
        paddingLeft: isMobile ? layoutSpacing.page.mobile : layoutSpacing.page.desktop,
        paddingRight: isMobile ? layoutSpacing.page.mobile : layoutSpacing.page.desktop,
        paddingTop: '100px',
        paddingBottom: layoutSpacing.section.xl,
    };

    return (
        <div style={pageStyle}>
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>
                <Navbar theme="light" />
            </div>

            <div style={containerStyle}>
                {/* Header — content removed, area reserved for future content */}
                <div style={{
                    minHeight: isMobile ? '54px' : '62px',
                    marginBottom: '40px',
                }} />

                {/* Grid — breaks out of the container padding to sit flush against the screen edges */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                    gap: '8px',
                    alignItems: 'start',
                    marginLeft: isMobile ? `calc(-${layoutSpacing.page.mobile} + 8px)` : `calc(-${layoutSpacing.page.desktop} + 8px)`,
                    marginRight: isMobile ? `calc(-${layoutSpacing.page.mobile} + 8px)` : `calc(-${layoutSpacing.page.desktop} + 8px)`,
                }}>
                    {sandboxItems.map((item, i) => (
                        <SandboxCard key={i} {...item} />
                    ))}
                </div>
            </div>
        </div>
    );
};
