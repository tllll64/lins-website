import React from 'react';
import { Section } from '../components/Section';
import { ProjectCard } from '../components/ProjectCard';
import { GridCard } from '../components/GridCard';
import { BlogCard } from '../components/BlogCard';
import { Navbar } from '../components/Navbar';
import { ASSETS } from '../constants/assets';
import { colors, spacing, typography, stackSpacing, gridGap, layoutSpacing, componentSpacing, width } from '../design-system/tokens';
import { useMediaQuery } from '../design-system/hooks/useMediaQuery';
import { Twitter, Github, Mail } from 'lucide-react';

export const Home = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');

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

    const contactContainerStyle = {
        maxWidth: width.container.xl,
        margin: '0 auto',
        paddingLeft: isMobile ? layoutSpacing.page.mobile : layoutSpacing.page.desktop,
        paddingRight: isMobile ? layoutSpacing.page.mobile : layoutSpacing.page.desktop,
        borderTop: `1px solid ${colors.white[0.2]}`,
        paddingTop: stackSpacing.xl,
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'flex-start' : 'center',
        gap: stackSpacing.xl
    };

    const contactTitleStyle = {
        fontFamily: typography.heading1.fontFamily,
        fontSize: isMobile ? '24px' : '32px',
        fontWeight: typography.heading1.fontWeight,
        lineHeight: typography.heading1.lineHeight,
        letterSpacing: '0px',
        color: colors.white.solid,
        marginBottom: spacing.xs
    };

    const contactDescStyle = {
        fontFamily: typography.body.fontFamily,
        fontSize: typography.body.fontSize,
        fontWeight: typography.body.fontWeight,
        lineHeight: typography.body.lineHeight,
        letterSpacing: typography.body.letterSpacing,
        color: colors.grey[66],
        maxWidth: '400px'
    };

    const contactLinksStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: stackSpacing.md,
        fontSize: typography.body.fontSize,
        color: colors.grey[66]
    };

    const contactLinkStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: spacing.xs,
        color: colors.grey[66],
        textDecoration: 'none',
        transition: 'color 0.2s ease',
        cursor: 'pointer'
    };

    const copyrightStyle = {
        maxWidth: width.container.xl,
        margin: '0 auto',
        paddingLeft: isMobile ? layoutSpacing.page.mobile : layoutSpacing.page.desktop,
        paddingRight: isMobile ? layoutSpacing.page.mobile : layoutSpacing.page.desktop,
        marginTop: stackSpacing.xl,
        fontSize: '11px',
        color: colors.grey[66],
        opacity: '0.4',
        textAlign: isMobile ? 'center' : 'left'
    };

    return (
        <div style={pageStyle}>
            <Navbar />

            <header style={heroStyle} id="works">
                <h1 style={heroTitleStyle}>SELECTED WORKS</h1>
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
                <Section title="AI PROJECTS" subtitle="研究与实践生成式 AI在Web/App界面的应用与落地" style={{ paddingTop: layoutSpacing.section.xl, paddingBottom: layoutSpacing.section.xl }}>
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

                <Section title="DIGITAL PROJECTS" subtitle="多端适配与交互 logic 探究" style={{ paddingTop: layoutSpacing.section.xl, paddingBottom: layoutSpacing.section.xl }}>
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

            <footer style={footerStyle} id="about">
                <Section title="REFLECTION BLOG" subtitle="AIGC 期间的思考与 HMI 和智能交互设计相关的沉淀" dark className="!py-0 !px-0">
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

                <div style={contactContainerStyle}>
                    <div>
                        <h2 style={contactTitleStyle}>CONTACT ME</h2>
                        <p style={contactDescStyle}>
                            Thanks for reaching the end of the page. If you want to learn more, email me or verify what I'm working on, feel free to get in touch!
                        </p>
                    </div>
                    <div style={contactLinksStyle}>
                        <div style={contactLinkStyle} onMouseEnter={(e) => e.currentTarget.style.color = colors.white.solid} onMouseLeave={(e) => e.currentTarget.style.color = colors.grey[66]}>
                            <Mail size={16} /> <span>email@example.com</span>
                        </div>
                        <div style={contactLinkStyle} onMouseEnter={(e) => e.currentTarget.style.color = colors.white.solid} onMouseLeave={(e) => e.currentTarget.style.color = colors.grey[66]}>
                            <Twitter size={16} /> <span>@design_handle</span>
                        </div>
                        <div style={contactLinkStyle} onMouseEnter={(e) => e.currentTarget.style.color = colors.white.solid} onMouseLeave={(e) => e.currentTarget.style.color = colors.grey[66]}>
                            <Github size={16} /> <span>/developer-profile</span>
                        </div>
                    </div>
                </div>
                <div style={copyrightStyle}>
                    © 2024 Lin's Design. All rights reserved.
                </div>
            </footer>

        </div>
    );
};
