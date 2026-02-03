import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Section } from '../components/Section';
import { ProjectCard } from '../components/ProjectCard';
import { GridCard } from '../components/GridCard';
import { BlogCard } from '../components/BlogCard';
import { Navbar } from '../components/Navbar';
import { ContactSection } from '../components/ContactSection';
import { ASSETS } from '../constants/assets';
import { colors, spacing, typography, stackSpacing, gridGap, layoutSpacing, componentSpacing, width, fontSize } from '../design-system/tokens';
import { useMediaQuery } from '../design-system/hooks/useMediaQuery';
import { Twitter, Github, Mail } from 'lucide-react';
import xhsCursor from '../assets/cursor/xhs-cursor.png';

export const Home = () => {
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width: 768px)');
    const footerRef = useRef(null);
    const blogSectionRef = useRef(null);
    const [navTheme, setNavTheme] = useState('light');
    const [blogHeight, setBlogHeight] = useState(null);

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

    const heroStyle = {
        paddingTop: layoutSpacing.hero.top,
        paddingBottom: layoutSpacing.hero.bottom,
        paddingLeft: isMobile ? layoutSpacing.page.mobile : layoutSpacing.page.desktop,
        paddingRight: isMobile ? layoutSpacing.page.mobile : layoutSpacing.page.desktop,
        maxWidth: width.container.xl,
        margin: '0 auto'
    };

    const heroTitleStyle = {
        fontFamily: typography.heading1.fontFamily,
        fontSize: isMobile ? '36px' : typography.heading1.fontSize,
        fontWeight: typography.heading1.fontWeight,
        lineHeight: typography.heading1.lineHeight,
        letterSpacing: '0px',
        color: colors.grey[9],
        marginBottom: stackSpacing.sm
    };

    const heroSubtitleStyle = {
        fontFamily: typography.body.fontFamily,
        fontSize: typography.body.fontSize,
        fontWeight: typography.body.fontWeight,
        lineHeight: typography.body.lineHeight,
        letterSpacing: typography.body.letterSpacing,
        color: colors.grey[56]
    };

    const teaserStyle = {
        paddingTop: layoutSpacing.section.md,
        paddingBottom: layoutSpacing.section.md,
        paddingLeft: isMobile ? layoutSpacing.page.mobile : layoutSpacing.page.desktop,
        paddingRight: isMobile ? layoutSpacing.page.mobile : layoutSpacing.page.desktop,
        maxWidth: width.container.xl,
        margin: '0 auto',
        minHeight: blogHeight ? `${blogHeight}px` : undefined,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundImage: `radial-gradient(${colors.grey[92]} 1px, transparent 1px)`,
        backgroundSize: '18px 18px',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat'
    };

    const teaserTitleStyle = {
        fontFamily: typography.heading1.fontFamily,
        fontSize: isMobile ? '28px' : '32px',
        fontWeight: typography.heading1.fontWeight,
        lineHeight: typography.heading1.lineHeight,
        letterSpacing: '0px',
        color: colors.grey[9],
        marginBottom: stackSpacing.xs
    };

    const teaserSubtitleStyle = {
        fontFamily: typography.body.fontFamily,
        fontSize: typography.body.fontSize,
        fontWeight: typography.body.fontWeight,
        lineHeight: typography.body.lineHeight,
        letterSpacing: typography.body.letterSpacing,
        color: colors.grey[56]
    };

    const worksContainerStyle = {
        paddingLeft: isMobile ? layoutSpacing.page.mobile : layoutSpacing.page.desktop,
        paddingRight: isMobile ? layoutSpacing.page.mobile : layoutSpacing.page.desktop,
        maxWidth: width.container.xl,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? stackSpacing.xl : layoutSpacing.section.md,
        marginBottom: layoutSpacing.section.xl
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
        gap: gridGap.xl
    };

    const footerStyle = {
        background: colors.black.solid,
        color: colors.white.solid,
        paddingTop: layoutSpacing.section.md,
        paddingBottom: layoutSpacing.section.lg
    };

    return (
        <div style={pageStyle}>
            <Navbar theme={navTheme} />

            <section style={teaserStyle} />

            <header style={heroStyle} id="works">
                <h1 style={heroTitleStyle}>Selected works</h1>
                <p style={heroSubtitleStyle}>
                    2023-2024年 实习项目产出和复盘思考
                </p>
            </header>

            <div style={worksContainerStyle}>
                <ProjectCard
                    date="June - Aug 2023"
                    title="TikTok ToB Dataviz"
                    description="Designed data visualization tools for enterprise analytics, improving data readability and decision-making efficiency."
                    tags={['Data Visualization', 'ToB Product']}
                    image={ASSETS.tiktok}
                />
                <ProjectCard
                    date="Mar - May 2024"
                    title="Procreate"
                    description="A deep dive into mobile creative tools, analyzing interaction patterns and recreating key workflows for iOS."
                    tags={['Mobile App', 'Product Analysis']}
                    image={ASSETS.pro}
                    customCursor={xhsCursor}
                />
            </div>

            <div id="explorations">
                <Section title="AI-Driven Projects" subtitle="研究生期间在生成式交互方向上探索的原型与落地作品" style={{ paddingTop: layoutSpacing.section.xl, paddingBottom: layoutSpacing.section.xl }}>
                    <div style={gridStyle}>
                        <GridCard
                            title="GenFaceUI: Generative Meta-Design Tool"
                            category="HAI Research | CHI"
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

                <Section title="Digital Projects" subtitle="本科期间在车载 HMI 和智能交互产品设计方向的落地性探索" style={{ paddingTop: layoutSpacing.section.xl, paddingBottom: layoutSpacing.section.xl }}>
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
                        />
                        <GridCard
                            title="方由: 国学教育玩具设计"
                            category="智能硬件产品设计"
                            image={ASSETS.digital3}
                        />
                        <GridCard
                            title="Colean: 未来家务 AR 游戏"
                            category="AR 应用探索"
                            image={ASSETS.digital4}
                        />
                    </div>
                </Section>
            </div>

            <footer style={footerStyle} id="about" ref={footerRef}>
                <div ref={blogSectionRef}>
                    <Section title="Reflection Blog" subtitle="AIGC 期间的思考与 HMI 和智能交互设计相关的沉淀" dark className="!py-0 !px-0">
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                            gap: gridGap.xl,
                            marginBottom: layoutSpacing.section.md
                        }}>
                            <BlogCard
                                title="Lynn's 人机协作日志"
                                date="WIP"
                                image={ASSETS.blog1}
                            />
                            <BlogCard
                                title="“AIGC+模板化”融入B端业务实践反思"
                                date="2025.04"
                                image={ASSETS.blog2}
                            />
                            <BlogCard
                                title="商业化产品引导体系建设调研"
                                date="2025.06"
                                image={ASSETS.blog1}
                            />
                            <BlogCard
                                title="B 端 AI 应用设计框架"
                                date="2025.07"
                                image={ASSETS.blog2}
                            />
                            <BlogCard
                                title="华为问界智驾教学产品分析"
                                date="2023.10"
                                image={ASSETS.blog1}
                            />
                            <BlogCard
                                title="Minimalism in 2024"
                                date="2024.03.01"
                                image={ASSETS.blog2}
                            />
                        </div>
                    </Section>
                </div>
            </footer>

            <ContactSection />

        </div>
    );
};
