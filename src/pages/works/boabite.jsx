import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { typography } from '../../design-system/tokens';
import { useMediaQuery } from '../../design-system/hooks/useMediaQuery';

/* ------------------------------------------------------------------ */
/*  内页图片：按顺序堆叠展示。新增图片时：                                */
/*  1) 把图片放进 src/assets/works/boabite/（建议 webp，命名续号）       */
/*  2) 在下方 images 数组里加一行 import 并 push                        */
/* ------------------------------------------------------------------ */
import img1 from '../../assets/works/boabite/1.webp';
import img2 from '../../assets/works/boabite/2.webp';
import img3 from '../../assets/works/boabite/3.webp';
import img4 from '../../assets/works/boabite/4.webp';
import img5 from '../../assets/works/boabite/5.webp';
import img6 from '../../assets/works/boabite/6.webp';
import img7 from '../../assets/works/boabite/7.webp';
import img8 from '../../assets/works/boabite/8.webp';

const images = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
];

/* ------------------------------------------------------------------ */
/*  Vercel designmd — monochrome token set（与其它 works 页一致）        */
/* ------------------------------------------------------------------ */
const V = {
    bg: '#FFFFFF',
    ink: '#000000',
    inkMuted: '#6B6B6B',
    line: '#E8E8E8',
    surface: '#FAFAFA',
    radius: '8px',
};

export const BoaBite = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isUltraWide = useMediaQuery('(min-width: 1728px)');
    const isDesktop = useMediaQuery('(min-width: 1400px)');
    const isLaptop = useMediaQuery('(min-width: 1100px)');
    const [demoHover, setDemoHover] = useState(false);

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
                {/* 0 — 体验地址：页面最上方，整块面状入口 */}
                <section style={{ padding: isMobile ? '112px 24px 0' : '150px 32px 0' }}>
                    <a
                        href="https://boabite.lynntian.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => setDemoHover(true)}
                        onMouseLeave={() => setDemoHover(false)}
                        style={{
                            maxWidth: containerMax,
                            margin: '0 auto',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: isMobile ? '16px' : '32px',
                            padding: isMobile ? '20px' : '28px 32px',
                            background: demoHover ? '#F2F2F2' : V.surface,
                            border: `1px solid ${demoHover ? V.ink : V.line}`,
                            borderRadius: V.radius,
                            fontFamily: typography.body.fontFamily,
                            color: V.ink,
                            textDecoration: 'none',
                            transition: 'background 0.2s ease, border-color 0.2s ease',
                        }}
                    >
                        <span style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '6px' : '8px', minWidth: 0 }}>
                            <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontSize: '12px',
                                letterSpacing: '0.1em',
                                color: V.inkMuted,
                            }}>
                                体验地址
                                <span style={{
                                    padding: '2px 6px',
                                    border: `1px solid ${V.line}`,
                                    borderRadius: '100px',
                                    fontSize: '10px',
                                    letterSpacing: '0.08em',
                                    color: V.inkMuted,
                                }}>
                                    LIVE
                                </span>
                            </span>
                            <span style={{
                                fontSize: isMobile ? '20px' : '28px',
                                fontWeight: 600,
                                letterSpacing: '-0.01em',
                                lineHeight: 1.2,
                                wordBreak: 'break-word',
                            }}>
                                boabite.lynntian.com
                            </span>
                            <span style={{ fontSize: '13px', color: V.inkMuted }}>
                                在新窗口打开完整原型
                            </span>
                        </span>

                        <span
                            aria-hidden="true"
                            style={{
                                flexShrink: 0,
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: isMobile ? '40px' : '52px',
                                height: isMobile ? '40px' : '52px',
                                borderRadius: '50%',
                                border: `1px solid ${demoHover ? V.ink : V.line}`,
                                background: demoHover ? V.ink : 'transparent',
                                color: demoHover ? '#FFFFFF' : V.ink,
                                fontSize: isMobile ? '16px' : '20px',
                                transition: 'background 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.2s ease',
                                transform: demoHover ? 'translate(2px, -2px)' : 'none',
                            }}
                        >
                            ↗
                        </span>
                    </a>
                </section>

                {/* 1 — 图片堆叠：每张按自身比例通栏展示，不裁剪 */}
                <section style={{ padding: isMobile ? '16px 24px 48px' : '24px 32px 80px' }}>
                    <div style={{ maxWidth: containerMax, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: isMobile ? '16px' : '24px' }}>
                        {images.map((src, i) => (
                            <div key={i} style={{
                                width: '100%',
                                overflow: 'hidden',
                                background: V.surface,
                                border: `1px solid ${V.line}`,
                                borderRadius: V.radius,
                            }}>
                                <img
                                    src={src}
                                    alt={`BoaBite ${i + 1}`}
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        display: 'block',
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Back */}
                <section style={{
                    maxWidth: containerMax,
                    margin: '0 auto',
                    padding: isMobile ? '24px 24px 0' : '32px 32px 0',
                }}>
                    <Link
                        to="/creative"
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
                        ← Back to Creative Works
                    </Link>
                </section>
            </main>
        </div>
    );
};

export default BoaBite;
