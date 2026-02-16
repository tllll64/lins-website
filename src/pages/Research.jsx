import React from 'react';
import { Navbar } from '../components/Navbar';
import { PublicationCard } from '../components/PublicationCard';
import { StackCardGallery } from '../components/StackCardGallery';
import { colors, layoutSpacing, width, typography, stackSpacing, fontSize, gridGap } from '../design-system/tokens';
import { useMediaQuery } from '../design-system/hooks/useMediaQuery';
import { ASSETS } from '../constants/assets';

const RESEARCH_ASSETS = {
    chi: new URL('../assets/Research/CHI@3x.png', import.meta.url).href,
    iasdr: new URL('../assets/Research/iasdr@3x.png', import.meta.url).href,
    uist: new URL('../assets/Research/UIST@3x.png', import.meta.url).href,
    cscw: new URL('../assets/Research/CSCW@3x.png', import.meta.url).href,
};

export const Research = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');

    const pageStyle = {
        minHeight: '100vh',
        background: colors.grey[98],
        paddingBottom: layoutSpacing.section.xl
    };

    const containerStyle = {
        maxWidth: width.container.xl,
        margin: '0 auto',
        paddingLeft: isMobile ? layoutSpacing.page.mobile : layoutSpacing.page.desktop,
        paddingRight: isMobile ? layoutSpacing.page.mobile : layoutSpacing.page.desktop,
        paddingTop: '120px' // Space for navbar + title
    };

    const titleStyle = {
        fontFamily: typography.heading1.fontFamily,
        fontSize: isMobile ? '36px' : fontSize[48], // Slightly smaller than Hero? Or same. Screenshot shows "PUBLICATIONS" centered.
        fontWeight: typography.heading1.fontWeight,
        color: colors.grey[9],
        textAlign: 'center',
        marginBottom: stackSpacing.xl,
        letterSpacing: '0.05em'
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
        { type: 'placeholder' },
        { type: 'video', src: 'https://www.youtube.com/embed/5nUYwufk3-U' },
        { type: 'video', src: 'https://www.youtube.com/embed/Cxhs8KX5Kq4' },
        { type: 'video', src: 'https://www.youtube.com/embed/dMuGlI-wrhQ' }
    ];

    return (
        <div style={pageStyle}>
            <Navbar theme="light" />
            
            {/* Teaser Section */}
            <div style={{
                width: '100%',
                height: '80vh',
                background: colors.white.solid,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: 'radial-gradient(rgba(0,0,0,0.1) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                    opacity: 0.5
                }}></div>
            </div>

            <div style={containerStyle}>
                <h1 style={titleStyle}>Publications</h1>
                
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

                <h1 style={titleStyle}>Interactive Demos</h1>
                <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                    gap: gridGap.xl 
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
                             {item.type === 'video' ? (
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
                             ) : (
                                 <div style={{ width: '100%', height: '100%', background: colors.grey[92] }}></div>
                             )}
                        </div>
                    ))}
                </div>

                <h1 style={titleStyle}>AI Expertise</h1>
                <div style={{ marginBottom: layoutSpacing.section.xl }}>
                    <StackCardGallery />
                </div>
            </div>
        </div>
    );
};
