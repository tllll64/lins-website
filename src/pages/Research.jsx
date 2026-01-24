import React from 'react';
import { Navbar } from '../components/Navbar';
import { PublicationCard } from '../components/PublicationCard';
import { colors, layoutSpacing, width, typography, stackSpacing, fontSize } from '../design-system/tokens';
import { useMediaQuery } from '../design-system/hooks/useMediaQuery';
import { ASSETS } from '../constants/assets';

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
            venue: "CHI'26 (Best Full Paper)",
            links: [
                { label: "ACM DL", url: "#" },
                { label: "PDF", url: "#" },
                { label: "Video", url: "#" },
                { label: "Research Doc", url: "#" }
            ],
            image: null // Placeholder
        },
        {
            title: "Jokeasy: Exploring Human-AI Collaboration in Thematic Joke Generation",
            authors: "Yate Ge, Lin Tian, Chiqian Xu, Luyao Xu, Meiying Li, Yuanda Hu, Weiwei Guo*",
            venue: "IASDR'25 (Full Paper)",
            links: [
                { label: "xxx", url: "#" },
                { label: "PDF", url: "#" },
                { label: "Video", url: "#" }
            ],
            image: ASSETS.ai1 // Use AI project image as placeholder
        },
        {
            title: "Exploring Generative Personalized Facial Expression Interfaces for Intelligent Agents",
            authors: "Yate Ge, Lin Tian, Ge Chen, Shuhan Pan, Weiwei Guo, Xiaohua Sun*",
            venue: "UIST'25 (Poster)",
            links: [
                { label: "ACM DL", url: "#" },
                { label: "PDF", url: "#" },
                { label: "Video", url: "#" }
            ],
            image: ASSETS.digital4 // Use Hardware/AR image as placeholder
        },
        {
            title: "When Accessibility Becomes a Trap: A User-Centric Characterization of Dark Patterns Arising from Screen Reader Users' Perceived Deception in Mobile Interfaces",
            authors: "Dai Shi, Lin Tian, Jiaxun Sun, TOMOMI KAWAKAMI, Nuo Cheng, Shuchang Xu, Guanhong L",
            venue: "CSCW'25 (Poster)",
            links: [
                { label: "ACM DL (Coming Soon)", url: "#" },
                { label: "PDF", url: "#" }
            ],
            image: ASSETS.digital1 // Use Mobile interface image as placeholder
        }
    ];

    return (
        <div style={pageStyle}>
            <Navbar theme="light" />
            
            <div style={containerStyle}>
                <h1 style={titleStyle}>Publications</h1>
                
                <div>
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
            </div>
        </div>
    );
};
