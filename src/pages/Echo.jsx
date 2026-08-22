import React, { useRef, useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Section } from '../components/Section';
import { PublicationCard } from '../components/PublicationCard';
import { ContactSection } from '../components/ContactSection';
import { colors, layoutSpacing, gridGap } from '../design-system/tokens';
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
        backgroundImage: `url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='80'%20height='80'%3E%3Crect%20width='1.5'%20height='1.5'%20fill='%23000'/%3E%3C/svg%3E")`,
        backgroundSize: '80px 80px',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
    };

    return (
        <div style={pageStyle}>
            <Navbar theme={navTheme} />

            {/* AI-Driven Research */}
            <Section
                id="ai-driven-research"
                title="AI-Driven Research"
                subtitle="读研期间在 [生成式交互] 和 [人机协同] 方向的研究"
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

            <ContactSection ref={footerRef} />
        </div>
    );
};
