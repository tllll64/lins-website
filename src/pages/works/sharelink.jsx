import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLenis } from 'lenis/react';
import { Navbar } from '../../components/Navbar';
import ZoomableImage from '../../components/ZoomableImage';
import { typography } from '../../design-system/tokens';
import { useMediaQuery } from '../../design-system/hooks/useMediaQuery';
import sharelinkCover from '../../assets/works/sharelink/cover.svg';

/* 汇款人链路 Before / After 对比素材 */
import huikuanrenBefore from '../../assets/works/sharelink/汇款人-Before-opt.png';
import huikuanrenAfter from '../../assets/works/sharelink/汇款人-After-opt.png';

/* 收款人链路 Before / After 对比素材 */
import shoukuanrenBefore from '../../assets/works/sharelink/收款人-Before-opt.png';
import shoukuanrenAfter from '../../assets/works/sharelink/收款人-After-opt.png';

/* 用户调研：用户链路图（高分辨率 WebP，保证放大后清晰） */
import yonghulianlutu from '../../assets/works/sharelink/用户链路图-6000.webp';

/* 业务遇到问题：转化漏斗图（当前未使用，后续如需配图再启用） */
/* import loudou from '../../assets/works/sharelink/漏斗.webp'; */

/* 业务遇到的问题 1 */
import yewuwenti1 from '../../assets/works/sharelink/业务问题 1.webp';
/* 业务遇到的问题 2 */
import yewuwenti2 from '../../assets/works/sharelink/业务问题 2.webp';
/* 业务遇到的问题 3 */
import yewuwenti3 from '../../assets/works/sharelink/业务问题 3.webp';
/* 业务目标（当前未使用，后续如需再启用） */
/* import yewumubiao from '../../assets/works/sharelink/业务目标.webp'; */

/* 设计目标 */
import shejimubiao from '../../assets/works/sharelink/设计目标-6000.webp';

/* Sharelink 是什么：介绍图 */
import jieshaoSharelink from '../../assets/works/sharelink/介绍 Sharelink-6000.webp';

/* Before / After 对比素材 */
import jigouBefore from '../../assets/works/sharelink/机构通知页-Before.webp';
import jigouAfter from '../../assets/works/sharelink/机构通知页-After.webp';
import jigouAfter1 from '../../assets/works/sharelink/机构通知页-After1.webp';
import jigouAfter2 from '../../assets/works/sharelink/机构通知页-After2.webp';
import zhongzhuanBefore from '../../assets/works/sharelink/中转 H5-Before.webp';
import zhongzhuanAfter from '../../assets/works/sharelink/中转 H5-After.webp';
import tongzhiShoukuanBefore from '../../assets/works/sharelink/通知收款页-Before.webp';
import tongzhiShoukuanAfter from '../../assets/works/sharelink/通知收款页-After.webp';
import tongzhiKapiaBefore from '../../assets/works/sharelink/通知卡片-Before.webp';
import tongzhiKapiaAfter from '../../assets/works/sharelink/通知卡片-After.webp';
import shoukuanBefore from '../../assets/works/sharelink/收款页-Before.webp';
import shoukuanAfter from '../../assets/works/sharelink/收款页-After.webp';

/* ------------------------------------------------------------------ */
/*  Vercel designmd — monochrome token set                             */
/* ------------------------------------------------------------------ */
const V = {
    bg: '#FFFFFF',
    ink: '#000000',
    inkSoft: 'rgba(0, 0, 0, 0.64)',
    inkMuted: '#6B6B6B',
    line: '#E8E8E8',
    lineSoft: '#F0F0F0',
    surface: '#FAFAFA',
    surface2: '#F5F5F5',
    radius: '8px',
};

const projectFacts = [
    { label: '业务', value: 'TenPay Global 跨境汇款' },
    { label: '状态', value: '待开发' },
    { label: '我的角色', value: '设计自驱 UX Lead' },
    { label: '年份', value: '2026.06–2026.08' },
];

/* Before / After 对比案例（顺序：机构通知页 → 中转 H5 → 通知收款页 → 通知卡片 → 收款页） */
const beforeAfterCases = [
    {
        title: '机构通知页',
        description:
            '机构收款后的首条触达页面。优化了信息层级与关键金额的呈现，让用户一眼确认款项状态，减少理解成本。',
        note: '设计目标：建立场景认知 引导用户进入通知流程（现状转化率 58%）',
        before: jigouBefore,
        after: jigouAfter,
        afterGallery: [jigouAfter1, jigouAfter2],
    },
    {
        title: '中转 H5',
        description:
            '资金在途阶段的中转页面。重构了进度反馈与状态说明，缓解等待期的不确定感，明确下一步动作。',
        note: '设计目标：建立场景认知 引导用户进入通知流程（现状转化率 58%）',
        before: zhongzhuanBefore,
        after: zhongzhuanAfter,
    },
    {
        title: '通知收款页',
        description:
            '通知用户查收款项的落地页。梳理了核心信息与操作路径，降低用户从通知到收款的跳转阻力。',
        note: '设计目标：聚焦通知任务 减少非核心信息干扰（现状转化率 72%）',
        before: tongzhiShoukuanBefore,
        after: tongzhiShoukuanAfter,
    },
    {
        title: '通知卡片',
        description:
            '系统通知中的收款提醒卡片。精简文案与排版，突出金额与时效信息，让重要信息不被淹没。',
        note: '设计目标：激发打开意愿 提升收款通知有效触达（现状转化率 54%）',
        before: tongzhiKapiaBefore,
        after: tongzhiKapiaAfter,
    },
    {
        title: '收款页',
        description:
            '用户完成收款的核心页面。强化金额确认与到账反馈，建立资金安全的信任感，同时为后续链路埋下引导。',
        note: '设计目标：提升收款信息的场景关联性 激发收款操作（现状转化率 52%）',
        before: shoukuanBefore,
        after: shoukuanAfter,
    },
];

/* 右侧章节索引（目录）：锚点 id 与显示文案一一对应（只到设计执行，不含各案例） */
const INDEX_ITEMS = [
    { id: 'overview', label: '项目概述' },
    { id: 'project-background', label: '项目背景' },
    { id: 'business-value', label: '业务问题' },
    { id: 'user-research', label: '用户体验问题' },
    { id: 'design-goals', label: '设计目标' },
    { id: 'design-execution', label: '设计执行' },
    { id: 'project-reflection', label: '项目反思' },
];

/* Micro label — the signature Vercel "eyebrow" */
const Eyebrow = ({ children, style = {} }) => (
    <div style={{
        fontFamily: '"Tencent Sans", "Lora", "Times New Roman", Georgia, serif',
        fontSize: '12px',
        fontWeight: 700,
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
            src={sharelinkCover}
            alt="全球汇入 Sharelink 体验优化 封面"
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
/*  ImageCarousel — 多图轮播（左右箭头 + 指示点，1:1 正方形）            */
/*  showArrows=false 时隐藏左右箭头，仅保留指示点切换                    */
/* ------------------------------------------------------------------ */
const ImageCarousel = ({ images, alt = '图片', showArrows = true }) => {
    const [active, setActive] = useState(0);

    const prev = () => setActive(prev => (prev - 1 + images.length) % images.length);
    const next = () => setActive(prev => (prev + 1) % images.length);

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '1 / 1',
            overflow: 'hidden',
            background: V.surface2,
            border: `1px solid ${V.line}`,
            borderRadius: V.radius,
        }}>
            <img
                src={images[active]}
                alt={`${alt} ${active + 1}`}
                loading="lazy"
                draggable={false}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block',
                }}
            />

            {/* 左箭头 */}
            {showArrows && (
                <button
                    onClick={prev}
                    aria-label="上一张"
                    style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        border: 'none',
                        background: 'rgba(255,255,255,0.92)',
                        color: '#000',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        zIndex: 3,
                        transition: 'background 0.2s ease',
                    }}
                >
                    ←
                </button>
            )}

            {/* 右箭头 */}
            {showArrows && (
                <button
                    onClick={next}
                    aria-label="下一张"
                    style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        border: 'none',
                        background: 'rgba(255,255,255,0.92)',
                        color: '#000',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        zIndex: 3,
                        transition: 'background 0.2s ease',
                    }}
                >
                    →
                </button>
            )}

            {/* 指示点 */}
            <div style={{
                position: 'absolute',
                bottom: '12px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '8px',
                zIndex: 3,
            }}>
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setActive(i)}
                        aria-label={`第 ${i + 1} 张`}
                        style={{
                            width: i === active ? '20px' : '6px',
                            height: '6px',
                            borderRadius: '3px',
                            border: 'none',
                            padding: 0,
                            background: i === active ? '#000' : 'rgba(0,0,0,0.25)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

/* ------------------------------------------------------------------ */
/*  BeforeAfterSlider — hover 跟随查看 Before/After 对比               */
/*  事件只记录坐标；rAF 每帧统一计算并写 DOM（不丢帧、不强制布局）       */
/* ------------------------------------------------------------------ */
const BeforeAfterSlider = ({ beforeSrc, afterSrc, alt = 'Before / After 对比' }) => {
    const containerRef = React.useRef(null);
    const beforeLayerRef = React.useRef(null);
    const dividerRef = React.useRef(null);
    const rafRef = React.useRef(null);
    const lastClientXRef = React.useRef(null);

    const writePos = () => {
        rafRef.current = null;
        const el = containerRef.current;
        const x = lastClientXRef.current;
        if (!el || x == null) return;
        const rect = el.getBoundingClientRect();
        const pos = Math.min(100, Math.max(0, ((x - rect.left) / rect.width) * 100));
        if (beforeLayerRef.current) {
            beforeLayerRef.current.style.clipPath = `inset(0 ${100 - pos}% 0 0)`;
        }
        if (dividerRef.current) {
            dividerRef.current.style.left = `${pos}%`;
        }
    };

    // 鼠标 hover 到区域任意位置，分割线即跟随该位置（无需按住）
    const onPointerMove = (e) => {
        lastClientXRef.current = e.clientX;
        if (!rafRef.current) {
            rafRef.current = requestAnimationFrame(writePos);
        }
    };

    React.useEffect(() => {
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            onPointerMove={onPointerMove}
            style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '2.4 / 1',
                overflow: 'hidden',
                background: V.surface2,
                borderRadius: V.radius,
                cursor: 'crosshair',
                touchAction: 'pan-y',
                userSelect: 'none',
                WebkitUserSelect: 'none',
            }}
        >
            {/* Before（底层，完整显示） */}
            <img
                src={beforeSrc}
                alt={alt}
                loading="lazy"
                draggable={false}
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                }}
            />
            {/* After（上层，用 clip-path 裁切右侧，图片本身不位移） */}
            <div
                ref={beforeLayerRef}
                style={{
                    position: 'absolute',
                    inset: 0,
                    clipPath: 'inset(0 50% 0 0)',
                }}
            >
                <img
                    src={afterSrc}
                    alt={`${alt} 改版后`}
                    loading="lazy"
                    draggable={false}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                    }}
                />
            </div>

            {/* 分割线 */}
            <div
                ref={dividerRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: '50%',
                    width: '2px',
                    background: '#fff',
                    transform: 'translateX(-50%)',
                    pointerEvents: 'none',
                }}
            />
        </div>
    );
};

/* ------------------------------------------------------------------ */
/*  PanoramaViewer — 横向全景浏览：图片放大 2 倍，左右按钮切换           */
/*  默认停在左侧；点右侧按钮平滑滚动到右侧，点左侧按钮滚回              */
/* ------------------------------------------------------------------ */
const PanoramaViewer = ({ src, alt, leftHint = '左侧', rightHint = '右侧' }) => {
    const [atRight, setAtRight] = useState(false);
    const trackRef = React.useRef(null);

    const scrollTo = (right) => {
        setAtRight(right);
    };

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
            background: V.surface2,
            borderRadius: V.radius,
        }}>
            {/* 图片轨道：宽 150%，图片占满轨道（= 容器宽 1.5 倍，放大显示） */}
            <div
                ref={trackRef}
                style={{
                    width: '150%',
                    display: 'flex',
                    transform: atRight ? 'translateX(-33.333%)' : 'translateX(0)',
                    transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
            >
                <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    draggable={false}
                    style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                    }}
                />
            </div>

            {/* 左切换按钮 */}
            <button
                onClick={() => scrollTo(false)}
                aria-label={`查看${leftHint}`}
                style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    border: 'none',
                    background: atRight ? '#FFFFFF' : 'rgba(255,255,255,0.85)',
                    color: atRight ? '#000' : 'rgba(0,0,0,0.4)',
                    cursor: atRight ? 'pointer' : 'default',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    zIndex: 3,
                    opacity: atRight ? 1 : 0.85,
                    transition: 'opacity 0.2s ease, background 0.2s ease, color 0.2s ease',
                }}
            >
                ←
            </button>

            {/* 右切换按钮 */}
            <button
                onClick={() => scrollTo(true)}
                aria-label={`查看${rightHint}`}
                style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    border: 'none',
                    background: atRight ? 'rgba(255,255,255,0.85)' : '#FFFFFF',
                    color: atRight ? 'rgba(0,0,0,0.4)' : '#000',
                    cursor: atRight ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    zIndex: 3,
                    opacity: atRight ? 0.85 : 1,
                    transition: 'opacity 0.2s ease, background 0.2s ease, color 0.2s ease',
                }}
            >
                →
            </button>
        </div>
    );
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export const Sharelink = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isUltraWide = useMediaQuery('(min-width: 1728px)');
    const isDesktop = useMediaQuery('(min-width: 1400px)');
    const isLaptop = useMediaQuery('(min-width: 1100px)');
    const showIndex = useMediaQuery('(min-width: 1500px)');
    const lenis = useLenis();

    // 右侧索引：当前高亮章节（scroll-spy）
    const [activeIndex, setActiveIndex] = useState(0);

    // 设计执行首个板块：链路 Tab（汇款人链路 / 收款人链路）
    const [activeLinkTab, setActiveLinkTab] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const probe = window.innerHeight * 0.35; // 视口 35% 处作为探测线
            let current = 0;
            INDEX_ITEMS.forEach((item, i) => {
                const el = document.getElementById(item.id);
                if (el && el.getBoundingClientRect().top <= probe) {
                    current = i;
                }
            });
            setActiveIndex(current);
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (!el) return;
        if (lenis) {
            lenis.scrollTo(el, { offset: -90 });
        } else {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Framer-style tiered content width (mirrors diana.lu/tiktok):
    // 索引可见时（≥1500px）收窄内容宽度，为右侧索引留出固定边栏空间
    const containerMax = showIndex
        ? 'min(1200px, calc(100vw - 280px))'
        : isUltraWide ? 'calc(100vw - 48px)' : isDesktop ? '1400px' : isLaptop ? '1100px' : '100%';

    return (
        <div style={{
            minHeight: '100vh',
            background: V.bg,
            color: V.ink,
            paddingBottom: isMobile ? '80px' : '128px',
        }}>
            <Navbar theme="light" />

            {/* 左侧章节索引（目录）：仅 ≥1500px 显示，垂直居中 */}
            {showIndex && (
                <nav style={{
                    position: 'fixed',
                    left: '28px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 40,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}>
                    {INDEX_ITEMS.map((item, index) => {
                        const isActive = index === activeIndex;
                        return (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                onMouseEnter={e => {
                                    if (!isActive) e.currentTarget.style.color = V.ink;
                                }}
                                onMouseLeave={e => {
                                    if (!isActive) e.currentTarget.style.color = V.inkMuted;
                                }}
                                style={{
                                    display: 'block',
                                    textAlign: 'left',
                                    padding: 0,
                                    border: 'none',
                                    background: 'none',
                                    cursor: 'pointer',
                                    fontFamily: typography.body.fontFamily,
                                    fontSize: '13px',
                                    fontWeight: isActive ? 600 : 400,
                                    letterSpacing: '0.02em',
                                    color: isActive ? V.ink : V.inkMuted,
                                    whiteSpace: 'nowrap',
                                    transition: 'color 0.2s ease, font-weight 0.2s ease',
                                }}
                            >
                                {item.label}
                            </button>
                        );
                    })}
                </nav>
            )}

            <main>
                {/* 1 — Project name */}
                <section style={{ padding: isMobile ? '112px 24px 48px' : '150px 32px 80px' }}>
                    <div style={{ maxWidth: containerMax, margin: '0 auto' }}>
                        <h1 style={{
                            fontFamily: '"Tencent Sans", "Lora", "Times New Roman", Georgia, serif',
                            fontWeight: 600,
                            letterSpacing: '-0.03em',
                            color: V.ink,
                            margin: 0,
                        }}>
                            <span style={{
                                display: 'block',
                                fontSize: isMobile ? '20px' : '34px',
                                lineHeight: isMobile ? '28px' : '44px',
                                fontWeight: 500,
                                letterSpacing: '0.02em',
                                marginBottom: isMobile ? '8px' : '16px',
                            }}>
                                全球汇入-收款端
                            </span>
                            <span style={{
                                display: 'block',
                                fontSize: isMobile ? '34px' : '72px',
                                lineHeight: isMobile ? '46px' : '88px',
                                letterSpacing: '-0.03em',
                                whiteSpace: 'nowrap',
                            }}>
                                <span style={{ fontWeight: 600 }}>Sharelink</span>
                                <span style={{ fontWeight: 700 }}> 体验优化</span>
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
                <section id="overview" style={{
                    maxWidth: containerMax,
                    margin: '0 auto',
                    padding: isMobile ? '80px 24px 0' : '120px 32px 0',
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '180px 1fr',
                    gap: isMobile ? '24px' : '72px',
                    scrollMarginTop: '90px',
                }}>
                    <Eyebrow style={{ paddingTop: isMobile ? 0 : '14px' }}>
                        项目概述
                    </Eyebrow>
                    <div>
                        <p style={{
                            fontFamily: typography.body.fontFamily,
                            fontSize: isMobile ? '16px' : '18px',
                            lineHeight: isMobile ? '26px' : '30px',
                            color: V.inkSoft,
                            margin: 0,
                            marginLeft: 'auto',
                            maxWidth: '800px',
                        }}>
                            Sharelink 全球汇入是 TenPay Global 面向海外用户的资金汇入产品。作为设计自驱项目，
                            围绕用户从发起汇款到资金到账的全流程体验进行梳理与优化，聚焦信息传达的清晰度、
                            进度反馈的确定性，以及异常场景下的引导，降低跨境汇款的认知与操作成本，提升用户的信任感与完成率。
                        </p>
                    </div>
                </section>

                {/* 5 — Sharelink 是什么 / 理想态用户体验与现状问题 / 设计目标（灰色占位配图） */}
                {[
                    {
                        id: 'project-background',
                        title: 'Sharelink 是什么',
                        description:
                            'Sharelink 是财付通 TenPay Global 面向跨境汇款场景的一项功能：每笔汇款会生成一个专属 URL 链接，汇款人可将它分享给收款人，收款人点击链接即可在清晰引导下核对款项并完成收款。\n\n相比短信、邮件等传统通知方式，Sharelink 依托微信社交能力，让通知发生在汇款人与收款人最自然的对话场景中——通知触达率更高、收款路径更短、理解成本更低，从而提升收款转化率。',
                        image: jieshaoSharelink,
                    },
                    {
                        id: 'business-value',
                        title: '业务遇到了什么问题',
                        description:
                            '通过本次体验改版，期望在提升用户收款完成率的基础上，同步改善通知触达与转化链路的关键指标，让 Sharelink 在跨境汇款业务中发挥更大的增长价值。',
                    },
                    {
                        id: 'user-research',
                        title: '理想态用户体验与现状问题',
                        description:
                            '通过用户访谈与行为走查，还原用户从发起汇款到资金到账的完整旅程，定位「看不懂、等得慌、出错了不知道怎么办」等核心痛点，为后续设计方向提供依据。',
                        image: yonghulianlutu,
                    },
                    {
                        id: 'design-goals',
                        title: '设计目标',
                        description:
                            '围绕「信息清晰、进度确定、异常可引导」三个目标展开设计：让关键信息一眼可见，让在途状态持续可预期，让异常场景有明确的下一步指引，从而降低跨境汇款的认知与操作成本。',
                        image: shejimubiao,
                    },
                ].map((item, index) => (
                    <section
                        key={item.id}
                        id={item.id}
                        style={{
                            maxWidth: containerMax,
                            margin: '0 auto',
                            padding: isMobile ? '80px 24px 0' : '120px 32px 0',
                            scrollMarginTop: '90px',
                        }}
                    >
                        {/* 标题 + 描述（描述在标题下方） */}
                        <div style={{
                            marginBottom: '28px',
                            maxWidth: '800px',
                        }}>
                            <Eyebrow style={{ marginBottom: '10px' }}>
                                {String(index + 1).padStart(2, '0')}
                            </Eyebrow>
                            <h2 style={{
                                fontFamily: '"Tencent Sans", "Lora", "Times New Roman", Georgia, serif',
                                fontSize: isMobile ? '28px' : '36px',
                                fontWeight: 600,
                                lineHeight: isMobile ? '36px' : '44px',
                                letterSpacing: '-0.02em',
                                color: V.ink,
                                margin: 0,
                                marginBottom: '28px',
                            }}>
                                {item.title}
                            </h2>
                            {item.description.split('\n\n').map((para, i) => (
                                <p key={i} style={{
                                    fontFamily: typography.body.fontFamily,
                                    fontSize: isMobile ? '15px' : '16px',
                                    lineHeight: isMobile ? '24px' : '28px',
                                    color: V.inkSoft,
                                    margin: 0,
                                    marginTop: i === 0 ? 0 : '16px',
                                }}>
                                    {para}
                                </p>
                            ))}
                        </div>

                        {/* 配图：用户调研用横向全景（左右切换） */}
                        {item.id === 'user-research' && item.image ? (
                            <PanoramaViewer
                                src={item.image}
                                alt={item.title}
                                leftHint="汇款人链路"
                                rightHint="收款人链路"
                            />
                        ) : item.id === 'business-value' ? (
                            /* 业务遇到的问题：左右并排两张图（业务问题 1 / 业务问题 2），下方放业务目标 */
                            <div>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: isMobile ? '10px' : '16px',
                                    alignItems: 'stretch',
                                }}>
                                    <div style={{
                                        background: V.surface2,
                                        borderRadius: V.radius,
                                        overflow: 'hidden',
                                    }}>
                                        <img
                                            src={yewuwenti1}
                                            alt="业务问题 1"
                                            loading="lazy"
                                            style={{
                                                width: '100%',
                                                height: 'auto',
                                                display: 'block',
                                            }}
                                        />
                                    </div>
                                    <div style={{
                                        background: V.surface2,
                                        borderRadius: V.radius,
                                        overflow: 'hidden',
                                    }}>
                                        <img
                                            src={yewuwenti2}
                                            alt="业务问题 2"
                                            loading="lazy"
                                            style={{
                                                width: '100%',
                                                height: 'auto',
                                                display: 'block',
                                            }}
                                        />
                                    </div>
                                </div>
                                {/* 业务问题 3（两张业务问题图下方） */}
                                <div style={{
                                    marginTop: isMobile ? '10px' : '16px',
                                    background: V.surface2,
                                    borderRadius: V.radius,
                                    overflow: 'hidden',
                                }}>
                                    <img
                                        src={yewuwenti3}
                                        alt="业务问题 3"
                                        loading="lazy"
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            display: 'block',
                                        }}
                                    />
                                </div>
                            </div>
                        ) : item.image ? (
                            <div style={{
                                overflow: 'hidden',
                                background: V.surface2,
                                borderRadius: V.radius,
                                maxWidth: item.imageMaxWidth || '100%',
                                margin: item.imageMaxWidth ? '0 auto' : undefined,
                            }}>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    loading="lazy"
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        display: 'block',
                                    }}
                                />
                            </div>
                        ) : (
                            <div style={{
                                aspectRatio: '16 / 9',
                                background: V.surface2,
                                borderRadius: V.radius,
                            }} />
                        )}
                    </section>
                ))}

                {/* 6 — 设计执行对比案例 */}
                <section id="design-execution" style={{
                    maxWidth: containerMax,
                    margin: '0 auto',
                    padding: isMobile ? '80px 24px 0' : '120px 32px 0',
                    scrollMarginTop: '90px',
                }}>
                    <div style={{
                        marginBottom: isMobile ? '40px' : '56px',
                    }}>
                        <Eyebrow style={{ marginBottom: '10px' }}>
                            05
                        </Eyebrow>
                        <h2 style={{
                            fontFamily: '"Tencent Sans", "Lora", "Times New Roman", Georgia, serif',
                            fontSize: isMobile ? '28px' : '36px',
                            fontWeight: 600,
                            lineHeight: isMobile ? '36px' : '44px',
                            letterSpacing: '-0.02em',
                            color: V.ink,
                            margin: 0,
                        }}>
                            设计执行
                        </h2>
                    </div>

                    {/* Design Execution 首个板块：链路展示（无标题无文字，Tab 切换 + 单图 mock） */}
                    <div style={{
                        marginBottom: isMobile ? '72px' : '104px',
                    }}>
                        {/* Tab 切换：汇款人链路 / 收款人链路 */}
                        <div style={{
                            display: 'flex',
                            gap: '8px',
                            marginBottom: '28px',
                        }}>
                            {['汇款人链路', '收款人链路'].map((tab, i) => {
                                const isActive = i === activeLinkTab;
                                return (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveLinkTab(i)}
                                        style={{
                                            padding: '9px 18px',
                                            border: 'none',
                                            borderRadius: '100px',
                                            background: isActive ? V.ink : V.surface2,
                                            color: isActive ? '#fff' : V.inkMuted,
                                            fontFamily: typography.body.fontFamily,
                                            fontSize: '14px',
                                            fontWeight: isActive ? 600 : 400,
                                            cursor: 'pointer',
                                            transition: 'background 0.2s ease, color 0.2s ease',
                                        }}
                                    >
                                        {tab}
                                    </button>
                                );
                            })}
                        </div>

                        {/* 展示区：汇款人 / 收款人链路各自用真实对比图（hover 滑动查看） */}
                        {activeLinkTab === 0 ? (
                            <BeforeAfterSlider
                                beforeSrc={huikuanrenBefore}
                                afterSrc={huikuanrenAfter}
                                alt="汇款人链路 Before/After 对比"
                            />
                        ) : (
                            <BeforeAfterSlider
                                beforeSrc={shoukuanrenBefore}
                                afterSrc={shoukuanrenAfter}
                                alt="收款人链路 Before/After 对比"
                            />
                        )}

                        {/* 提示小字：左右滑动查看 Before/After 对比 */}
                        <div style={{
                            marginTop: '14px',
                            textAlign: 'center',
                            fontFamily: typography.body.fontFamily,
                            fontSize: '13px',
                            color: V.inkMuted,
                            letterSpacing: '0.02em',
                        }}>
                            左右滑动查看 Before / After 页面对比
                        </div>
                    </div>

                    {beforeAfterCases.map((item, index) => (
                        <div
                            key={item.title}
                            id={`case-${index + 1}`}
                            style={{
                                marginBottom: isMobile ? '72px' : '104px',
                                scrollMarginTop: '90px',
                            }}
                        >
                            {/* 标题 + 描述（描述在标题下方） */}
                            <div style={{
                                marginBottom: '28px',
                                maxWidth: '800px',
                            }}>
                                <Eyebrow style={{ marginBottom: '10px' }}>
                                    05-{index + 1}
                                </Eyebrow>
                                <h2 style={{
                                    fontFamily: '"Tencent Sans", "Lora", "Times New Roman", Georgia, serif',
                                    fontSize: isMobile ? '22px' : '30px',
                                    fontWeight: 600,
                                    lineHeight: isMobile ? '30px' : '38px',
                                    letterSpacing: '-0.02em',
                                    color: V.ink,
                                    margin: 0,
                                    marginBottom: '28px',
                                }}>
                                    {item.title}
                                </h2>
                                <p style={{
                                    fontFamily: typography.body.fontFamily,
                                    fontSize: isMobile ? '15px' : '16px',
                                    lineHeight: isMobile ? '24px' : '28px',
                                    color: V.inkSoft,
                                    margin: 0,
                                }}>
                                    {item.description}
                                </p>
                            </div>

                            {/* Before / After 并排展示 */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: isMobile ? '10px' : '16px',
                            }}>
                                <ZoomableImage
                                    src={item.before}
                                    alt={`${item.title} 改版前`}
                                />
                                {item.afterGallery ? (
                                    <ImageCarousel
                                        images={item.afterGallery}
                                        alt={`${item.title} 改版后`}
                                        showArrows={false}
                                    />
                                ) : (
                                    <ZoomableImage
                                        src={item.after}
                                        alt={`${item.title} 改版后`}
                                    />
                                )}
                            </div>

                            {/* 图片下方居中小字 */}
                            {item.note && (
                                <div style={{
                                    marginTop: '14px',
                                    textAlign: 'center',
                                    fontFamily: typography.body.fontFamily,
                                    fontSize: '13px',
                                    lineHeight: isMobile ? '20px' : '22px',
                                    color: V.inkMuted,
                                }}>
                                    {item.note}
                                </div>
                            )}
                        </div>
                    ))}
                </section>

                {/* 6 — 项目反思 */}
                <section id="project-reflection" style={{
                    maxWidth: containerMax,
                    margin: '0 auto',
                    padding: isMobile ? '80px 24px 0' : '120px 32px 0',
                    scrollMarginTop: '90px',
                }}>
                    {/* 标题 + 描述（描述在标题下方） */}
                    <div style={{
                        marginBottom: '28px',
                        maxWidth: '800px',
                    }}>
                        <Eyebrow style={{ marginBottom: '10px' }}>
                            06
                        </Eyebrow>
                        <h2 style={{
                            fontFamily: '"Tencent Sans", "Lora", "Times New Roman", Georgia, serif',
                            fontSize: isMobile ? '28px' : '36px',
                            fontWeight: 600,
                            lineHeight: isMobile ? '36px' : '44px',
                            letterSpacing: '-0.02em',
                            color: V.ink,
                            margin: 0,
                            marginBottom: '28px',
                        }}>
                            项目反思
                        </h2>
                        <p style={{
                            fontFamily: typography.body.fontFamily,
                            fontSize: isMobile ? '15px' : '16px',
                            lineHeight: isMobile ? '24px' : '28px',
                            color: V.inkSoft,
                            margin: 0,
                        }}>
                            在推进过程中沉淀的方法与思考：如何以设计自驱的方式定位体验问题、
                            如何在跨团队协作中推动方案落地、以及验证设计价值的度量方式，作为后续项目的经验积累。
                        </p>
                    </div>

                    {/* 灰色占位配图：无文字、无描边，后续替换为真实素材 */}
                    <div style={{
                        aspectRatio: '16 / 9',
                        background: V.surface2,
                        borderRadius: V.radius,
                    }} />
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
                        ← 返回项目列表
                    </Link>
                </section>
            </main>
        </div>
    );
};
