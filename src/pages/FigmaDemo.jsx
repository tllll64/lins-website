import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { colors, layoutSpacing, typography } from '../design-system/tokens';
import { useMediaQuery } from '../design-system/hooks/useMediaQuery';

/* ------------------------------------------------------------------ */
/*  FigmaDemo — 通用承接页：YouTube 视频 + iframe 嵌入 Figma 原型      */
/*  样式与侨批详情页一致                                                */
/*  用法：/demo?url=<Figma 链接>&youtube=<YouTube 视频链接或 ID>        */
/* ------------------------------------------------------------------ */

/* 从完整链接或裸 ID 提取 YouTube 视频 ID */
const getYoutubeId = (input) => {
    if (!input) return '';
    const m = String(input).match(
        /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
    );
    return m ? m[1] : String(input);
};

/* 区块小标签（Eyebrow） */
const Eyebrow = ({ children }) => (
    <div style={{
        fontFamily: typography.body.fontFamily,
        fontSize: '12px',
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: colors.grey[56],
    }}>
        {children}
    </div>
);

export const FigmaDemo = () => {
    const [params] = useSearchParams();
    const url = params.get('url') || '';
    const youtubeId = getYoutubeId(params.get('youtube') || '');
    const isMobile = useMediaQuery('(max-width: 768px)');

    // 跟随视口长宽比：媒体框在桌面端随网页尺寸自适应（移动端保持 16:9）
    const [viewport, setViewport] = useState(() => ({
        w: typeof window !== 'undefined' ? window.innerWidth : 1920,
        h: typeof window !== 'undefined' ? window.innerHeight : 1080,
    }));

    useEffect(() => {
        const onResize = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const mediaAspectRatio = isMobile ? '16 / 9' : `${viewport.w} / ${viewport.h}`;

    const embedSrc = url
        ? `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`
        : '';

    return (
        <div style={{
            minHeight: '100vh',
            background: '#fff',
            color: '#000',
            paddingBottom: layoutSpacing.section.xl,
        }}>
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>
                <Navbar theme="light" />
            </div>

            <main style={{
                width: '100%',
                margin: '0 auto',
                paddingTop: '112px',
                paddingLeft: isMobile ? layoutSpacing.page.mobile : layoutSpacing.page.desktop,
                paddingRight: isMobile ? layoutSpacing.page.mobile : layoutSpacing.page.desktop,
            }}>
                {/* Video — YouTube（有链接才显示） */}
                {youtubeId && (
                    <div style={{ marginTop: '40px' }}>
                        <div style={{ marginBottom: '20px' }}>
                            <Eyebrow>Video</Eyebrow>
                        </div>
                        <div style={{
                            position: 'relative',
                            width: '100%',
                            aspectRatio: mediaAspectRatio,
                            minHeight: '420px',
                            background: '#000',
                            border: `1px solid ${colors.grey[92]}`,
                            borderRadius: '8px',
                            overflow: 'hidden',
                        }}>
                            <iframe
                                title="Video"
                                src={`https://www.youtube.com/embed/${youtubeId}`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    border: 0,
                                    display: 'block',
                                }}
                            />
                        </div>
                    </div>
                )}

                {/* Prototype — 与侨批详情页 Presentation 区同款 */}
                <div style={{ marginTop: youtubeId ? '80px' : '40px' }}>
                    <div style={{ marginBottom: '20px' }}>
                        <Eyebrow>Prototype</Eyebrow>
                    </div>

                    {embedSrc ? (
                        <div style={{
                            position: 'relative',
                            width: '100%',
                            aspectRatio: mediaAspectRatio,
                            maxHeight: isMobile ? 'calc(100vh - 80px)' : undefined,
                            minHeight: '420px',
                            background: colors.grey[98],
                            border: `1px solid ${colors.grey[92]}`,
                            borderRadius: '8px',
                            overflow: 'hidden',
                        }}>
                            <iframe
                                title="Prototype"
                                src={embedSrc}
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
                                background: colors.grey[98],
                                pointerEvents: 'none',
                                zIndex: 1,
                            }} />
                        </div>
                    ) : (
                        <div style={{
                            position: 'relative',
                            width: '100%',
                            aspectRatio: mediaAspectRatio,
                            minHeight: '420px',
                            background: colors.grey[98],
                            border: `1px dashed ${colors.grey[56]}`,
                            borderRadius: '8px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            color: colors.grey[56],
                        }}>
                            {/* 伪 Figma 工具栏 */}
                            <div style={{
                                position: 'absolute',
                                top: '16px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '6px 14px',
                                background: '#fff',
                                border: `1px solid ${colors.grey[92]}`,
                                borderRadius: '6px',
                                fontSize: '13px',
                                fontWeight: 600,
                                letterSpacing: '0.04em',
                            }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="10" fill="#1ABCFE" />
                                    <circle cx="12" cy="12" r="5" fill="#0ACF83" />
                                    <circle cx="12" cy="12" r="2" fill="#F24E1E" />
                                </svg>
                                Figma
                            </div>
                            <div style={{ fontSize: '16px', fontWeight: 500 }}>
                                Figma 原型区域
                            </div>
                            <div style={{ fontSize: '13px', opacity: 0.7, textAlign: 'center', padding: '0 24px' }}>
                                原型链接待补充（通过 ?url= 传入后此处展示真实原型）
                            </div>
                        </div>
                    )}
                </div>

                {/* Back — 底部返回链接（与侨批详情页一致） */}
                <div style={{
                    marginTop: isMobile ? '64px' : '88px',
                }}>
                    <Link
                        to="/creative"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            fontFamily: typography.body.fontFamily,
                            fontSize: '15px',
                            fontWeight: 500,
                            color: colors.grey[56],
                            textDecoration: 'none',
                            borderBottom: `1px solid ${colors.grey[92]}`,
                            paddingBottom: '4px',
                            transition: 'border-color 0.15s, color 0.15s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = colors.grey[16]; e.currentTarget.style.color = colors.grey[16]; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = colors.grey[92]; e.currentTarget.style.color = colors.grey[56]; }}
                    >
                        ← Back to Creative
                    </Link>
                </div>
            </main>
        </div>
    );
};
