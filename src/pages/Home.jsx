import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLenis } from 'lenis/react';
import { Modal } from '@arco-design/web-react';
import { IconLaunch } from '@arco-design/web-react/icon';
import { Section } from '../components/Section';
import { ProjectCard } from '../components/ProjectCard';
import { Navbar } from '../components/Navbar';
import { ContactSection } from '../components/ContactSection';
import ReflectionList from '../components/ReflectionList';
import NothingWordClock from '../components/NothingWordClock';
import NothingDotClock from '../components/NothingDotClock';
import FolderIcon from '../components/FolderIcon';
import PDFViewer from '../components/PDFViewer';
import PixelLock from '../components/PixelLock';
import PixelEye from '../components/PixelEye';
import { ASSETS } from '../constants/assets';
import { colors, spacing, typography, stackSpacing, layoutSpacing } from '../design-system/tokens';
import { useMediaQuery } from '../design-system/hooks/useMediaQuery';
import xhsCursor from '../assets/cursor/xhs-cursor.webp';
import PromoteLogo from '../assets/Home/Promote_logo.webp';
import TakoLogo from '../assets/Home/Tako_logo.webp';
import TakoImg from '../assets/works/tako/Tako.webp';
import FitLogo from '../assets/Home/FiT_logo.webp';
import RedLogo from '../assets/Home/red.webp';
import TikTokAppLogo from '../assets/Home/TikTok.webp';
import PolaroidDecoration from '../components/PolaroidDecoration';
import profileImg from '../assets/about/profile2.webp';
import TencentLogo from '../assets/Home/tencent-color.svg';
import QiaopiCover from '../assets/works/qiaopi/qiaopi.webp';
import XhsFriesCover from '../assets/works/xhs-fries/cover.webp';
import SharelinkCover from '../assets/works/sharelink/sharelink.webp';
import FigmaPreloader from '../components/FigmaPreloader';

const blogItems = [
    { title: "Harness 原则层：提炼、验证与融入", category: "[Harness]", image: ASSETS.blog2, locked: true, tag: "NEW" },
    { title: "Tako 特型卡原则与规范制定", category: "[AI]  [Reflection]", image: ASSETS.blog1, locked: true },
    { title: "理想态英文阅读体验在 Tako 的应用", category: "[AI]  [Reflection]", image: ASSETS.blog1, locked: true },
    { title: "国内外用户 AI 使用差异观察", category: "[AI]  [Research]", image: ASSETS.blog2, locked: true },
    {
        title: "“AIGC+模板化”融入 B 端业务实践反思",
        category: "[AI]  [Reflection]",
        image: ASSETS.blog2,
        onClick: () => window.open('https://jq6o8oyx72u.feishu.cn/wiki/UjhQwPnBcidQbLkNU3Kc2grMn8b?from=from_copylink', '_blank')
    },
    {
        title: "商业化产品引导体系建设调研",
        category: "[Research]",
        image: ASSETS.blog1,
        onClick: () => window.open('https://jq6o8oyx72u.feishu.cn/wiki/ZZ8pwx83ViGdyokZKJOcDfj6nFe?from=from_copylink', '_blank')
    },
    {
        title: "华为问界智驾教学产品分析",
        category: "[Research]",
        image: ASSETS.blog2,
        onClick: () => window.open('https://jq6o8oyx72u.feishu.cn/wiki/MpeAwuUoxiDpy3ktZ0ocOPKIngb?from=from_copylink', '_blank')
    }
];

export const Home = () => {
    const navigate = useNavigate();
    const lenis = useLenis();
    const isMobile = useMediaQuery('(max-width: 768px)');
    const footerRef = useRef(null);
    const [navTheme, setNavTheme] = useState('light');
    const [showPDF, setShowPDF] = useState(false);
    
    // State for name tooltip
    const [showNameTooltip, setShowNameTooltip] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (footerRef.current) {
                const footerRect = footerRef.current.getBoundingClientRect();
                // Navbar height approx 72px (top spacing + height). 
                // We want to switch when footer top reaches the navbar area.
                // Let's say when footer top is <= 72.
                if (footerRect.top <= 72) {
                    setNavTheme('dark');
                } else {
                    setNavTheme('light');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle anchor link navigation
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash) {
                const element = document.querySelector(hash);
                if (element) {
                    if (lenis) {
                        lenis.scrollTo(element);
                    } else {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
        };

        // Handle initial load with hash
        handleHashChange();

        // Listen for hash changes
        window.addEventListener('hashchange', handleHashChange);

        return () => window.removeEventListener('hashchange', handleHashChange);
    }, [lenis]);

    const pageStyle = {
        minHeight: '100vh',
        background: colors.grey[98],
        backgroundImage: `url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='80'%20height='80'%3E%3Crect%20width='1.5'%20height='1.5'%20fill='%23000'/%3E%3C/svg%3E")`,
        backgroundSize: '80px 80px',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat'
    };

    const footerStyle = {
        background: 'rgba(0, 0, 0, 0.9)',
        color: colors.white.solid,
        paddingTop: layoutSpacing.section['2xl'],
        paddingBottom: `calc(${spacing[20]} + 20px)`,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale'
    };


    return (
        <div style={pageStyle}>
            <Navbar theme={navTheme} />
            {/* 进入首页即开始预加载三个项目的 Figma prototype */}
            <FigmaPreloader />

            <Section
                style={{
                    position: 'relative',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    marginBottom: '80px',
                    paddingTop: layoutSpacing.section.md,
                    paddingBottom: layoutSpacing.section.md,
                }}
            >
                {/* Vertical top→middle→bottom gradient wash (sits above the dot grid, below content) */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 0,
                    pointerEvents: 'none',
                    background: 'linear-gradient(180deg, rgba(206,212,222,0.65) 0%, rgba(206,212,222,0) 24%, rgba(206,212,222,0) 76%, rgba(206,212,222,0.5) 100%)'
                }} />

                {/* NothingDotClock in top-left corner */}
                <div style={{
                    position: 'absolute',
                    top: '135px',
                    left: isMobile ? layoutSpacing.page.mobile : layoutSpacing.section.xl,
                    zIndex: 10,
                    userSelect: 'none',
                    WebkitUserSelect: 'none'
                }}>
                    <NothingDotClock />
                </div>

                {/* FolderIcon in top-right corner */}
                <div style={{
                    position: 'absolute',
                    top: '150px',
                    right: isMobile ? layoutSpacing.page.mobile : layoutSpacing.section.xl,
                    zIndex: 10,
                    display: isMobile ? 'none' : 'block',
                    userSelect: 'none',
                    WebkitUserSelect: 'none'
                }}>
                    <FolderIcon
                        title=""
                        subtitle="Internship Projects"
                        scale={0.6}
                        folderImages={[PromoteLogo, TakoLogo, FitLogo]}
                        onClick={() => {
                            const target = document.getElementById('works');
                            if (!target) return;
                            if (lenis) {
                                lenis.scrollTo(target);
                            } else {
                                target.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                    />
                </div>

                {/* Polaroid Decoration in bottom-left corner */}
                <div 
                    style={{
                        position: 'absolute',
                        bottom: spacing[4],
                        left: isMobile ? layoutSpacing.page.mobile : layoutSpacing.section.xl,
                        zIndex: 10,
                        display: isMobile ? 'none' : 'block',
                        cursor: 'pointer',
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        transform: 'translate(-12px, -61px)'
                    }}
                    onClick={() => navigate('/about')}
                >
                    <PolaroidDecoration images={[null, profileImg]} scale={0.92} />
                </div>

                {/* NothingWordClock in bottom-right corner */}
                <div 
                    style={{
                        position: 'absolute',
                        bottom: spacing[4],
                        right: isMobile ? layoutSpacing.page.mobile : layoutSpacing.section.xl,
                        zIndex: 10,
                        cursor: 'pointer',
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        transform: 'translateY(-73px)'
                    }}
                    onClick={() => navigate('/craft')}
                >
                    <NothingWordClock />
                </div>

                <div style={{
                    position: 'relative',
                    width: '100%',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1
                }}>

                    {/* Text Content */}
                    <div style={{
                        textAlign: 'center',
                        color: colors.black.solid, // Changed to black for visibility
                        maxWidth: '800px',
                        padding: '28px 20px',
                        background: colors.grey[98], // Same as page base — masks the dot grid behind the text
                        borderRadius: '16px',
                        transform: 'translateY(4px)'
                    }}>
                         <h1 style={{
                            fontFamily: 'Lora, "Times New Roman", Georgia, serif',
                            fontSize: isMobile ? '32px' : '62px',
                            fontWeight: 400,
                            lineHeight: 1.1,
                            marginBottom: '24px',
                            letterSpacing: '-0.02em'
                         }}>
                            Product Designer
                            <span style={{ display: 'block', marginTop: '8px' }}>With Research Mindset</span>
                         </h1>

                         <p style={{
                            fontFamily: typography.body.fontFamily,
                            fontSize: isMobile ? '16px' : '18px',
                            lineHeight: 1.6,
                            maxWidth: '800px',
                            margin: '0 auto',
                            opacity: 0.9
                         }}>
                            I’m dedicated to merging human-centered design with cutting-edge technology. Lately, I’ve been focused on human-AI collaboration and seamless integration.
                         </p>
                    </div>
                </div>
            </Section>

            <Section 
                title="Internship Projects"
                subtitle="2023-2026 年实习产出和复盘思考"
                id="works"
                style={{ paddingTop: '40px', paddingBottom: layoutSpacing.section['2xl'] }}
            >
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: isMobile ? stackSpacing.xl : layoutSpacing.section.md
                }}>
                    <ProjectCard
                        date="2026"
                        title="跨境汇款 AI 侨批生成活动"
                        tags={['2026', 'AI 设计工程']}
                        logo={TencentLogo}
                        image={QiaopiCover}
                        pixelPattern={<PixelEye size={6} gap={2} />}
                        onClick={() => navigate('/works/qiaopi')}
                    />
                    <ProjectCard
                        date="2026"
                        title="全球汇入 Sharelink 体验优化"
                        description="TenPay Global 面向海外用户的资金汇入产品体验优化，覆盖从发起汇款到资金到账的全流程。"
                        tags={['2026', '设计自驱']}
                        logo={TencentLogo}
                        image={SharelinkCover}
                        reversed={true}
                        imageScale={1.12}
                        pixelPattern={<PixelEye size={6} gap={2} />}
                        onClick={() => navigate('/works/sharelink?data=hidden')}
                    />
                    <ProjectCard
                        date="Mar - May 2024"
                        title="TikTok Tako AI 生图发布优化"
                        description="A deep dive into mobile creative tools, analyzing interaction patterns and recreating key workflows for iOS."
                        tags={['2025', '设计自驱']}
                        image={TakoImg}
                        logo={TikTokAppLogo}
                        customCursor={xhsCursor}
                        pixelPattern={<PixelEye size={6} gap={2} />}
                        onClick={() => navigate('/works/tako')}
                    />
                    <ProjectCard
                        date="June - Aug 2023"
                        title="薯条加热权益保障放心投"
                        description="Designed data visualization tools for enterprise analytics, improving data readability and decision-making efficiency."
                        tags={['2025', '需求支持']}
                        image={XhsFriesCover}
                        logo={RedLogo}
                        reversed={true}
                        onClick={() => navigate('/works/xhs-fries')}
                    />
                    {/* 灵犀 AURA 卡片暂时隐藏，需要时取消注释恢复
                    <ProjectCard
                        date="Mar - May 2024"
                        title="灵犀 AURA 营销结案升级"
                        description="A deep dive into mobile creative tools, analyzing interaction patterns and recreating key workflows for iOS."
                        tags={['Web', '需求支持']}
                        image={ASSETS.pro}
                        logo={RedLogo}
                        customCursor={xhsCursor}
                        pixelPattern={<PixelLock size={6} gap={2} />}
                    />
                    */}
                </div>
            </Section>

            {/* Reflection Blog (dark) */}
            <section style={footerStyle} ref={footerRef}>
                <Section title="Reflection Blog" dark className="!py-0 !px-0" style={{ background: 'transparent', paddingTop: 0, paddingBottom: 0 }}>
                    <div>
                        <ReflectionList items={blogItems} />
                    </div>
                </Section>
            </section>

            <ContactSection />

            <Modal
                title={
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>Colean: AR家务游戏 - 技术文档</span>
                        <a 
                            href="https://jq6o8oyx72u.feishu.cn/wiki/S4WzwOXJKibHJXkwXcKcXUr6nve" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ 
                                fontSize: '14px', 
                                color: '#1890ff', 
                                display: 'flex', 
                                alignItems: 'center',
                                gap: '4px',
                                textDecoration: 'none'
                            }}
                        >
                            <IconLaunch /> 飞书原文档
                        </a>
                    </div>
                }
                visible={showPDF}
                onOk={() => setShowPDF(false)}
                onCancel={() => setShowPDF(false)}
                autoFocus={false}
                focusLock={true}
                footer={null}
                style={{ width: '80%', maxWidth: '1000px', top: '20px' }}
            >
                <div style={{ height: '80vh', overflow: 'hidden' }}>
                    <PDFViewer 
                        src="/documents/AR家务.pdf" 
                        title="Colean: AR家务游戏 - 技术文档"
                        showHeader={false}
                        height="100%"
                        style={{ border: 'none' }}
                    />
                </div>
            </Modal>
        </div>
    );
};
