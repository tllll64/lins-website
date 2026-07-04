import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@arco-design/web-react';
import { IconLaunch } from '@arco-design/web-react/icon';
import { Section } from '../components/Section';
import { ProjectCard } from '../components/ProjectCard';
import { Navbar } from '../components/Navbar';
import { ContactSection } from '../components/ContactSection';
import NothingWordClock from '../components/NothingWordClock';
import NothingDotClock from '../components/NothingDotClock';
import FolderIcon from '../components/FolderIcon';
import PDFViewer from '../components/PDFViewer';
import IframeModal from '../components/IframeModal';
import PixelLock from '../components/PixelLock';
import { ASSETS } from '../constants/assets';
import { colors, spacing, typography, stackSpacing, layoutSpacing } from '../design-system/tokens';
import { useMediaQuery } from '../design-system/hooks/useMediaQuery';
import xhsCursor from '../assets/cursor/xhs-cursor.png';
import PromoteLogo from '../assets/Home/Promote_logo.png';
import TakoLogo from '../assets/Home/Tako_logo.png';
import TakoImg from '../assets/Home/Tako.png';
import LingxiLogo from '../assets/Home/Lingxi_logo.png';
import RedLogo from '../assets/Home/red.png';
import TikTokAppLogo from '../assets/Home/TikTok.png';
import PolaroidDecoration from '../components/PolaroidDecoration';
import profileImg from '../assets/about/profile2.png';
import TencentLogo from '../assets/Home/tencent-color.svg';

export const Home = () => {
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width: 768px)');
    const footerRef = useRef(null);
    const [navTheme, setNavTheme] = useState('light');
    const [showPDF, setShowPDF] = useState(false);
    const [iframeModal, setIframeModal] = useState({
        isOpen: false,
        url: '',
        title: ''
    });
    
    const openFigmaModal = (url, title) => {
        setIframeModal({
            isOpen: true,
            url,
            title
        });
    };

    const closeFigmaModal = () => {
        setIframeModal(prev => ({ ...prev, isOpen: false }));
    };
    
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
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        };

        // Handle initial load with hash
        handleHashChange();

        // Listen for hash changes
        window.addEventListener('hashchange', handleHashChange);

        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const pageStyle = {
        minHeight: '100vh',
        background: colors.grey[98],
        backgroundImage: `radial-gradient(${colors.grey[92]} 1px, transparent 1px)`,
        backgroundSize: '18px 18px',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat'
    };


    return (
        <div style={pageStyle}>
            <Navbar theme={navTheme} />

            <Section
                style={{
                    position: 'relative',
                    minHeight: '85vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    marginBottom: '80px',
                    paddingTop: layoutSpacing.section.md,
                    paddingBottom: layoutSpacing.section.md,
                }}
            >
                {/* NothingDotClock in top-left corner */}
                <div style={{
                    position: 'absolute',
                    top: layoutSpacing.section.xl,
                    left: isMobile ? layoutSpacing.page.mobile : layoutSpacing.section.xl,
                    zIndex: 10
                }}>
                    <NothingDotClock />
                </div>

                {/* FolderIcon in top-right corner */}
                <div style={{
                    position: 'absolute',
                    top: layoutSpacing.section.xl,
                    right: isMobile ? layoutSpacing.page.mobile : layoutSpacing.section.xl,
                    zIndex: 10,
                    display: isMobile ? 'none' : 'block' // Hide on mobile if too crowded, or adjust
                }}>
                    <FolderIcon 
                        title="12 Projects"
                        subtitle="Internship, AI-Driven, Digital"
                        scale={0.6}
                        folderImages={[PromoteLogo, TakoLogo, LingxiLogo]}
                        onClick={() => document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })}
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
                        cursor: 'pointer'
                    }}
                    onClick={() => navigate('/about')}
                >
                    <PolaroidDecoration images={[null, profileImg]} scale={1.1} />
                </div>

                {/* NothingWordClock in bottom-right corner */}
                <div 
                    style={{
                        position: 'absolute',
                        bottom: spacing[4],
                        right: isMobile ? layoutSpacing.page.mobile : layoutSpacing.section.xl,
                        zIndex: 10,
                        cursor: 'pointer'
                    }}
                    onClick={() => navigate('/sandbox')}
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
                        padding: '0 20px',
                        transform: 'translateY(40px)'
                    }}>
                         <h3 
                            onMouseEnter={() => setShowNameTooltip(true)}
                            onMouseLeave={() => setShowNameTooltip(false)}
                            style={{
                                fontFamily: '"Inter", sans-serif',
                                fontSize: isMobile ? '16px' : '20px',
                                fontWeight: 500,
                                marginBottom: '16px',
                                letterSpacing: '0.02em',
                                color: colors.grey[40], // Slightly lighter for subhead
                                cursor: 'default',
                                width: 'fit-content',
                                margin: '0 auto 16px auto',
                                position: 'relative'
                         }}>
                            Hi, I'm Lynn Tian
                            
                            {/* Hover Annotation */}
                            <div style={{
                                position: 'absolute',
                                top: '-10px',
                                left: 'calc(100% + 5px)',
                                width: 'max-content',
                                opacity: showNameTooltip ? 1 : 0,
                                transition: 'opacity 0.3s ease-out',
                                pointerEvents: 'none',
                                fontFamily: '"Noto Sans SC", "PingFang SC", sans-serif',
                                fontSize: '16px',
                                color: '#000',
                                fontWeight: 'normal',
                                zIndex: 20
                            }}>
                                [田琳]
                            </div>
                         </h3>
                         
                         <h1 style={{
                            fontFamily: 'Lora, "Times New Roman", Georgia, serif',
                            fontSize: isMobile ? '42px' : '72px',
                            fontWeight: 400,
                            lineHeight: 1.1,
                            marginBottom: '24px',
                            letterSpacing: '-0.02em'
                         }}>
                            Product Designer <br/>
                            AI Engineer
                         </h1>

                         <p style={{
                            fontFamily: typography.body.fontFamily,
                            fontSize: isMobile ? '16px' : '18px',
                            lineHeight: 1.6,
                            maxWidth: '800px',
                            margin: '0 auto',
                            opacity: 0.9
                         }}>
                            I’m dedicated to merging human-centered design with cutting-edge technology. <br />
                            Lately, I’ve been focused on human-AI collaboration and seamless integration.
                         </p>
                    </div>
                </div>
            </Section>

            <Section 
                title="Internship Projects"
                subtitle="2023-2026 年实习项目产出和复盘思考"
                id="works"
                style={{ paddingTop: '60px', paddingBottom: layoutSpacing.section['2xl'] }}
            >
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: isMobile ? stackSpacing.xl : layoutSpacing.section.md
                }}>
                    <ProjectCard
                        date="2026"
                        title="跨境汇款·微汇款首页升级"
                        tags={['2026', '产设共建']}
                        logo={TencentLogo}
                        locked={true}
                    />
                    <ProjectCard
                        date="2026"
                        title="全球汇入 Sharelink 体验优化"
                        tags={['2026', '设计自驱']}
                        logo={TencentLogo}
                        locked={true}
                        reversed={true}
                    />
                    <ProjectCard
                        date="Mar - May 2024"
                        title="TikTok Tako 图片发布优化"
                        description="A deep dive into mobile creative tools, analyzing interaction patterns and recreating key workflows for iOS."
                        tags={['2025', '设计自驱']}
                        image={TakoImg}
                        logo={TikTokAppLogo}
                        customCursor={xhsCursor}
                        pixelPattern={<PixelLock size={6} gap={2} />}
                    />
                    <ProjectCard
                        date="June - Aug 2023"
                        title="薯条加热权益保障放心投"
                        description="Designed data visualization tools for enterprise analytics, improving data readability and decision-making efficiency."
                        tags={['2025', '需求支持']}
                        image={ASSETS.tiktok}
                        logo={RedLogo}
                        reversed={true}
                        onClick={() => openFigmaModal(
                            "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FMCyWIWjYNBpVUUdqlRdAGw%2F%25E6%259A%2591%25E6%259C%259F%25E4%25BD%259C%25E5%2593%2581%25E9%259B%2586%3Fpage-id%3D738%253A15009%26node-id%3D738-22150%26viewport%3D232%252C293%252C0.25%26t%3DPGqmJzHbhJK8ZgKg-1%26scaling%3Dscale-down-width%26content-scaling%3Dfixed",
                            "薯条加热权益保障放心投"
                        )}
                    />
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
                </div>
            </Section>

            <ContactSection ref={footerRef} />

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

            {/* Figma Preview Modal */}
            <IframeModal
                isOpen={iframeModal.isOpen}
                onClose={closeFigmaModal}
                url={iframeModal.url}
                title={iframeModal.title}
            />
        </div>
    );
};
