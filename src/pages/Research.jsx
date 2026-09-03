import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { ContactSection } from '../components/ContactSection';
import { ASSETS } from '../constants/assets';
import { colors, layoutSpacing, typography } from '../design-system/tokens';
import { useMediaQuery } from '../design-system/hooks/useMediaQuery';

/* ------------------------------------------------------------------ */
/*  BannerCarousel — 左右滑动 + 圆点切换 + 无限向前循环的轮播            */
/* ------------------------------------------------------------------ */
const BannerCarousel = ({ images, title }) => {
    const [index, setIndex] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [dragX, setDragX] = useState(0);
    const [paused, setPaused] = useState(false);
    const [noTransition, setNoTransition] = useState(false);

    const count = images.length;
    // 末尾克隆第一张，实现“最后一张继续往前翻到第一张”的无限循环
    const slides = [...images, images[0]];
    const realIndex = index % count; // 圆点高亮用

    // 到达克隆位后，等过渡结束再无缝跳回真实第一张
    useEffect(() => {
        if (index === count) {
            const t = setTimeout(() => {
                setNoTransition(true);
                setIndex(0);
            }, 300);
            return () => clearTimeout(t);
        }
        if (noTransition) {
            const t = setTimeout(() => setNoTransition(false), 20);
            return () => clearTimeout(t);
        }
    }, [index, count, noTransition]);

    // 自动轮播 — 每 3.5s 向前切一张（含循环）；拖动或悬停时暂停
    useEffect(() => {
        if (paused || dragging) return;
        const timer = setInterval(() => {
            setIndex(prev => Math.min(prev + 1, count));
        }, 3500);
        return () => clearInterval(timer);
    }, [paused, dragging, count]);

    const onPointerDown = (e) => {
        setDragging(true);
        setStartX(e.clientX);
        setDragX(0);
        e.currentTarget.setPointerCapture?.(e.pointerId);
    };

    const onPointerMove = (e) => {
        if (!dragging) return;
        setDragX(e.clientX - startX);
    };

    const onPointerUp = () => {
        if (!dragging) return;
        const threshold = 50;
        setIndex(prev => {
            if (dragX < -threshold) return Math.min(prev + 1, count); // 向前翻，最后一张可翻到克隆位（即第一张）
            if (dragX > threshold) return Math.max(prev - 1, 0); // 向后翻，第一张不可再回退
            return prev;
        });
        setDragging(false);
        setDragX(0);
    };

    return (
        <div>
            <div
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                onPointerLeave={onPointerUp}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                style={{
                    position: 'relative',
                    background: '#fff',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    // 12:7 基础上卡片加高约 12px（2020px 视口下媒体区 +12px；23:14 基础上减小约 4px）
                    aspectRatio: '1.66',
                    touchAction: 'pan-y',
                    cursor: dragging ? 'grabbing' : 'grab',
                    userSelect: 'none',
                }}
            >
                <div style={{
                    display: 'flex',
                    height: '100%',
                    transform: `translateX(calc(${-index * 100}% + ${dragX}px))`,
                    transition: dragging || noTransition ? 'none' : 'transform 0.3s ease',
                }}>
                    {slides.map((src, i) => (
                        <img
                            key={i}
                            src={src}
                            alt={`${title} ${(i % count) + 1}`}
                            draggable={false}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                flexShrink: 0,
                                display: 'block',
                                pointerEvents: 'none',
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Dots — 点击切换 */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '6px',
                padding: '10px 0 8px',
            }}>
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        aria-label={`${title} ${i + 1}`}
                        style={{
                            width: i === realIndex ? '18px' : '6px',
                            height: '6px',
                            borderRadius: '3px',
                            border: 'none',
                            padding: 0,
                            background: i === realIndex ? colors.grey[40] : colors.grey[92],
                            cursor: 'pointer',
                            transition: 'width 0.2s ease, background 0.2s ease',
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

/* Carousel 卡片 — 与普通卡片同款外壳，有标题、无按钮 */
const CarouselCard = ({ title, images }) => (
    <div style={{
        background: '#fff',
        borderRadius: '12px',
        border: `1px solid ${colors.grey[92]}`,
        padding: '4px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    }}>
        <div style={{
            padding: '10px 12px',
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: '12px',
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
        </div>
        <BannerCarousel images={images} title={title} />
    </div>
);

const SandboxCard = ({ title, date, preview, image, button, secondaryButton, locked = false, span = 1 }) => {
    const navigate = useNavigate();
    const handleClick = button?.to ? () => navigate(button.to) : button?.onClick;
    const handleSecondary = secondaryButton?.to ? () => navigate(secondaryButton.to) : secondaryButton?.onClick;
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
            {/* Title + date row — sits above the cover, no gradient overlay */}
            <div style={{
                padding: '10px 12px',
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                gap: '12px',
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

            {/* Media area — clickable hotspot (same target as button), image hugs its natural height, no cropping */}
            <div
                onClick={handleClick && image ? handleClick : undefined}
                style={{
                    position: 'relative',
                    background: '#fff',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    cursor: handleClick && image ? 'pointer' : 'default',
                    transition: 'opacity 0.15s',
                    // 用图片真实比例预留高度：未加载时显示纯白，加载后无跳动、不裁剪
                    aspectRatio: image ? (IMAGE_RATIOS[image] || 4 / 3) : '2 / 1',
                }}
                onMouseEnter={e => { if (handleClick && image) e.currentTarget.style.opacity = 0.88; }}
                onMouseLeave={e => { if (handleClick && image) e.currentTarget.style.opacity = 1; }}
            >
                {/* Preview content */}
                <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    {image ? (
                        <img
                            src={image}
                            alt={title}
                            style={{
                                width: '100%',
                                height: 'auto',
                                display: 'block',
                            }}
                        />
                    ) : preview}
                </div>
            </div>

            {/* 按钮区：locked 显示锁条；有 secondaryButton 时左右并排，否则全宽 */}
            {locked ? (
                <div style={{
                    width: '100%',
                    padding: '9px 16px',
                    background: colors.grey[95],
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontFamily: typography.body.fontFamily,
                    fontSize: '15px',
                    fontWeight: 500,
                    color: colors.grey[56],
                }}>
                    <Lock size={15} />
                    Coming Soon
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'row', gap: '4px' }}>
                    {button && (
                        <button
                            onClick={handleClick}
                            style={{
                                flex: 1,
                                padding: '9px 16px',
                                background: colors.grey[95],
                                border: 'none',
                                borderRadius: '8px',
                                fontFamily: typography.body.fontFamily,
                                fontSize: '15px',
                                fontWeight: 500,
                                color: colors.grey[16],
                                cursor: handleClick ? 'pointer' : 'default',
                                transition: 'background 0.15s',
                                textAlign: 'center',
                            }}
                            onMouseEnter={e => {
                                if (handleClick) e.currentTarget.style.background = colors.grey[92];
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = colors.grey[95];
                            }}
                        >
                            {button.label}
                        </button>
                    )}
                    {secondaryButton && (
                        <button
                            onClick={handleSecondary}
                            style={{
                                flex: 1,
                                padding: '9px 16px',
                                background: colors.grey[95],
                                border: 'none',
                                borderRadius: '8px',
                                fontFamily: typography.body.fontFamily,
                                fontSize: '15px',
                                fontWeight: 500,
                                color: colors.grey[16],
                                cursor: handleSecondary ? 'pointer' : 'default',
                                transition: 'background 0.15s',
                                textAlign: 'center',
                            }}
                            onMouseEnter={e => {
                                if (handleSecondary) e.currentTarget.style.background = colors.grey[92];
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = colors.grey[95];
                            }}
                        >
                            {secondaryButton.label}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

/* Figma 原型 → 站内承接页（页面内 iframe 嵌入，不直接外跳 figma） */
const demoPage = (url) => `/demo?url=${encodeURIComponent(url)}`;

/* 固定首行 — 侨批、抖音、GenFaceUI */
const featuredItems = [
    {
        title: 'AI 侨批生成',
        date: 'AI 设计工程',
        image: ASSETS.craft2,
        button: { label: 'View Demo →', onClick: () => window.open('https://lynntian.com/qiaopi/', '_blank') },
    },
    {
        title: '抖音弹幕互动玩法创新',
        date: 'Vibe Coding 原型',
        image: ASSETS.craft1,
        button: { label: 'View Demo →', onClick: () => window.open('https://tiktok-y27.lynntian.com/', '_blank') },
    },
    {
        title: 'GenFaceUI: Meta-Design Tool',
        date: "AI 设计工程（CHI'26）",
        image: ASSETS.ai1,
        button: { label: 'Research Project →', to: '/works/genfaceui' },
        secondaryButton: { label: 'View Demo →', onClick: () => window.open('https://genfaceui.lynntian.com/', '_blank') },
    },
];

/* 图片宽高比映射 — 用于瀑布流高度估算，保证列均衡且无空隙 */
const IMAGE_RATIOS = {
    [ASSETS.craft2]: 2400 / 2068, // AI 侨批生成（竖图）
    [ASSETS.craft1]: 2548 / 1911, // 抖音
    [ASSETS.ai1]: 3600 / 2700,    // GenFaceUI
    [ASSETS.craft3]: 2400 / 1600, // gen-icon-skill
    [ASSETS.craft7]: 2400 / 1800, // cowart_workbuddy
    [ASSETS.craft8]: 2400 / 1600, // Sidetation
    [ASSETS.digital1]: 1503 / 1128,
    [ASSETS.digital2]: 1503 / 1128,
    [ASSETS.digital3]: 1503 / 1128,
    [ASSETS.digital4]: 1503 / 1128,
    [ASSETS.ai2]: 1002 / 752,
    [ASSETS.craft9]: 2400 / 1800, // Tako 特型卡原则与规范制定（4:3）
    [ASSETS.jokeasy]: 2502 / 1602, // Jokeasy (iasdr)
    [ASSETS.craft10]: 2400 / 1800, // 微信红包语音祝福玩法设计（4:3）
};

/* 估算卡片高度（title + 媒体区 + 按钮 + 卡片留白） */
const estimateCardHeight = (item, colWidth) => {
    const titleH = 40; // 所有卡片都有标题行
    const buttonH = item.type === 'carousel' ? 0 : item.button ? 38 : 0;
    const chrome = 24;
    let mediaH;
    if (item.type === 'carousel') {
        mediaH = colWidth / 1.66 + 16; // banner 视口（≈23:14 减小 4px）+ 圆点行
    } else if (item.image) {
        const ratio = IMAGE_RATIOS[item.image] || 4 / 3;
        mediaH = colWidth / ratio;
    } else {
        mediaH = colWidth / 2; // 2:1 占位
    }
    return titleH + mediaH + buttonH + chrome;
};

const sandboxItems = [
    {
        title: 'Sidetation',
        date: 'HTML 拖拽交互编辑工具',
        image: ASSETS.craft8,
        button: { label: 'Chrome Extension →', onClick: () => window.open('https://chromewebstore.google.com/detail/sidetation/amefimkabccfbfpijnmgbdojnnihoalh', '_blank') },
    },
    {
        title: 'gen-icon-skill',
        date: '业务图标生成 Skill',
        image: ASSETS.craft3,
        button: { label: 'GitHub Repo →', onClick: () => window.open('https://github.com/tllll64/gen-icon-skill', '_blank') },
    },
    {
        type: 'carousel',
        title: 'AIGC Banner',
        images: [ASSETS.craft4, ASSETS.craft5, ASSETS.craft6],
    },
    {
        title: 'cowart_workbuddy',
        date: 'fork 画布插件',
        image: ASSETS.craft7,
        button: { label: 'GitHub Repo →', onClick: () => window.open('https://github.com/tllll64/cowart_workbuddy', '_blank') },
    },
    {
        title: '方由: 国学教育玩具设计',
        date: '硬件产品设计',
        image: ASSETS.digital3,
        button: { label: 'Case Study →', to: demoPage('https://www.figma.com/proto/XtidjNlm6Zbb8FSDBYhxeq/%E7%BD%91%E7%AB%99%E4%BD%9C%E5%93%81-Link?node-id=2701-6804&viewport=910%2C207%2C0.15&t=huiVDyIzY24XddHZ-1&scaling=scale-down-width&content-scaling=fixed&page-id=2701%3A2947') + '&youtube=Cxhs8KX5Kq4' },
    },
    {
        title: '小米汽车智驾学堂产品设计',
        date: '校企实习项目',
        image: ASSETS.digital1,
        button: { label: 'Case Study →', onClick: () => window.open('https://lynntian.framer.website/works/xiao-mi', '_blank') },
    },
    {
        title: 'NIO Roam 城市漫游座舱',
        date: '本科校级&院级优秀毕设',
        image: ASSETS.digital2,
        button: { label: 'Case Study →', onClick: () => window.open('https://www.behance.net/gallery/207126507/City-Roaming-2035', '_blank') },
    },
    {
        title: 'Colean: 未来家务 AR 游戏',
        date: 'AR 应用探索',
        image: ASSETS.digital4,
        // TODO: 新 Figma 原型链接 + YouTube 链接稍后提供，届时替换下方链接与 &youtube= 参数
        button: { label: 'Case Study →', to: demoPage('https://www.figma.com/proto/XtidjNlm6Zbb8FSDBYhxeq/%E7%BD%91%E7%AB%99%E4%BD%9C%E5%93%81-Link?node-id=2701-6791&viewport=829%2C217%2C0.16&t=vVwzoRmWvazi1SOm-1&scaling=scale-down-width&content-scaling=fixed&page-id=2631%3A12137') + '&youtube=rztcpdhsJlo' },
    },
    {
        title: '基础周边出行场景的支小宝 AI 体验创新',
        date: '校企合作项目',
        image: ASSETS.ai2,
        button: { label: 'Case Study →', onClick: () => window.open('https://lynntian.framer.website/works/zhi-xiao-bao', '_blank') },
    },
    {
        title: 'Tako 特型卡原则与规范制定',
        date: 'AI 设计原则与规范',
        image: ASSETS.craft9,
        button: { label: 'Case Study →', to: demoPage('https://www.figma.com/proto/XtidjNlm6Zbb8FSDBYhxeq/%E7%BD%91%E7%AB%99%E4%BD%9C%E5%93%81-Link?node-id=2724-18899&viewport=269%2C312%2C0.22&t=U9DhGPvzcQz1va4A-1&scaling=scale-down-width&content-scaling=fixed&page-id=2723%3A6805') },
    },
    {
        title: 'Jokeasy: Human-AI Joke Collaboration',
        date: "AI 产品原型（iasdr'25）",
        image: ASSETS.jokeasy,
        button: { label: 'Research Project →', to: '/works/jokeasy' },
    },
    {
        title: '微信红包语音祝福玩法设计',
        date: '设计探索',
        image: ASSETS.craft10,
        locked: true,
    },
];

export const Research = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isTablet = useMediaQuery('(max-width: 1024px)');
    const columns = isMobile ? 1 : isTablet ? 2 : 3;

    // 测量瀑布流容器宽度，用于高度估算
    const containerRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(0);

    useLayoutEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const update = () => setContainerWidth(el.clientWidth);
        update();
        const ro = new ResizeObserver(update);
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    // 固定列分布（桌面 3 列）— 顺序已永久锁定，不再随高度估算/图片比例变化而重排。
    // 数字为 allItems 下标：0-2 为固定首行（侨批/抖音/GenFaceUI），3 起为 sandboxItems 顺序。
    // 若新增/删除/重排卡片，需同步更新此表。
    const FIXED_COLUMN_INDICES = [
        [0, 5, 4, 11, 7], // 列1: 侨批 / AIGC Banner / gen-icon / 支小宝 / 方由
        [1, 3, 6, 10, 12], // 列2: 抖音 / Sidetation / cowart / Colean / Tako 特型卡
        [2, 13, 14, 9, 8], // 列3: GenFaceUI / Jokeasy / 微信红包 / NIO / 小米
    ];

    const allItems = [...featuredItems, ...sandboxItems];
    let columnsLayout = null;
    if (containerWidth > 0) {
        if (columns === 3 && FIXED_COLUMN_INDICES.every(col => col.every(i => i < allItems.length))) {
            // 桌面 3 列：使用固定顺序
            columnsLayout = FIXED_COLUMN_INDICES.map(col => col.map(i => allItems[i]));
        } else {
            // 平板/移动端（或数据与固定表不一致时）：按数据顺序贪心分配（确定性）
            const colWidth = (containerWidth - 8 * (columns - 1)) / columns;
            const cols = Array.from({ length: columns }, () => ({ items: [], height: 0 }));
            allItems.forEach(item => {
                const h = estimateCardHeight(item, colWidth);
                let target = cols[0];
                for (let c = 1; c < cols.length; c++) {
                    if (cols[c].height < target.height) target = cols[c];
                }
                target.items.push(item);
                target.height += h;
            });
            columnsLayout = cols.map(c => c.items);
        }
    }

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
        paddingTop: '160px',
        paddingBottom: layoutSpacing.section.xl,
    };

    return (
        <div style={pageStyle}>
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>
                <Navbar theme="light" />
            </div>

            <div style={containerStyle}>
                {/* Header — 复刻 Home 页 Section 的 title + subtitle 样式 */}
                <div style={{ marginBottom: '40px' }}>
                    <h2 style={{
                        fontFamily: 'Lora, "Times New Roman", Georgia, serif',
                        fontSize: isMobile ? '36px' : typography.heading1.fontSize,
                        fontWeight: 400,
                        lineHeight: typography.heading1.lineHeight,
                        letterSpacing: '0px',
                        color: colors.grey[9],
                        margin: 0,
                        marginBottom: '12px',
                    }}>
                        Creative Works
                    </h2>
                    <p style={{
                        fontFamily: typography.body.fontFamily,
                        fontSize: typography.body.fontSize,
                        fontWeight: typography.body.fontWeight,
                        lineHeight: typography.body.lineHeight,
                        letterSpacing: typography.body.letterSpacing,
                        color: colors.grey[56],
                        margin: 0,
                    }}>
                        做点好玩的，顺便学点东西
                    </p>
                </div>

                {/* 瀑布流 — 确定性贪心布局：固定首行三项先入列（各占一列顶部），其余依次进最短列，无空隙 */}
                <div ref={containerRef} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                }}>
                    {(columnsLayout || []).map((colItems, ci) => (
                        <div key={ci} style={{
                            flex: 1,
                            minWidth: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                        }}>
                            {colItems.map((item, i) => (
                                item.type === 'carousel'
                                    ? <CarouselCard key={`${ci}-${i}`} {...item} />
                                    : <SandboxCard key={`${ci}-${i}`} {...item} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Contact — 页脚联系板块，与 Home / About 一致 */}
            <ContactSection />
        </div>
    );
};
