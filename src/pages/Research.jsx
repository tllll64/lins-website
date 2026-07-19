import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { ASSETS } from '../constants/assets';
import { colors, layoutSpacing, typography } from '../design-system/tokens';
import { useMediaQuery } from '../design-system/hooks/useMediaQuery';

const SandboxCard = ({ title, date, preview, image, button, span = 1 }) => {
    const navigate = useNavigate();
    const handleClick = button?.to ? () => navigate(button.to) : button?.onClick;
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
                    background: image
                        ? 'linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.75) 55%, rgba(255,255,255,0) 100%)'
                        : 'transparent',
                    paddingBottom: image ? '20px' : '10px',
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
                    {image ? (
                        <img
                            src={image}
                            alt={title}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block',
                            }}
                        />
                    ) : preview}
                </div>
            </div>

            {/* Full-width button inside card */}
            {button && (
                <button
                    onClick={handleClick}
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
        </div>
    );
};

const sandboxItems = [
    {
        title: '给阿嬷的情书 AI侨批活动',
        date: '2026.07',
        button: { label: 'View Demo →', to: '/works/qiaopi' },
    },
    {
        title: 'Sidetation',
        button: { label: 'View Demo →' },
    },
    {
        title: 'gen-icon-skill',
        button: { label: 'View Demo →' },
    },
    {
        title: '抖音互动弹幕探索',
        button: { label: 'View Demo →' },
    },
    {
        title: '小米汽车智驾学堂',
        date: '小米实习产出',
        image: ASSETS.digital1,
        button: { label: 'View Case →', onClick: () => window.open('https://lynntian.framer.website/works/xiao-mi', '_blank') },
    },
    {
        title: 'NIO Roam 城市漫游座舱',
        date: '校级&院级优秀毕设',
        image: ASSETS.digital2,
        button: { label: 'View Prototype →', onClick: () => window.open('https://www.figma.com/proto/KerAYedbweEAHVc4pEWPak/%E5%8E%86%E5%8F%B2%E4%BD%9C%E5%93%81%E9%9B%86%E5%90%88?page-id=0%3A1&node-id=3-5&viewport=320%2C317%2C0.02&t=TNvKH6ruKYJgjx1i-1&scaling=scale-down-width&content-scaling=fixed', '_blank') },
    },
    {
        title: '方由: 国学教育玩具设计',
        date: '智能硬件产品设计',
        image: ASSETS.digital3,
        button: { label: 'View Prototype →', onClick: () => window.open('https://www.figma.com/proto/KerAYedbweEAHVc4pEWPak/%E5%8E%86%E5%8F%B2%E4%BD%9C%E5%93%81%E9%9B%86%E5%90%88?page-id=0%3A1&node-id=12-2901&viewport=-92%2C894%2C0.05&t=Xxpwcogo7FOPPPgJ-1&scaling=scale-down-width&content-scaling=fixed', '_blank') },
    },
    {
        title: 'Colean: 未来家务 AR 游戏',
        date: 'AR 应用探索',
        image: ASSETS.digital4,
        button: { label: 'View Prototype →', onClick: () => window.open('https://www.figma.com/proto/KerAYedbweEAHVc4pEWPak/%E5%8E%86%E5%8F%B2%E4%BD%9C%E5%93%81%E9%9B%86%E5%90%88?page-id=0%3A1&node-id=12-973&viewport=-92%2C894%2C0.05&t=G7M5N4g1HM6V495R-1&scaling=scale-down-width&content-scaling=fixed', '_blank') },
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
    {
        title: 'Coming Soon',
        date: '2026',
        button: { label: 'Stay Tuned →' },
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
