import React, { useRef, useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Section } from '../components/Section';
import { PublicationCard } from '../components/PublicationCard';
import { ContactSection } from '../components/ContactSection';
import ReflectionList from '../components/ReflectionList';
import { ASSETS } from '../constants/assets';
import { colors, spacing, layoutSpacing, gridGap } from '../design-system/tokens';
import { useMediaQuery } from '../design-system/hooks/useMediaQuery';

const RESEARCH_ASSETS = {
    chi: new URL('../assets/Research/CHI@3x.png', import.meta.url).href,
    iasdr: new URL('../assets/Research/iasdr@3x.png', import.meta.url).href,
    uist: new URL('../assets/Research/UIST@3x.png', import.meta.url).href,
    cscw: new URL('../assets/Research/CSCW@3x.png', import.meta.url).href,
};

const publicationsData = [
    {
        title: "Exploring Generative Personalized Facial Expression Interfaces for Intelligent Agents",
        authors: "Yate Ge, Lin Tian, Ge Chen, Shuhan Pan, Weiwei Guo, Xiaohua Sun*",
        venue: "CHI'26 (full paper)",
        links: [
            { label: "ACM DL", url: "#" },
            { label: "PDF", url: "#" },
        ],
        image: RESEARCH_ASSETS.chi
    },
    {
        title: "Jokeasy: Exploring Human-AI Collaboration in Thematic Joke Generation",
        authors: "Yate Ge, Lin Tian, Chiqian Xu, Luyao Xu, Meiying Li, Yuanda Hu, Weiwei Guo*",
        venue: "iasdr'25 (full paper)",
        links: [
            { label: "xxx", url: "#" },
            { label: "PDF", url: "#" },
        ],
        image: RESEARCH_ASSETS.iasdr
    },
    {
        title: "Exploring Generative Personalized Facial Expression Interfaces for Intelligent Agents",
        authors: "Yate Ge, Lin Tian, Ge Chen, Shuhan Pan, Weiwei Guo, Xiaohua Sun*",
        venue: "UIST'25 (poster)",
        links: [
            { label: "ACM DL", url: "#" },
            { label: "PDF", url: "#" },
        ],
        image: RESEARCH_ASSETS.uist
    },
    {
        title: "When Accessibility Becomes a Trap: A User-Centric Characterization of Dark Patterns Arising from Screen Reader Users' Perceived Deception in Mobile Interfaces",
        authors: "Dai Shi, Lin Tian, Jiaxun Sun, TOMOMI KAWAKAMI, Nuo Cheng, Shuchang Xu, Guanhong L",
        venue: "CSCW'25 (poster)",
        links: [
            { label: "ACM DL", url: "#" },
            { label: "PDF", url: "#" }
        ],
        image: RESEARCH_ASSETS.cscw
    }
];

const demoItems = [
    { type: 'video', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { type: 'video', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { type: 'video', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
];

const blogItems = [
    { title: "理想态英文阅读体验在Tako的应用", category: "[AI]  [Reflection]", image: ASSETS.blog1, locked: true },
    { title: "国内外用户 AI 使用差异调研", category: "[AI]  [Research]", image: ASSETS.blog2, locked: true },
    {
        title: "“AIGC+模板化”融入B端业务实践反思",
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
        title: "B 端 AI 应用设计框架调研",
        category: "[AI]  [Research]",
        image: ASSETS.blog1,
        onClick: () => window.open('https://jq6o8oyx72u.feishu.cn/wiki/TR2VwiuV5iinuckFMdic7iuAnJg?from=from_copylink', '_blank')
    },
    {
        title: "华为问界智驾教学产品分析",
        category: "[Research]",
        image: ASSETS.blog2,
        onClick: () => window.open('https://jq6o8oyx72u.feishu.cn/wiki/MpeAwuUoxiDpy3ktZ0ocOPKIngb?from=from_copylink', '_blank')
    }
];

export const Echo = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const footerRef = useRef(null);
    const [navTheme, setNavTheme] = useState('light');

    useEffect(() => {
        const handleScroll = () => {
            if (footerRef.current) {
                const footerRect = footerRef.current.getBoundingClientRect();
                if (footerRect.top <= 72) {
                    setNavTheme('dark');
                } else {
                    setNavTheme('light');
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const pageStyle = {
        minHeight: '100vh',
        background: colors.grey[98],
        backgroundImage: `radial-gradient(${colors.grey[92]} 1px, transparent 1px)`,
        backgroundSize: '18px 18px',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
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

            {/* AI-Driven Papers */}
            <Section
                id="ai-driven-papers"
                title="AI-Driven Papers"
                subtitle="研究生期间的 HAI 相关研究论文"
                style={{ paddingTop: '160px', paddingBottom: layoutSpacing.section.xl }}
            >
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

            {/* Reflection Blog (dark) */}
            <section style={footerStyle} ref={footerRef}>
                <Section title="Reflection Blog" dark className="!py-0 !px-0" style={{ background: 'transparent', paddingTop: 0, paddingBottom: 0 }}>
                    <div>
                        <ReflectionList items={blogItems} />
                    </div>
                </Section>
            </section>

            <ContactSection />
        </div>
    );
};
