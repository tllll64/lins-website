import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from '@arco-design/web-react';
import { IconLaunch } from '@arco-design/web-react/icon';
import { Section } from '../components/Section';
import { ProjectCard } from '../components/ProjectCard';
import { GridCard } from '../components/GridCard';
import { PublicationCard } from '../components/PublicationCard';
import { Navbar } from '../components/Navbar';
import { ContactSection } from '../components/ContactSection';
import { StickerText } from '../components/StickerText';
import NothingWordClock from '../components/NothingWordClock';
import NothingDotClock from '../components/NothingDotClock';
import FolderIcon from '../components/FolderIcon';
import PDFViewer from '../components/PDFViewer';
import ReflectionList from '../components/ReflectionList';
import IframeModal from '../components/IframeModal';
import PixelLock from '../components/PixelLock';
import { ASSETS } from '../constants/assets';
import { colors, spacing, typography, stackSpacing, gridGap, layoutSpacing, componentSpacing, width, fontSize } from '../design-system/tokens';
import { useMediaQuery } from '../design-system/hooks/useMediaQuery';
import { Twitter, Github, Mail } from 'lucide-react';
import xhsCursor from '../assets/cursor/xhs-cursor.png';
import PromoteLogo from '../assets/Home/Promote_logo.png';
import TakoLogo from '../assets/Home/Tako_logo.png';
import LingxiLogo from '../assets/Home/Lingxi_logo.png';
import PolaroidDecoration from '../components/PolaroidDecoration';
import profileImg from '../assets/about/profile2.png';

const RESEARCH_ASSETS = {
    chi: new URL('../assets/Research/CHI@3x.png', import.meta.url).href,
    iasdr: new URL('../assets/Research/iasdr@3x.png', import.meta.url).href,
    uist: new URL('../assets/Research/UIST@3x.png', import.meta.url).href,
    cscw: new URL('../assets/Research/CSCW@3x.png', import.meta.url).href,
};

export const Home = () => {
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width: 768px)');
    const footerRef = useRef(null);
    const blogSectionRef = useRef(null);
    const [navTheme, setNavTheme] = useState('light');
    const [blogHeight, setBlogHeight] = useState(null);
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

    useEffect(() => {
        if (!blogSectionRef.current) {
            return undefined;
        }

        const observer = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (entry) {
                setBlogHeight(Math.round(entry.contentRect.height));
            }
        });

        observer.observe(blogSectionRef.current);

        return () => observer.disconnect();
    }, []);

    const pageStyle = {
        minHeight: '100vh',
        background: colors.grey[98]
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
        gap: gridGap.xl
    };

    const publicationsData = [
        {
            title: "GenFaceUI: Meta-Design of Generative Personalized Facial Expression Interfaces for\nIntelligent Agents",
            authors: "Yate Ge, Lin Tian, Yi Dai, Shuhan Pan, Yiwen Zhang, Qi Wang, Weiwei Guo*, Xiaohua Sun*",
            venue: "CHI'26 (Full Paper)",
            links: [
                { label: "arxiv PDF", url: "https://arxiv.org/abs/2602.11055" },
            ],
            image: RESEARCH_ASSETS.chi
        },
        {
            title: "Jokeasy: Exploring Human-AI Collaboration in Thematic Joke Generation",
            authors: "Yate Ge, Lin Tian, Chiqian Xu, Luyao Xu, Meiying Li, Yuanda Hu, Weiwei Guo*",
            venue: "iasdr'25 (Full Paper)",
            links: [
                { label: "arxiv PDF", url: "https://arxiv.org/abs/2602.09496" },
            ],
            image: RESEARCH_ASSETS.iasdr
        },
        {
            title: "Exploring Generative Personalized Facial Expression Interfaces for Intelligent Agents",
            authors: "Yate Ge, Lin Tian, Ge Chen, Shuhan Pan, Weiwei Guo, Xiaohua Sun*",
            venue: "UIST'25 (Poster)",
            links: [
                { label: "ACM DL", url: "https://dl.acm.org/doi/10.1145/3746058.3758382" },
                { label: "PDF", url: "https://dl.acm.org/doi/pdf/10.1145/3746058.3758382" },
            ],
            image: RESEARCH_ASSETS.uist
        }

    ];

    const footerStyle = {
        background: '#333333',
        color: colors.white.solid,
        paddingTop: layoutSpacing.section.md,
        paddingBottom: layoutSpacing.section.md
    };

    const blogItems = [
        { title: "理想态英文阅读体验在Tako的应用", category: "Daily Log", image: ASSETS.blog1 },
        { title: "“AIGC+模板化”融入B端业务实践反思", category: "Reflection", image: ASSETS.blog2 },
        { title: "商业化产品引导体系建设调研", category: "Research", image: ASSETS.blog1 },
        { title: "国内外用户 AI 使用差异调研", category: "Research", image: ASSETS.blog2 },
        { title: "B 端 AI 应用设计框架调研", category: "Framework", image: ASSETS.blog1 },
        { title: "华为问界智驾教学产品分析", category: "Analysis", image: ASSETS.blog2 }
    ];

    const demoItems = [
        { type: 'video', src: 'https://www.youtube.com/embed/oBq4iC_T-Yk' },
        { type: 'video', src: 'https://www.youtube.com/embed/5nUYwufk3-U' },
        { type: 'video', src: 'https://www.youtube.com/embed/dMuGlI-wrhQ' },
    ];

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
                    backgroundImage: `radial-gradient(${colors.grey[92]} 1px, transparent 1px)`,
                    backgroundSize: '18px 18px',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'repeat',
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
                    <PolaroidDecoration images={[null, profileImg]} scale={0.99} />
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
                            fontWeight: 200,
                            lineHeight: 1.1,
                            marginBottom: '24px',
                            letterSpacing: '-0.02em'
                         }}>
                            Product Designer <br/>
                            AI Engineer
                         </h1>

                         <p style={{
                            fontFamily: typography.body.fontFamily,
                            fontSize: typography.body.fontSize,
                            lineHeight: 1.6,
                            maxWidth: '600px',
                            margin: '0 auto',
                            opacity: 0.9
                         }}>
                            Simplicity is my superpower. I turn complex ideas into experiences users love and investors trust. I help SaaS, AI, and Dev founders craft story-driven brands and products.
                         </p>
                    </div>
                </div>
            </Section>

            <Section 
                title="Internship Projects" 
                subtitle="2023-2026 年实习项目产出和复盘思考" 
                id="works" 
                style={{ paddingTop: '60px', paddingBottom: 0 }}
            >
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: isMobile ? stackSpacing.xl : layoutSpacing.section.md
                }}>
                    <ProjectCard
                        date="June - Aug 2023"
                        title="薯条加热放心投"
                        description="Designed data visualization tools for enterprise analytics, improving data readability and decision-making efficiency."
                        tags={['APP', '产设共建']}
                        image={ASSETS.tiktok}
                        logo={PromoteLogo}
                        onClick={() => openFigmaModal(
                            "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FMCyWIWjYNBpVUUdqlRdAGw%2F%25E6%259A%2591%25E6%259C%259F%25E4%25BD%259C%25E5%2593%2581%25E9%259B%2586%3Fpage-id%3D738%253A15009%26node-id%3D738-22150%26viewport%3D232%252C293%252C0.25%26t%3DPGqmJzHbhJK8ZgKg-1%26scaling%3Dscale-down-width%26content-scaling%3Dfixed",
                            "薯条加热放心投"
                        )}
                    />
                    <ProjectCard
                        date="Mar - May 2024"
                        title="Procreate"
                        description="A deep dive into mobile creative tools, analyzing interaction patterns and recreating key workflows for iOS."
                        tags={['APP', '产设共建']}
                        image={ASSETS.pro}
                        logo={TakoLogo}
                        customCursor={xhsCursor}
                        pixelPattern={<PixelLock size={6} gap={2} />}
                    />
                    <ProjectCard
                        date="Mar - May 2024"
                        title="Procreate"
                        description="A deep dive into mobile creative tools, analyzing interaction patterns and recreating key workflows for iOS."
                        tags={['APP', '产设共建']}
                        image={ASSETS.pro}
                        logo={LingxiLogo}
                        customCursor={xhsCursor}
                    />
                </div>
            </Section>

            <div id="explorations">
                <Section title="AI-Driven Projects" subtitle="研究生期间在生成式AI方向上探索的原型与落地作品" style={{ paddingTop: layoutSpacing.section['2xl'], paddingBottom: '64px' }}>
                    <div style={gridStyle}>
                        <GridCard
                            title="GenFaceUI: Meta-Design Tool"
                            category="CHI'26 Full Paper"
                            image={ASSETS.ai1}
                        />
                        <GridCard
                            title="基于周边出行场景的支小宝 AI 应用创新探索"
                            category="设计探索"
                            image={ASSETS.ai2}
                            onClick={() => navigate('/works/zhi-xiao-bao')}
                        />
                    </div>
                </Section>

                <Section title="AI-Driven Papers" subtitle="研究生期间的 HAI 相关研究论文" style={{ paddingTop: layoutSpacing.section['2xl'], paddingBottom: 0 }}>
                    <div style={{ marginBottom: layoutSpacing.section.xl }}>
                        {publicationsData.map((pub, index) => (
                            <PublicationCard
                                key={index}
                                title={pub.title}
                                authors={pub.authors}
                                venue={pub.venue}
                                links={pub.links}
                                image={pub.image}
                            />
                        ))}
                    </div>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                        gap: gridGap.lg,
                        marginTop: layoutSpacing.section.lg
                    }}>
                        {demoItems.map((item, index) => (
                            <div key={index} style={{
                                width: '100%',
                                aspectRatio: '16/9',
                                background: colors.grey[92],
                                borderRadius: '12px',
                                overflow: 'hidden',
                                position: 'relative'
                            }}>
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={item.src}
                                    title={`Demo Video ${index + 1}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                    style={{ border: 'none' }}
                                ></iframe>
                            </div>
                        ))}
                    </div>
                </Section>

                <Section title="Digital Projects" subtitle="本科期间在车载 HMI 和智能AI产品设计方向的落地性探索" style={{ paddingTop: layoutSpacing.section['2xl'], paddingBottom: layoutSpacing.section['2xl'] }}>
                    <div style={gridStyle}>
                        <GridCard
                            title="小米汽车智驾学堂"
                            category="小米实习产出 | 已上线"
                            image={ASSETS.digital1}
                        />
                        <GridCard
                            title="NIO Roam 城市漫游座舱"
                            category="本科校级&院级优秀毕设"
                            image={ASSETS.digital2}
                            onClick={() => openFigmaModal(
                                "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FKerAYedbweEAHVc4pEWPak%2F%25E5%258E%2586%25E5%258F%25B2%25E4%25BD%259C%25E5%2593%2581%25E9%259B%2586%25E5%2590%2588%3Fpage-id%3D0%253A1%26node-id%3D3-5%26viewport%3D320%252C317%252C0.02%26t%3DTNvKH6ruKYJgjx1i-1%26scaling%3Dscale-down-width%26content-scaling%3Dfixed",
                                "NIO Roam 城市漫游座舱"
                            )}
                        />
                        <GridCard
                            title="方由: 国学教育玩具设计"
                            category="智能硬件产品设计"
                            image={ASSETS.digital3}
                            onClick={() => openFigmaModal(
                                "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FKerAYedbweEAHVc4pEWPak%2F%25E5%258E%2586%25E5%258F%25B2%25E4%25BD%259C%25E5%2593%2581%25E9%259B%2586%25E5%2590%2588%3Fpage-id%3D0%253A1%26node-id%3D12-2901%26viewport%3D-92%252C894%252C0.05%26t%3DXxpwcogo7FOPPPgJ-1%26scaling%3Dscale-down-width%26content-scaling%3Dfixed",
                                "方由: 国学教育玩具设计"
                            )}
                        />
                        <GridCard
                            title="Colean: 未来家务 AR 游戏"
                            category="AR 应用探索"
                            image={ASSETS.digital4}
                            onClick={() => openFigmaModal(
                                "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FKerAYedbweEAHVc4pEWPak%2F%25E5%258E%2586%25E5%258F%25B2%25E4%25BD%259C%25E5%2593%2581%25E9%259B%2586%25E5%2590%2588%3Fpage-id%3D0%253A1%26node-id%3D12-973%26viewport%3D-92%252C894%252C0.05%26t%3DG7M5N4g1HM6V495R-1%26scaling%3Dscale-down-width%26content-scaling%3Dfixed",
                                "Colean: 未来家务 AR 游戏"
                            )}
                        />
                    </div>
                </Section>
            </div>

            <footer style={footerStyle} id="about" ref={footerRef}>
                <div ref={blogSectionRef}>
                    <Section title="Reflection Blog" dark className="!py-0 !px-0" style={{ background: 'transparent' }}>
                        <div style={{ marginBottom: layoutSpacing.section.md }}>
                            <ReflectionList items={blogItems} />
                        </div>
                    </Section>
                </div>
            </footer>

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
