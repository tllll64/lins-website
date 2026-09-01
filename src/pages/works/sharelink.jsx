import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLenis } from 'lenis/react';
import { Navbar } from '../../components/Navbar';
import ZoomableImage from '../../components/ZoomableImage';
import { useZoom } from '../../contexts/ZoomContext';
import { typography } from '../../design-system/tokens';
import { useMediaQuery } from '../../design-system/hooks/useMediaQuery';
import sharelinkCover from '../../assets/works/sharelink/sharelink.webp';

/* 汇款人链路 Before / After 对比素材 */
import huikuanrenBefore from '../../assets/works/sharelink/汇款人-Before.webp';
import huikuanrenAfter from '../../assets/works/sharelink/汇款人-After.webp';
import huikuanrenDuibi from '../../assets/works/sharelink/汇款人前后对比-5000.webp';

/* 收款人链路 Before / After 对比素材 */
import shoukuanrenBefore from '../../assets/works/sharelink/收款人-Before.webp';
import shoukuanrenAfter from '../../assets/works/sharelink/收款人-After.webp';
import shoukuanrenDuibi from '../../assets/works/sharelink/收款人前后对比-5000.webp';

/* 用户调研：用户链路图（高分辨率 WebP，保证放大后清晰） */
import yonghulianlutu from '../../assets/works/sharelink/用户链路图-6000.webp';

/* 业务遇到问题：转化漏斗图（当前未使用，后续如需配图再启用） */
/* import loudou from '../../assets/works/sharelink/漏斗.webp'; */

/* 业务遇到的问题 1 */
import yewuwenti1 from '../../assets/works/sharelink/业务问题 1-隐藏数据.webp';
/* 业务遇到的问题 2 */
import yewuwenti2 from '../../assets/works/sharelink/业务问题 2.webp';
/* 业务遇到的问题 3 */
import yewuwenti3 from '../../assets/works/sharelink/业务问题 3.webp';
/* 业务目标（当前未使用，后续如需再启用） */
/* import yewumubiao from '../../assets/works/sharelink/业务目标.webp'; */

/* 设计目标（隐藏数据版） */
import shejimubiao from '../../assets/works/sharelink/设计目标-隐藏数据-6000.webp';

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

/* 封面样式 */
import fengmianyangshi from '../../assets/works/sharelink/封面样式-6000.webp';

/* AI 原型 */
import aiyuanxing from '../../assets/works/sharelink/AI 原型.webp';

/* 通知收款页变体 */
import tongzhiBianti from '../../assets/works/sharelink/通知收款页变体-8000.webp';

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
    { label: '角色', value: '设计自驱 UX Lead' },
    { label: '时间', value: '2026.06–2026.08' },
];

/* Before / After 对比案例（顺序：机构通知页 → 中转 H5 → 通知收款页 → 通知卡片 → 收款页） */
const beforeAfterCases = [
    {
        title: '机构通知页',
        description:
            '改前，通知按钮只在到达通知节点时才出现，用户容易错过最佳通知时机（比如看到按钮前就退出机构页）。\n\n改后，将按钮常驻于页面底部，通过 tooltip 主动引导用户关注，并以「前往微信通知、对方一键收款」的文案传递利益点。',
        note: '设计目标：建立场景认知 引导用户进入通知流程（现状转化率 58%）',
        before: jigouBefore,
        after: jigouAfter,
        afterGallery: [jigouAfter1, jigouAfter2],
    },
    {
        title: '中转 H5',
        description:
            '中转 H5 作为衔接页，用户停留时间极短，但仍然需要对齐前后页面的预期与目标。\n\n改前，行动目标文案冗长、自收与他收混淆、兜底操作抢占视觉焦点；改后，通过跳转图示与收敛文案，明确「跳转微信」的方向与「通知收款人」的目标，将兜底操作收敛为精简文字链，把视觉重心留给「打开微信」这一核心行动项。',
        note: '设计目标：建立场景认知 引导用户进入通知流程（现状转化率 58%）',
        before: zhongzhuanBefore,
        after: zhongzhuanAfter,
    },
    {
        title: '通知收款页',
        description:
            '这是用户从机构跳转至微信的落地页，仍须围绕「通知收款人」这一核心目标展开。\n\n改前，最关键的「通知收款人」行动项被淹没在汇款信息与封面样式中，用户注意力被大量分散，行动迟疑。改后，页面层级更清晰，聚焦首要的通知任务——顶部以一句文案点明目标；中部将「看选封面」一体化展示，并带入收款人视角收敛必要信息；底部将「提醒收款人」行动项区隔出来展示。',
        note: '设计目标：聚焦通知任务 减少非核心信息干扰（现状转化率 72%）',
        before: tongzhiShoukuanBefore,
        after: tongzhiShoukuanAfter,
        expandable: {
            title: '历史方案迭代',
            image: tongzhiBianti,
        },
    },
    {
        title: '通知卡片',
        description:
            '在收款人视角下，通知卡片的信息与样式直接决定其是否愿意打开。\n\n改前，通知文案带有明显的负向催促与机械指令感，基本信息重复，且露出非关键的汇款信息，削弱了打开意愿。改后，文案转向正向、情感化的牵引，仅保留「谁向我汇了多少钱」这一核心汇款信息，同时呈现平台的官方背书感，建立用户收款的信任。',
        note: '设计目标：激发打开意愿 提升收款通知有效触达（现状转化率 54%）',
        before: tongzhiKapiaBefore,
        after: tongzhiKapiaAfter,
        expandableContent: {
            title: 'AI 原型辅助设计',
            text: '过程中我们尝试以 AI 生成原型的方式发散思路。其中，融入了情感化文案表达的方案尤为打动我，也成为最终项目呈现的重要借鉴。',
            image: aiyuanxing,
        },
    },
    {
        title: '收款页',
        description:
            '收款用户打开通知卡片后，核心目标是查看收款信息，并及时完成收款。\n\n改前，信息传递低效、冗余信息干扰，收款行动被拖延。改后，有用的收款信息分层传递：第一级重点展示最核心的汇款信息（谁向我汇了多少钱）；第二级补充汇款背景（对方通过什么机构汇出了多少原币种金额）。同时将「我要收款」按钮区隔展示，行动点更加明确。',
        note: '设计目标：提升收款信息的场景关联性 激发收款操作（现状转化率 52%）',
        before: shoukuanBefore,
        after: shoukuanAfter,
    },
    {
        title: '收款封面样式',
        description:
            '改前，收款封面提供 3 个通用模板（默认「元气满满」「财源滚滚」），与业务关联弱，用户场景化的需求未被真正满足（非默认封面选择率仅 0.93%）。\n\n改后，封面选择与真实的汇款目的和场景相关联，提供两种样式：（1）赡家款目的——面向亲人问候，以饱含真情的家书问候形式呈现；（2）服货贸目的——面向跨境贸易，以商务、可信赖的回执形式呈现。',
        image: fengmianyangshi,
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
/*  ExpandableImage — 可展开/收起的图片：收起时仅显示标题条，点击展开     */
/*  展开内容：纯图片（src）或 左文右图（text + image）                   */
/* ------------------------------------------------------------------ */
const ExpandableImage = ({ title, src, alt = title, text }) => {
    const [expanded, setExpanded] = useState(false);
    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <div style={{
            marginTop: '20px',
            width: '100%',
            border: `1px solid ${V.line}`,
            borderRadius: '12px',
            background: V.bg,
            overflow: 'hidden',
        }}>
            {/* 标题条：始终可见，点击切换展开/收起 */}
            <button
                onClick={() => setExpanded(prev => !prev)}
                aria-expanded={expanded}
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    padding: '20px 24px',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontFamily: '"Tencent Sans", "Lora", "Times New Roman", Georgia, serif',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: V.ink,
                    textAlign: 'left',
                }}
            >
                <span style={{
                    transform: 'translateY(-2px)',
                }}>{title}</span>
                <span style={{
                    fontFamily: typography.body.fontFamily,
                    fontSize: '13px',
                    color: V.inkMuted,
                    flexShrink: 0,
                }}>
                    {expanded ? '收起' : '展开'}
                </span>
            </button>

            {/* 展开区：左文右图（text 存在时）或纯图片（无灰色承接） */}
            {expanded && (
                text ? (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : '2fr 3fr',
                        gap: isMobile ? '20px' : '40px',
                        alignItems: 'stretch',
                        padding: '28px 24px',
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            <p style={{
                                fontFamily: typography.body.fontFamily,
                                fontSize: isMobile ? '15px' : '16px',
                                lineHeight: isMobile ? '24px' : '28px',
                                color: V.inkSoft,
                                margin: 0,
                                transform: 'translateY(-24px)',
                            }}>
                                {text}
                            </p>
                        </div>
                        {/* 右侧图片：支持放大镜，高度随图片自适应 */}
                        <ZoomableImage
                            src={src}
                            alt={alt}
                            showFrame={false}
                            autoHeight
                            style={{ borderRadius: V.radius }}
                        />
                    </div>
                ) : (
                    <ZoomableImage
                        src={src}
                        alt={alt}
                        showFrame={false}
                        autoHeight
                    />
                )
            )}
        </div>
    );
};

/* ------------------------------------------------------------------ */
/*  ImageCarousel — 多图轮播（左右箭头 + 指示点 + hover 放大镜）          */
/*  showArrows=false 时隐藏左右箭头，仅保留指示点切换                    */
/* ------------------------------------------------------------------ */
const ImageCarousel = ({ images, alt = '图片', showArrows = true, zoom = 1.8, lensSize = 180 }) => {
    const { zoomEnabled } = useZoom();
    const [active, setActive] = useState(0);
    const containerRef = React.useRef(null);
    const lensRef = React.useRef(null);
    const lensImgRef = React.useRef(null);
    const rafRef = React.useRef(null);
    const lastXRef = React.useRef(null);
    const lastYRef = React.useRef(null);

    const prev = () => setActive(prev => (prev - 1 + images.length) % images.length);
    const next = () => setActive(prev => (prev + 1) % images.length);

    // hover 放大镜
    const writeLens = () => {
        rafRef.current = null;
        const container = containerRef.current;
        const lens = lensRef.current;
        const lensImg = lensImgRef.current;
        const x = lastXRef.current;
        const y = lastYRef.current;
        if (!container || !lens || !lensImg || x == null || y == null) return;

        const rect = container.getBoundingClientRect();
        const px = x - rect.left;
        const py = y - rect.top;

        lensImg.style.width = `${rect.width * zoom}px`;
        lensImg.style.height = `${rect.height * zoom}px`;
        lens.style.transform = `translate(${px - lensSize / 2}px, ${py - lensSize / 2}px)`;
        lensImg.style.transform = `translate(${-px * zoom + lensSize / 2}px, ${-py * zoom + lensSize / 2}px)`;
    };

    const onPointerMove = (e) => {
        if (!zoomEnabled || e.pointerType !== 'mouse') return;
        lastXRef.current = e.clientX;
        lastYRef.current = e.clientY;
        if (lensRef.current) lensRef.current.style.opacity = '1';
        if (!rafRef.current) {
            rafRef.current = requestAnimationFrame(writeLens);
        }
    };

    const onPointerLeave = () => {
        if (lensRef.current) lensRef.current.style.opacity = '0';
    };

    React.useEffect(() => {
        if (!zoomEnabled && lensRef.current) {
            lensRef.current.style.opacity = '0';
        }
    }, [zoomEnabled]);

    React.useEffect(() => {
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
            style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '1 / 1',
                overflow: 'hidden',
                background: V.surface2,
                border: `1px solid ${V.line}`,
                borderRadius: V.radius,
            }}
        >
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

            {/* 圆形放大镜镜头 */}
            <div
                ref={lensRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: `${lensSize}px`,
                    height: `${lensSize}px`,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    pointerEvents: 'none',
                    opacity: 0,
                    zIndex: 4,
                    boxShadow: '0 0 0 2px rgba(255,255,255,0.95), 0 8px 24px rgba(0,0,0,0.28)',
                    transition: 'opacity 0.15s ease',
                    willChange: 'transform',
                }}
            >
                <img
                    ref={lensImgRef}
                    src={images[active]}
                    alt=""
                    draggable={false}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        maxWidth: 'none',
                        objectFit: 'contain',
                        display: 'block',
                        willChange: 'transform',
                    }}
                />
            </div>

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
/*  PanoramaViewer — 横向全景浏览 + hover 局部放大镜                    */
/*  全景：图片放大 1.5 倍，左右按钮切换；hover：圆形放大镜 2x            */
/* ------------------------------------------------------------------ */
const PanoramaViewer = ({ src, alt, leftHint = '左侧', rightHint = '右侧', zoom = 1.8, lensSize = 180 }) => {
    const { zoomEnabled } = useZoom();
    const [atRight, setAtRight] = useState(false);
    const containerRef = React.useRef(null);
    const trackRef = React.useRef(null);
    const lensRef = React.useRef(null);
    const lensImgRef = React.useRef(null);
    const rafRef = React.useRef(null);
    const lastXRef = React.useRef(null);
    const lastYRef = React.useRef(null);

    const scrollTo = (right) => {
        setAtRight(right);
    };

    // hover 放大镜：镜头内放大图按轨道实际坐标 × zoom 计算
    const writeLens = () => {
        rafRef.current = null;
        const container = containerRef.current;
        const lens = lensRef.current;
        const lensImg = lensImgRef.current;
        const x = lastXRef.current;
        const y = lastYRef.current;
        if (!container || !lens || !lensImg || x == null || y == null) return;

        const rect = container.getBoundingClientRect();
        const px = x - rect.left; // 指针相对容器坐标
        const py = y - rect.top;
        // 轨道实际位移：atRight 时 translateX(-33.333%) of 轨道(150%容器宽) = 轨道左移 0.5 容器宽，
        // 可见区域显示轨道 [0.5W, 1.5W]，指针对应轨道实际横坐标 = px + 0.5W
        const offset = atRight ? rect.width * 0.5 : 0;
        const imgX = px + offset; // 指针在轨道图中的实际横坐标

        // 镜头内放大图尺寸 = 轨道图宽(1.5×容器) × zoom
        lensImg.style.width = `${rect.width * 1.5 * zoom}px`;
        lensImg.style.height = `${rect.height * zoom}px`;
        // 镜头圆心对准指针
        lens.style.transform = `translate(${px - lensSize / 2}px, ${py - lensSize / 2}px)`;
        // 放大图位移：指针处内容对准镜头中心
        lensImg.style.transform = `translate(${-imgX * zoom + lensSize / 2}px, ${-py * zoom + lensSize / 2}px)`;
    };

    const onPointerMove = (e) => {
        if (!zoomEnabled || e.pointerType !== 'mouse') return;
        lastXRef.current = e.clientX;
        lastYRef.current = e.clientY;
        if (lensRef.current) lensRef.current.style.opacity = '1';
        if (!rafRef.current) {
            rafRef.current = requestAnimationFrame(writeLens);
        }
    };

    const onPointerLeave = () => {
        if (lensRef.current) lensRef.current.style.opacity = '0';
    };

    React.useEffect(() => {
        if (!zoomEnabled && lensRef.current) {
            lensRef.current.style.opacity = '0';
        }
    }, [zoomEnabled]);

    React.useEffect(() => {
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
            style={{
                position: 'relative',
                width: '100%',
                overflow: 'hidden',
                background: V.surface2,
                borderRadius: V.radius,
            }}
        >
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

            {/* 圆形放大镜镜头 */}
            <div
                ref={lensRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: `${lensSize}px`,
                    height: `${lensSize}px`,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    pointerEvents: 'none',
                    opacity: 0,
                    zIndex: 4,
                    boxShadow: '0 0 0 2px rgba(255,255,255,0.95), 0 8px 24px rgba(0,0,0,0.28)',
                    transition: 'opacity 0.15s ease',
                    willChange: 'transform',
                }}
            >
                <img
                    ref={lensImgRef}
                    src={src}
                    alt=""
                    draggable={false}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        maxWidth: 'none',
                        objectFit: 'cover',
                        display: 'block',
                        willChange: 'transform',
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
    // 对比模式：开启时显示滑动对比，关闭时平铺展示两张对比图
    const [compareMode, setCompareMode] = useState(false);

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
                                <div style={{
                                    fontFamily: '"Tencent Sans", "Lora", "Times New Roman", Georgia, serif',
                                    fontSize: '12px',
                                    fontWeight: 500,
                                    letterSpacing: '0.08em',
                                    color: V.inkMuted,
                                    marginBottom: '12px',
                                }}>
                                    {item.label}
                                </div>
                                <div style={{
                                    fontFamily: '"Tencent Sans", "Lora", "Times New Roman", Georgia, serif',
                                    fontSize: isMobile ? '16px' : '19px',
                                    lineHeight: isMobile ? '24px' : '28px',
                                    color: V.ink,
                                    fontWeight: 700,
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
                            maxWidth: '960px',
                        }}>
                            Sharelink 是 TenPay Global 跨境汇款一站式链接汇款机构和微信生态的端到端体验方案。本次设计自驱聚焦自汇他收场景和目标用户，帮助汇款人高效完成通知、收款人顺畅完成收款，进而提升收款成功率。
                        </p>
                    </div>
                </section>

                {/* 5 — Sharelink 是什么 / 理想态用户体验与现状问题 / 设计目标（灰色占位配图） */}
                {[
                    {
                        id: 'project-background',
                        title: 'Sharelink 是什么',
                        description:
                            'Sharelink 是 Tenpay Global 跨境汇款的一项亮点功能，通过简单的 API 集成，实现从汇款机构到微信平台的端到端跳转方案。\n\n相比于短信、邮件等传统的通知方式，Sharelink 依托微信原生的社交分享能力，打造出「汇完款发微信，点一下就能收」的顺畅用户体验，让消息触达更高效、收款路径更顺畅。',
                        image: jieshaoSharelink,
                    },
                    {
                        id: 'business-value',
                        title: '业务遇到了什么问题',
                        description:
                            '尽管 Sharelink 已历经多次改版，整体收款成功率仍偏低（仅 12%）。随着业务发展，Sharelink 链路不再融合「自汇自收」场景，但页面中仍残留相关字段信息。\n\n因此，本轮设计自驱面向的首要业务目标是提升「自汇他收」场景下的收款成功率。',
                    },
                    {
                        id: 'user-research',
                        title: '理想态用户体验与现状问题',
                        description:
                            'Sharelink 主要面向「首次自汇他收」场景。对照理想态用户体验，当前链路仍存在明显问题或提升空间。',
                        image: yonghulianlutu,
                    },
                    {
                        id: 'design-goals',
                        title: '设计目标',
                        description:
                            '设计目标的导出，围绕业务整体目标、理想态用户体验与现存问题展开推导，最终提升收款转化率。\n\n（1）汇款人视角：建立从机构页跳转至微信通知收款人的认知，全程聚焦通知任务，减少页面中非核心信息的干扰。（2）收款人视角：激发收款人对通知卡片的打开意愿，提升通知的有效触达；收款环节则让收款信息更有用、更高效，正向促进收款动作完成。',
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
                            maxWidth: '960px',
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
                            {item.description && item.description.split('\n\n').map((para, i) => (
                                <p key={i} style={{
                                    fontFamily: typography.body.fontFamily,
                                    fontSize: isMobile ? '15px' : '16px',
                                    lineHeight: isMobile ? '24px' : '28px',
                                    color: V.inkSoft,
                                    margin: 0,
                                    marginTop: i === 0 ? 0 : '8px',
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
                        <p style={{
                            fontFamily: typography.body.fontFamily,
                            fontSize: isMobile ? '15px' : '16px',
                            lineHeight: isMobile ? '24px' : '28px',
                            color: V.inkSoft,
                            margin: '20px 0 0',
                            maxWidth: '960px',
                        }}>
                            这个改版项目中，我放弃了「发现问题-解决问题」的常规设计思路，而是从最本质的用户的目标出发，以理想态的用户体验为基准，对页面进行整体重构。
                        </p>
                    </div>

                    {/* Design Execution 首个板块：链路展示（Tab 切换 + 平铺/对比模式） */}
                    <div style={{
                        marginBottom: isMobile ? '72px' : '104px',
                    }}>
                        {/* Tab 切换 + 对比模式按钮 */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: '12px',
                            marginBottom: '28px',
                        }}>
                            <div style={{
                                display: 'flex',
                                gap: '8px',
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

                            {/* 对比模式开关（与左侧 Tab 同款灰度） */}
                            <button
                                onClick={() => setCompareMode(prev => !prev)}
                                aria-label={compareMode ? '关闭对比模式' : '开启对比模式'}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '9px 18px',
                                    border: 'none',
                                    borderRadius: '100px',
                                    background: V.surface2,
                                    cursor: 'pointer',
                                    fontFamily: typography.body.fontFamily,
                                    fontSize: '14px',
                                    fontWeight: 400,
                                    color: V.inkMuted,
                                    letterSpacing: '0.02em',
                                    whiteSpace: 'nowrap',
                                    transition: 'background 0.2s ease',
                                }}
                            >
                                <span>对比模式</span>
                                {/* 开关状态点 */}
                                <span style={{
                                    width: '20px',
                                    height: '12px',
                                    borderRadius: '6px',
                                    background: '#E5E5E5',
                                    position: 'relative',
                                    transition: 'background 0.2s ease',
                                }}>
                                    <span style={{
                                        position: 'absolute',
                                        top: '2px',
                                        left: compareMode ? '10px' : '2px',
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        background: '#A1A1A1',
                                        transition: 'left 0.2s ease',
                                    }} />
                                </span>
                            </button>
                        </div>

                        {/* 展示区：平铺展示前后对比图（默认） / 滑动对比（对比模式开启） */}
                        {activeLinkTab === 0 ? (
                            compareMode ? (
                                <BeforeAfterSlider
                                    beforeSrc={huikuanrenBefore}
                                    afterSrc={huikuanrenAfter}
                                    alt="汇款人链路 Before/After 对比"
                                />
                            ) : (
                                <div style={{
                                    background: V.surface2,
                                    borderRadius: V.radius,
                                    overflow: 'hidden',
                                }}>
                                    <img
                                        src={huikuanrenDuibi}
                                        alt="汇款人链路前后对比"
                                        loading="lazy"
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            display: 'block',
                                        }}
                                    />
                                </div>
                            )
                        ) : (
                            compareMode ? (
                                <BeforeAfterSlider
                                    beforeSrc={shoukuanrenBefore}
                                    afterSrc={shoukuanrenAfter}
                                    alt="收款人链路 Before/After 对比"
                                />
                            ) : (
                                <div style={{
                                    background: V.surface2,
                                    borderRadius: V.radius,
                                    overflow: 'hidden',
                                }}>
                                    <img
                                        src={shoukuanrenDuibi}
                                        alt="收款人链路前后对比"
                                        loading="lazy"
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            display: 'block',
                                        }}
                                    />
                                </div>
                            )
                        )}

                        {/* 提示小字：仅在对比模式开启时显示 */}
                        {compareMode && (
                            <div style={{
                                marginTop: '14px',
                                textAlign: 'center',
                                fontFamily: typography.body.fontFamily,
                                fontSize: '14px',
                                lineHeight: isMobile ? '20px' : '22px',
                                color: 'rgba(0, 0, 0, 0.5)',
                            }}>
                                左右滑动查看 Before / After 页面对比
                            </div>
                        )}
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
                                maxWidth: '960px',
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
                                {item.description.split('\n\n').map((para, i) => (
                                    <p key={i} style={{
                                        fontFamily: typography.body.fontFamily,
                                        fontSize: isMobile ? '15px' : '16px',
                                        lineHeight: isMobile ? '24px' : '28px',
                                        color: V.inkSoft,
                                        margin: 0,
                                        marginTop: i === 0 ? 0 : '8px',
                                    }}>
                                        {para}
                                    </p>
                                ))}
                            </div>

                            {/* Before / After 并排展示；单图 case 直接整幅展示 */}
                            {item.image ? (
                                <div style={{
                                    overflow: 'hidden',
                                    background: V.surface2,
                                    borderRadius: V.radius,
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
                            )}

                            {/* 图片下方居中标注小字 */}
                            {item.note && (
                                <div style={{
                                    marginTop: '14px',
                                    textAlign: 'center',
                                    fontFamily: typography.body.fontFamily,
                                    fontSize: '14px',
                                    lineHeight: isMobile ? '20px' : '22px',
                                    color: 'rgba(0, 0, 0, 0.5)',
                                }}>
                                    {item.note}
                                </div>
                            )}

                            {/* 可展开区：历史方案迭代（纯图片） / AI 原型辅助设计（左文右图） */}
                            {item.expandable && (
                                <ExpandableImage
                                    title={item.expandable.title}
                                    src={item.expandable.image}
                                    alt={item.expandable.title}
                                />
                            )}
                            {item.expandableContent && (
                                <ExpandableImage
                                    title={item.expandableContent.title}
                                    src={item.expandableContent.image}
                                    alt={item.expandableContent.title}
                                    text={item.expandableContent.text}
                                />
                            )}
                        </div>
                    ))}
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
