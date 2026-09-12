import React, { useRef } from 'react';
import { Navbar } from '../components/Navbar';
import { Section } from '../components/Section';
import { PublicationCard } from '../components/PublicationCard';
import { ContactSection } from '../components/ContactSection';
import { colors, layoutSpacing, gridGap } from '../design-system/tokens';
import { useMediaQuery } from '../design-system/hooks/useMediaQuery';

const RESEARCH_ASSETS = {
    chi: new URL('../assets/Research/CHI@3x.webp', import.meta.url).href,
    iasdr: new URL('../assets/Research/iasdr@3x.webp', import.meta.url).href,
    uist: new URL('../assets/Research/UIST@3x.webp', import.meta.url).href,
    cscw: new URL('../assets/Research/CSCW@3x.webp', import.meta.url).href,
};

const publicationsData = [
    {
        title: "GenFaceUI: Meta-Design of Generative Personalized Facial Expression Interfaces for Intelligent Agents",
        authors: "Yate Ge, Lin Tian, Yi Dai, Shuhan Pan, Yiwen Zhang, Qi Wang, Weiwei Guo, Xiaohua Sun*",
        venue: "CHI'26 (Full Paper)",
        links: [
            { label: "ACM DL", url: "https://dl.acm.org/doi/10.1145/3772318.3790653" },
            { label: "PDF", url: "https://dl.acm.org/doi/epdf/10.1145/3772318.3790653" },
            { label: "Project", url: "/works/genfaceui" },
        ],
        image: RESEARCH_ASSETS.chi
    },
    {
        title: "Jokeasy: Exploring Human-AI Collaboration in Thematic Joke Generation",
        authors: "Yate Ge, Lin Tian, Chiqian Xu, Luyao Xu, Meiying Li, Yuanda Hu, Weiwei Guo*",
        venue: "iasdr'25 (Full Paper)",
        links: [
            { label: "PDF", url: "https://dl.designresearchsociety.org/cgi/viewcontent.cgi?article=1762&context=iasdr" },
            { label: "Project", url: "/works/jokeasy" },
        ],
        image: RESEARCH_ASSETS.iasdr
    },
    {
        title: "Exploring Generative Personalized Facial Expression Interfaces for Intelligent Agents",
        authors: "Yate Ge, Lin Tian, Ge Chen, Shuhan Pan, Weiwei Guo, Xiaohua Sun*",
        venue: "UIST'25 (Poster)",
        links: [
            { label: "ACM DL", url: "https://dl.acm.org/doi/10.1145/3746058.3758382" },
            { label: "PDF", url: "https://dl.acm.org/doi/epdf/10.1145/3746058.3758382" },
        ],
        image: RESEARCH_ASSETS.uist
    },
    {
        title: "When Accessibility Becomes a Trap: A User-Centric Characterization of Dark Patterns Arising from Screen Reader Users' Perceived Deception in Mobile Interfaces",
        authors: "Dai Shi, Lin Tian, Jiaxun Sun, TOMOMI KAWAKAMI, Nuo Cheng, Shuchang Xu, Guanhong L",
        venue: "CSCW'25 (Poster)",
        links: [
            { label: "ACM DL", url: "https://dl.acm.org/doi/10.1145/3715070.3749249" },
            { label: "PDF", url: "https://dl.acm.org/doi/epdf/10.1145/3715070.3749249" }
        ],
        image: RESEARCH_ASSETS.cscw
    }
];

const demoItems = [
    { type: 'video', src: 'https://www.youtube.com/embed/oBq4iC_T-Yk' },
    { type: 'video', src: 'https://www.youtube.com/embed/5nUYwufk3-U' },
    { type: 'video', src: 'https://www.youtube.com/embed/dMuGlI-wrhQ' },
];

export const Echo = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const footerRef = useRef(null);

    const pageStyle = {
        minHeight: '100vh',
        background: colors.grey[4],
        backgroundImage: `url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='80'%20height='80'%3E%3Crect%20width='1.5'%20height='1.5'%20fill='%23ffffff'%20fill-opacity='0.12'/%3E%3C/svg%3E")`,
        backgroundSize: '80px 80px',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
    };

    return (
        <div style={pageStyle}>
            <Navbar theme="dark" />

            {/* AI-Driven Research */}
            <Section
                id="ai-driven-research"
                title="AI-Driven Research"
                subtitle="读研期间在生成式交互和人机协同方向的研究"
                dark
                headerStyle={{ marginBottom: '56px' }}
                style={{ background: 'transparent', paddingTop: '160px', paddingBottom: layoutSpacing.section.xl }}
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
