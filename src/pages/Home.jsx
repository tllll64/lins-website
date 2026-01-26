import React, { useRef, useState, useEffect } from 'react';
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

export const Home = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const footerRef = useRef(null);
    const [navTheme, setNavTheme] = useState('light');

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

            <header style={heroStyle} id="works">
                <h1 style={heroTitleStyle}>Selected works</h1>
                <p style={heroSubtitleStyle}>
                    2023-2024年 实习项目产出和复盘思考
                </p>
            </header>

            <div style={worksContainerStyle}>
                <ProjectCard
                    title="TikTok ToB Dataviz"
                    subtitle="数据可视化产品设计实习"
                    image={ASSETS.tiktok}
                />
                <ProjectCard
                    title="Procreate"
                    subtitle="iOS移动端产品设计复刻"
                    image={ASSETS.pro}
                />
                <ProjectCard
                    title="Dashboard UI"
                    subtitle="B端CRM系统界面设计"
                    image={ASSETS.dashboard}
                />
            </div>

            <div id="explorations">
                <Section title="AI projects" subtitle="研究与实践生成式 AI在Web/App界面的应用与落地" style={{ paddingTop: layoutSpacing.section.xl, paddingBottom: layoutSpacing.section.xl }}>
                    <div style={gridStyle}>
                        <GridCard
                            title="AI Creative Tool"
                            category="AI Application"
                            image={ASSETS.ai1}
                        />
                        <GridCard
                            title="Generative Music"
                            category="Web Interface"
                            image={ASSETS.ai2}
                        />
                    </div>
                </Section>

                <Section title="Digital Projects" subtitle="多端适配与交互 logic 探究" style={{ paddingTop: layoutSpacing.section.xl, paddingBottom: layoutSpacing.section.xl }}>
                    <div style={gridStyle}>
                        <GridCard
                            title="Xiaomi Smart Home"
                            category="IoT App"
                            image={ASSETS.digital1}
                        />
                        <GridCard
                            title="NIO Cockpit"
                            category="HMI Design"
                            image={ASSETS.digital2}
                        />
                        <GridCard
                            title="7.23 Event"
                            category="Campaign"
                            image={ASSETS.digital3}
                        />
                        <GridCard
                            title="AR Glasses"
                            category="Hardware Interface"
                            image={ASSETS.digital4}
                        />
                    </div>
                </Section>
            </div>

            <footer style={footerStyle} id="about" ref={footerRef}>
                <Section title="Reflection Blog" subtitle="AIGC 期间的思考与 HMI 和智能交互设计相关的沉淀" dark className="!py-0 !px-0">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                        gap: gridGap.xl,
                        marginBottom: layoutSpacing.section.md
                    }}>
                        <BlogCard
                            title="Reflection on AI Tools"
                            date="2023.10.24"
                            image={ASSETS.blog1}
                        />
                        <BlogCard
                            title="Interface Design Trends"
                            date="2023.11.15"
                            image={ASSETS.blog2}
                        />
                        <BlogCard
                            title="Design Systems in 2024"
                            date="2024.01.10"
                            image={ASSETS.blog1}
                        />
                        <BlogCard
                            title="The Future of HMI"
                            date="2024.02.01"
                            image={ASSETS.blog2}
                        />
                        <BlogCard
                            title="My Internship Journey"
                            date="2024.02.15"
                            image={ASSETS.blog1}
                        />
                        <BlogCard
                            title="Minimalism in 2024"
                            date="2024.03.01"
                            image={ASSETS.blog2}
                        />
                    </div>
                </Section>
            </footer>

            <ContactSection />

        </div>
    );
};
