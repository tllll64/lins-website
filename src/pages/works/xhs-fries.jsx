import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { typography } from '../../design-system/tokens';
import { useMediaQuery } from '../../design-system/hooks/useMediaQuery';
import xhsCover from '../../assets/works/xhs-fries/cover.png';
import { FIGMA_EMBEDS } from '../../constants/figmaEmbeds';

/* ------------------------------------------------------------------ */
/*  Vercel designmd — monochrome token set                             */
/* ------------------------------------------------------------------ */
const V = {
    bg: '#FFFFFF',
    ink: '#000000',
    inkSoft: '#333333',
    inkMuted: '#6B6B6B',
    line: '#E8E8E8',
    lineSoft: '#F0F0F0',
    surface: '#FAFAFA',
    surface2: '#F5F5F5',
    radius: '8px',
};

const FIGMA_EMBED_URL = FIGMA_EMBEDS.xhsFries;

const projectFacts = [
    { label: 'Context', value: '小红书 薯条' },
    { label: 'Status', value: '已上线' },
    { label: 'My Role', value: 'UX Lead' },
    { label: 'Year', value: '2025.06–08' },
];

/* Micro label — the signature Vercel "eyebrow" */
const Eyebrow = ({ children, style = {} }) => (
    <div style={{
        fontFamily: typography.body.fontFamily,
        fontSize: '12px',
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: V.inkMuted,
        ...style,
    }}>
        {children}
    </div>
);

/* ------------------------------------------------------------------ */
/*  Cover — project cover image (5:3, proportional)                    */
/* ------------------------------------------------------------------ */
const Cover = () => (
    <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '5 / 3',
        overflow: 'hidden',
        background: V.surface,
        border: `1px solid ${V.line}`,
        borderRadius: V.radius,
    }}>
        <img
            src={xhsCover}
            alt="薯条加热权益保障放心投 封面"
            style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
            }}
        />
    </div>
);

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export const XhsFries = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isUltraWide = useMediaQuery('(min-width: 1728px)');
    const isDesktop = useMediaQuery('(min-width: 1400px)');
    const isLaptop = useMediaQuery('(min-width: 1100px)');

    // Framer-style tiered content width (mirrors diana.lu/tiktok):
    // ≥1728 → near full-bleed · ≥1400 → 1400px · ≥1100 → 1100px · smaller → fill padded area
    const containerMax = isUltraWide ? 'calc(100vw - 48px)' : isDesktop ? '1400px' : isLaptop ? '1100px' : '100%';

    return (
        <div style={{
            minHeight: '100vh',
            background: V.bg,
            color: V.ink,
            paddingBottom: isMobile ? '80px' : '128px',
        }}>
            <Navbar theme="light" />

            <main>
                {/* 1 — Project name */}
                <section style={{ padding: isMobile ? '112px 24px 48px' : '150px 32px 80px' }}>
                    <div style={{ maxWidth: containerMax, margin: '0 auto' }}>
                        <Eyebrow style={{ marginBottom: '24px' }}>
                            Product Design
                        </Eyebrow>
                        <h1 style={{
                            fontFamily: 'Lora, "Times New Roman", Georgia, serif',
                            fontWeight: 600,
                            letterSpacing: '-0.03em',
                            color: V.ink,
                            margin: 0,
                        }}>
                            <span style={{
                                display: 'block',
                                fontSize: isMobile ? '32px' : '64px',
                                lineHeight: isMobile ? '40px' : '72px',
                                letterSpacing: '-0.03em',
                                whiteSpace: 'nowrap',
                            }}>
                                薯条加热权益保障放心投
                            </span>
                        </h1>
                    </div>
                </section>

                {/* 2 — Basic info */}
                <section>
                    <div style={{
                        maxWidth: containerMax,
                        margin: '0 auto',
                        borderTop: `1px solid ${V.line}`,
                        borderBottom: `1px solid ${V.line}`,
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
                    }}>
                        {projectFacts.map((item, index) => (
                            <div
                                key={item.label}
                                style={{
                                    minHeight: isMobile ? '96px' : '120px',
                                    padding: isMobile ? '20px 14px' : '26px 24px',
                                    borderRight: (index === projectFacts.length - 1) || (isMobile && index % 2 === 1)
                                        ? 'none'
                                        : `1px solid ${V.line}`,
                                    borderBottom: isMobile && index < 2 ? `1px solid ${V.line}` : 'none',
                                }}
                            >
                                <Eyebrow style={{ marginBottom: '12px' }}>
                                    {item.label}
                                </Eyebrow>
                                <div style={{
                                    fontFamily: typography.body.fontFamily,
                                    fontSize: isMobile ? '16px' : '19px',
                                    lineHeight: isMobile ? '24px' : '28px',
                                    color: V.ink,
                                    fontWeight: 500,
                                }}>
                                    {item.value}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3 — Cover */}
                <section style={{
                    maxWidth: containerMax,
                    margin: '0 auto',
                    padding: isMobile ? '36px 24px 0' : '56px 32px 0',
                }}>
                    <Cover />
                </section>

                {/* 4 — Basic intro */}
                <section style={{
                    maxWidth: containerMax,
                    margin: '0 auto',
                    padding: isMobile ? '80px 24px 0' : '120px 32px 0',
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '180px 1fr',
                    gap: isMobile ? '24px' : '72px',
                }}>
                    <Eyebrow style={{ paddingTop: isMobile ? 0 : '14px' }}>
                        Overview
                    </Eyebrow>
                    <div>
                        <p style={{
                            fontFamily: typography.body.fontFamily,
                            fontSize: isMobile ? '16px' : '18px',
                            lineHeight: isMobile ? '26px' : '30px',
                            color: V.inkSoft,
                            margin: 0,
                            marginLeft: 'auto',
                            maxWidth: '680px',
                            paddingRight: isMobile ? '8px' : '16px',
                        }}>
                            针对投放效果差的首要问题，薯条加热业务推出「放心投」权益，设计侧平衡业务诉求与用户痛点，帮助客户发现、理解、决策、感知权益，提升投放意愿。
                        </p>
                    </div>
                </section>

                {/* 5 — Figma link */}
                <section style={{
                    maxWidth: containerMax,
                    margin: '0 auto',
                    padding: isMobile ? '80px 24px 0' : '120px 32px 0',
                }}>
                    <div style={{
                        marginBottom: '20px',
                    }}>
                        <Eyebrow>Presentation</Eyebrow>
                    </div>

                    <div style={{
                        position: 'relative',
                        width: '100%',
                        aspectRatio: '16 / 9',
                        minHeight: '420px',
                        background: V.surface,
                        border: `1px solid ${V.line}`,
                        borderRadius: V.radius,
                        overflow: 'hidden',
                    }}>
                        <iframe
                            title="薯条加热权益保障放心投 Figma prototype"
                            src={FIGMA_EMBED_URL}
                            allowFullScreen
                            style={{
                                width: '100%',
                                height: '100%',
                                border: 0,
                                display: 'block',
                            }}
                        />
                        {/* 遮住 Figma 播放器底部的换页控件 */}
                        <div style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            bottom: 0,
                            height: '48px',
                            background: V.surface,
                            pointerEvents: 'none',
                            zIndex: 1,
                        }} />
                    </div>
                </section>

                {/* Back */}
                <section style={{
                    maxWidth: containerMax,
                    margin: '0 auto',
                    padding: isMobile ? '64px 24px 0' : '88px 32px 0',
                }}>
                    <Link
                        to="/#works"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            fontFamily: typography.body.fontFamily,
                            fontSize: '15px',
                            fontWeight: 500,
                            color: V.ink,
                            textDecoration: 'none',
                            borderBottom: `1px solid ${V.line}`,
                            paddingBottom: '4px',
                            transition: 'border-color 0.15s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.borderColor = V.ink)}
                        onMouseLeave={e => (e.currentTarget.style.borderColor = V.line)}
                    >
                        ← Back to Design
                    </Link>
                </section>
            </main>
        </div>
    );
};
