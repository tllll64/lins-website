import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { ContactSection } from '../components/ContactSection';
import { ASSETS } from '../constants/assets';
import { colors, layoutSpacing, typography } from '../design-system/tokens';
import { useMediaQuery } from '../design-system/hooks/useMediaQuery';

/* ------------------------------------------------------------------ */
/*  BannerCarousel — 拖拽翻页 + 圆点切换 + 无限向前循环的自动轮播        */
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
        if (paused || dragging || count < 2) return;
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
                role="group"
                aria-label={`${title} 轮播`}
                style={{
                    position: 'relative',
                    background: '#fff',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    // banner 画面本身是 16:10，用 1.66 视口可裁掉周边留白、让画面撑满
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
                        aria-label={`${title} 第 ${i + 1} 张`}
                        aria-current={i === realIndex ? 'true' : undefined}
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

const SandboxCard = ({ title, date, preview, image, images, button, secondaryButton, locked = false, span = 1 }) => {
    const navigate = useNavigate();
    const handleClick = button?.to ? () => navigate(button.to) : button?.onClick;
    const handleSecondary = secondaryButton?.to ? () => navigate(secondaryButton.to) : secondaryButton?.onClick;
    return (
        <div style={{
            gridColumn: span > 1 ? `span ${span}` : undefined,
            // 轮播卡媒体区比 4:3 卡片矮，保持自然高度、顶部对齐，避免标题行被拉出空隙
            alignSelf: images?.length ? 'start' : undefined,
            background: '#fff',
            borderRadius: '12px',
            border: `1px solid ${colors.grey[92]}`,
            padding: '4px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            minWidth: 0,
            // 轮播卡不参与行高拉伸，保持画面自然高度
            height: images?.length ? 'auto' : '100%',
        }}>
            {/* Title + date row — sits above the cover, no gradient overlay */}
            <div style={{
                padding: '10px 12px',
                flex: 1,
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

            {images?.length ? (
                <BannerCarousel images={images} title={title} />
            ) : (
                <div
                    onClick={handleClick && image ? handleClick : undefined}
                    style={{
                        position: 'relative',
                        background: '#fff',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        cursor: handleClick && image ? 'pointer' : 'default',
                        transition: 'opacity 0.15s',
                        aspectRatio: '4 / 3',
                        flexShrink: 0,
                    }}
                    onMouseEnter={e => { if (handleClick && image) e.currentTarget.style.opacity = 0.88; }}
                    onMouseLeave={e => { if (handleClick && image) e.currentTarget.style.opacity = 1; }}
                >
                    {/* Preview content */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
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
                                    height: '100%',
                                    objectFit: 'contain',
                                    display: 'block',
                                }}
                            />
                        ) : preview}
                    </div>
                </div>
            )}

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
            ) : (button || secondaryButton) ? (
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
            ) : null}
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
        category: 'ai',
        image: ASSETS.craft2,
        button: { label: 'View Demo →', onClick: () => window.open('https://lynntian.com/qiaopi/', '_blank') },
    },
    {
        title: 'BoaBite',
        date: '0-1 AI-Native 产品',
        category: 'ai',
        image: ASSETS.craft11,
        button: { label: 'Case Study →', to: '/works/boabite' },
    },
    {
        title: '基础周边出行场景的支小宝 AI 体验创新',
        date: '校企合作项目',
        category: 'ai',
        image: ASSETS.ai2,
        button: { label: 'Case Study →', onClick: () => window.open('https://lynntian.framer.website/works/zhi-xiao-bao', '_blank') },
    },
];

const sandboxItems = [
    {
        title: '抖音弹幕互动玩法创新',
        date: 'Vibe Coding 原型',
        category: 'ai',
        image: ASSETS.craft1,
        button: { label: 'View Demo →', onClick: () => window.open('https://tiktok-y27.lynntian.com/', '_blank') },
    },
    {
        title: '方由: 国学教育玩具设计',
        date: '硬件产品设计',
        category: 'digital',
        image: ASSETS.digital3,
        button: { label: 'Case Study →', to: demoPage('https://www.figma.com/proto/XtidjNlm6Zbb8FSDBYhxeq/%E7%BD%91%E7%AB%99%E4%BD%9C%E5%93%81-Link?node-id=2701-6804&viewport=910%2C207%2C0.15&t=huiVDyIzY24XddHZ-1&scaling=scale-down-width&content-scaling=fixed&page-id=2701%3A2947') + '&youtube=Cxhs8KX5Kq4' },
    },
    {
        title: '小米汽车智驾学堂产品设计',
        date: '校企实习项目',
        category: 'digital',
        image: ASSETS.digital1,
        button: { label: 'Case Study →', onClick: () => window.open('https://lynntian.framer.website/works/xiao-mi', '_blank') },
    },
    {
        title: 'NIO Roam 城市漫游座舱',
        date: '本科校级&院级优秀毕设',
        category: 'digital',
        image: ASSETS.digital2,
        button: { label: 'Case Study →', onClick: () => window.open('https://www.behance.net/gallery/207126507/City-Roaming-2035', '_blank') },
    },
    {
        title: 'Colean: 未来家务 AR 游戏',
        date: 'AR 应用探索',
        category: 'digital',
        image: ASSETS.digital4,
        // TODO: 新 Figma 原型链接 + YouTube 链接稍后提供，届时替换下方链接与 &youtube= 参数
        button: { label: 'Case Study →', to: demoPage('https://www.figma.com/proto/XtidjNlm6Zbb8FSDBYhxeq/%E7%BD%91%E7%AB%99%E4%BD%9C%E5%93%81-Link?node-id=2701-6791&viewport=829%2C217%2C0.16&t=vVwzoRmWvazi1SOm-1&scaling=scale-down-width&content-scaling=fixed&page-id=2631%3A12137') + '&youtube=rztcpdhsJlo' },
    },
    {
        title: 'GenFaceUI: Meta-Design Tool',
        date: "AI 设计工程（CHI'26）",
        category: 'ai',
        image: ASSETS.ai1,
        button: { label: 'Research Project →', to: '/works/genfaceui' },
        secondaryButton: { label: 'View Demo →', onClick: () => window.open('https://genfaceui.lynntian.com/', '_blank') },
    },
    {
        title: 'Sidetation',
        date: 'HTML 拖拽交互编辑工具',
        category: 'ai',
        image: ASSETS.craft8,
        button: { label: 'Chrome Extension →', onClick: () => window.open('https://chromewebstore.google.com/detail/sidetation/amefimkabccfbfpijnmgbdojnnihoalh', '_blank') },
    },
];

/* Visual 分类 — 偏视觉相关的内容（AIGC Banner 轮播卡在此复原） */
const visualItems = [
    {
        type: 'carousel',
        title: 'AIGC Banner',
        category: 'visual',
        images: [ASSETS.craft4, ASSETS.craft5, ASSETS.craft6],
    },
    // TODO: 添加你的视觉项目卡片，例如：
    // {
    //     title: '项目名',
    //     date: '描述',
    //     category: 'visual',
    //     image: ASSETS.xxx,
    //     button: { label: 'View →', to: '/works/xxx' },
    // },
];

export const Creative = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isTablet = useMediaQuery('(max-width: 1024px)');
    const columns = isMobile ? 1 : isTablet ? 2 : 3;

    const allItems = [...featuredItems, ...sandboxItems, ...visualItems];

    // Tab 筛选：All 显示全部；分类视图下所有卡片（含固定首行）一起参与筛选
    const [activeTab, setActiveTab] = useState('ai');
    const visibleItems = activeTab === 'all' ? allItems : allItems.filter(item => item.category === activeTab);

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

                {/* Tabs — All / AI-Native / Digital */}
                <div style={{
                    display: 'flex',
                    gap: '8px',
                    marginBottom: '28px',
                    flexWrap: 'wrap',
                }}>
                    {[
                        { id: 'all', label: 'All' },
                        { id: 'ai', label: 'AI-Native' },
                        { id: 'digital', label: 'Digital' },
                        { id: 'visual', label: 'Visual' },
                    ].map(tab => {
                        const active = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                aria-pressed={active}
                                style={{
                                    padding: '8px 18px',
                                    border: 'none',
                                    borderRadius: '100px',
                                    background: active ? '#000' : colors.grey[95],
                                    color: active ? '#fff' : colors.grey[16],
                                    fontFamily: typography.body.fontFamily,
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    letterSpacing: '0.02em',
                                    cursor: 'pointer',
                                    transition: 'background 0.2s ease, color 0.2s ease',
                                }}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* 项目网格 — 始终按数据顺序逐行从左到右排列 */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                    alignItems: 'stretch',
                    gap: '8px',
                }}>
                    {visibleItems.map(item => (
                        <SandboxCard key={item.title} {...item} />
                    ))}
                </div>
            </div>

            {/* Contact — 页脚联系板块，与 Home / About 一致 */}
            <ContactSection />
        </div>
    );
};
