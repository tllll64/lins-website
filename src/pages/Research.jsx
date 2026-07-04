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
                background: colors.grey[95],
                borderRadius: '8px',
                aspectRatio: span > 1 ? '2/1' : '4/3',
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
                            fontSize: '13px',
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
                    {preview || (
                        <span style={{
                            fontFamily: typography.body.fontFamily,
                            fontSize: '13px',
                            color: colors.grey[63],
                        }}>
                            —
                        </span>
                    )}
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
        date: 'Feb 2025',
        button: { label: 'View Paper →', onClick: () => window.open('https://arxiv.org/abs/2602.11055', '_blank') },
    },
    {
        title: 'Jokeasy: Human-AI Joke Collaboration',
        date: 'Nov 2024',
        button: { label: 'View Paper →' },
    },
    {
        title: 'NothingOS Word Clock',
        date: 'Dec 2024',
        button: { label: 'View Live →' },
    },
    {
        title: '支小宝周边出行探索',
        date: 'Oct 2024',
        button: { label: 'Case Study →', onClick: () => window.open('https://lynntian.framer.website/works/zhi-xiao-bao', '_blank') },
    },
    {
        title: 'Dark Patterns in Screen Reader Accessibility',
        date: 'Sep 2024',
        button: { label: 'View Paper →' },
    },
    {
        title: 'Facial Expression Interface for AI Agents',
        date: 'Mar 2025',
        button: { label: 'View Paper →' },
    },
];

export const Research = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');

    const pageStyle = {
        minHeight: '100vh',
        background: colors.grey[98],
        backgroundImage: `radial-gradient(${colors.grey[92]} 1px, transparent 1px)`,
        backgroundSize: '18px 18px',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
    };

    const containerStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
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
                {/* Header */}
                <div style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    marginBottom: '40px',
                }}>
                    <div>
                        <h1 style={{
                            fontFamily: 'Lora, "Times New Roman", Georgia, serif',
                            fontSize: isMobile ? '28px' : '36px',
                            fontWeight: 400,
                            letterSpacing: '-0.02em',
                            color: colors.grey[9],
                            margin: 0,
                            marginBottom: '6px',
                        }}>
                            Sandbox
                        </h1>
                        <p style={{
                            fontFamily: typography.body.fontFamily,
                            fontSize: '14px',
                            color: colors.grey[50],
                            margin: 0,
                        }}>
                            生成式 AI 方向的探索与实验
                        </p>
                    </div>
                    <span style={{
                        fontFamily: typography.body.fontFamily,
                        fontSize: '13px',
                        color: colors.grey[60],
                    }}>
                        {sandboxItems.length} projects
                    </span>
                </div>

                {/* Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                    gap: '16px',
                    alignItems: 'start',
                }}>
                    {sandboxItems.map((item, i) => (
                        <SandboxCard key={i} {...item} />
                    ))}
                </div>
            </div>
        </div>
    );
};
