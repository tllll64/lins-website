import React from 'react';
import { Navbar } from '../components/Navbar';
import { ContactSection } from '../components/ContactSection';
import CircularGallery from '../components/CircularGallery';
import { colors, layoutSpacing, width, typography, stackSpacing, fontSize, gridGap } from '../design-system/tokens';
import { useMediaQuery } from '../design-system/hooks/useMediaQuery';
import { ASSETS } from '../constants/assets';
import { motion } from 'framer-motion';
import tiantianquanImg from '../assets/Research/tiantianquan.png';

// --- Demo Components ---

const SectionTitle = ({ children }) => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: stackSpacing.xl,
        }}>
            <h2 style={{
                position: 'relative',
                display: 'inline-block',
                background: colors.grey[9],
                color: '#fff',
                padding: '12px 32px',
                borderRadius: '32px 32px 0 32px',
                fontFamily: 'Inter, sans-serif',
                fontSize: isMobile ? '20px' : '24px',
                fontWeight: 600,
                lineHeight: 1.2,
                margin: 0,
            }}>
                {children}
            </h2>
        </div>
    );
};

const PrincipleCard = ({ title, description, icon }) => (
    <div style={{
        // background: colors.grey[100],
        // padding: layoutSpacing.container.sm,
        // borderRadius: '16px',
        // border: `1px solid ${colors.grey[92]}`,
        display: 'flex',
        flexDirection: 'column',
        gap: stackSpacing.sm
    }}>
        <div style={{ fontSize: '24px', marginBottom: stackSpacing.xs }}>{icon}</div>
        <h3 style={{
            fontFamily: typography.heading3.fontFamily,
            fontSize: '18px',
            fontWeight: 600,
            color: colors.grey[9]
        }}>{title}</h3>
        <p style={{
            fontFamily: typography.body.fontFamily,
            fontSize: '14px',
            lineHeight: 1.5,
            color: colors.grey[7]
        }}>{description}</p>
    </div>
);

const WorkflowStep = ({ number, title, tools }) => (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: stackSpacing.sm,
        position: 'relative',
        zIndex: 1
    }}>
        <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: colors.grey[9],
            color: colors.grey[100],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '20px'
        }}>
            {number}
        </div>
        <h4 style={{ fontWeight: 600, marginTop: stackSpacing.xs }}>{title}</h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {tools.map((tool, i) => (
                <span key={i} style={{
                    fontSize: '12px',
                    background: colors.grey[92],
                    padding: '4px 8px',
                    borderRadius: '4px',
                    color: colors.grey[7]
                }}>{tool}</span>
            ))}
        </div>
    </div>
);

const ExpertiseTag = ({ label, level }) => (
    <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 0',
        borderBottom: `1px dashed ${colors.grey[85]}`
    }}>
        <span style={{ fontWeight: 500, color: colors.grey[9] }}>{label}</span>
        <div style={{ display: 'flex', gap: '4px' }}>
            {[1, 2, 3, 4, 5].map((star) => (
                <div key={star} style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: star <= level ? colors.grey[9] : colors.grey[92]
                }} />
            ))}
        </div>
    </div>
);

const AIBotAvatar = () => (
    <div style={{
        width: '64px',
        height: '64px',
        background: '#fff',
        border: `1px solid ${colors.grey[92]}`,
        borderRadius: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        overflow: 'hidden'
    }}>
        <img src={tiantianquanImg} alt="AI Bot" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
);

export const Research = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');

    const pageStyle = {
        minHeight: '100vh',
        background: colors.grey[98],
        paddingBottom: 0
    };

    const containerStyle = {
        maxWidth: width.container.xl,
        margin: '0 auto',
        paddingLeft: isMobile ? layoutSpacing.page.mobile : layoutSpacing.page.desktop,
        paddingRight: isMobile ? layoutSpacing.page.mobile : layoutSpacing.page.desktop,
        paddingTop: '120px'
    };

    const sectionStyle = {
        marginBottom: isMobile ? layoutSpacing.section.lg : layoutSpacing.section.xl
    };

    const titleStyle = {
        fontFamily: typography.heading1.fontFamily,
        fontSize: isMobile ? '36px' : fontSize[48],
        fontWeight: typography.heading1.fontWeight,
        color: colors.grey[9],
        textAlign: 'center',
        marginBottom: stackSpacing.xl,
        letterSpacing: '0.05em'
    };

    // --- Data ---
    const principles = [
        { title: "Human-in-the-Loop", description: "AI amplifies, not replaces. Critical decision points always require human oversight.", icon: "🤝" },
        { title: "Iterative Refinement", description: "Start with broad strokes generated by AI, then refine with human nuance.", icon: "cw" },
        { title: "Transparency", description: "Clear distinction between AI-generated and human-created content to build trust.", icon: "👁️" }
    ];

    const workflowSteps = [
        { number: 1, title: "Ideation", tools: ["ChatGPT", "Claude", "Miro"] },
        { number: 2, title: "Design", tools: ["Midjourney", "Figma", "Photoshop"] },
        { number: 3, title: "Prototyping", tools: ["Cursor", "React", "Framer"] },
        { number: 4, title: "Refinement", tools: ["User Testing", "Manual Polish"] }
    ];

    const expertise = [
        { category: "LLM Prompting", skills: [
            { label: "Chain-of-Thought", level: 5 },
            { label: "Few-Shot Learning", level: 4 },
            { label: "System Design", level: 4 }
        ]},
        { category: "Visual Generation", skills: [
            { label: "Midjourney", level: 5 },
            { label: "Stable Diffusion", level: 3 },
            { label: "Runway Gen-2", level: 4 }
        ]},
        { category: "Integration", skills: [
            { label: "OpenAI API", level: 4 },
            { label: "LangChain", level: 3 },
            { label: "Vercel AI SDK", level: 4 }
        ]}
    ];

    const galleryItems = [
        { text: 'Project One', image: 'https://picsum.photos/700/700?random=1', link: '#' },
        { text: 'Project Two', image: 'https://picsum.photos/700/700?random=2', link: '#' },
        { text: 'Project Three', image: 'https://picsum.photos/700/700?random=3', link: '#' },
        { text: 'Project Four', image: 'https://picsum.photos/700/700?random=4', link: '#' },
        { text: 'Project Five', image: 'https://picsum.photos/700/700?random=5', link: '#' },
        { text: 'Project Six', image: 'https://picsum.photos/700/700?random=6', link: '#' },
        { text: 'Project Seven', image: 'https://picsum.photos/700/700?random=7', link: '#' },
        { text: 'Project Eight', image: 'https://picsum.photos/700/700?random=8', link: '#' },
    ];

    return (
        <div style={pageStyle}>
            <Navbar theme="light" />
            
            <div style={containerStyle}>
                <div style={{
                    minHeight: '80vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: '80px',
                    marginBottom: layoutSpacing.section.lg
                }}>
                    <h1 style={{
                        fontFamily: 'Lora, "Times New Roman", Georgia, serif',
                        fontSize: '72px',
                        fontWeight: 400,
                        lineHeight: 1.1,
                        marginBottom: '24px',
                        letterSpacing: '-0.02em',
                        color: colors.grey[9]
                    }}>
                        Play with AI
                    </h1>
                    <p style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '18px',
                        lineHeight: 1.6,
                        maxWidth: '600px',
                        margin: '0 auto',
                        opacity: 0.9,
                        color: colors.grey[7],
                        textAlign: 'center'
                    }}>
                        Simplicity is my superpower. I turn complex ideas into experiences users love and investors trust. I help SaaS, AI, and Dev founders craft story-driven brands and products.
                    </p>
                    <div style={{ width: '100%', height: '600px' }}>
                        <CircularGallery items={galleryItems} bend={3} textColor={colors.grey[9]} borderRadius={0.05} />
                    </div>
                </div>

                {/* Section 1: AI Collaborative Principles */}
                <section style={sectionStyle}>
                    <SectionTitle>Principles</SectionTitle>
                    <div style={{
                        display: 'flex',
                        gap: isMobile ? '8px' : '16px',
                        alignItems: 'flex-end'
                    }}>
                        <AIBotAvatar />
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                            gap: gridGap.lg,
                            background: '#fff',
                            border: `1px solid ${colors.grey[92]}`,
                            borderRadius: '32px 32px 32px 0',
                            padding: '32px',
                            flex: 1
                        }}>
                            {principles.map((p, index) => (
                                <PrincipleCard key={index} {...p} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section 2: AI Workflow */}
                <section style={sectionStyle}>
                    <SectionTitle>Co-AI Workflows</SectionTitle>
                    <div style={{
                        display: 'flex',
                        gap: isMobile ? '8px' : '16px',
                        alignItems: 'flex-end'
                    }}>
                        <AIBotAvatar />
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
                            gap: gridGap.xl,
                            position: 'relative',
                            background: '#fff',
                            border: `1px solid ${colors.grey[92]}`,
                            borderRadius: '32px 32px 32px 0',
                            padding: '32px',
                            flex: 1
                        }}>
                            {!isMobile && (
                                <div style={{
                                    position: 'absolute',
                                    top: '56px', // Center of the circle (48px height / 2 + padding top 32px)
                                    left: '10%',
                                    right: '10%',
                                    height: '2px',
                                    background: colors.grey[92],
                                    zIndex: 0
                                }} />
                            )}
                            {workflowSteps.map((step, index) => (
                                <WorkflowStep key={index} {...step} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section 3: AI Expertise */}
                <section style={sectionStyle}>
                    <SectionTitle>AI Expertise</SectionTitle>
                    <div style={{
                        display: 'flex',
                        gap: isMobile ? '8px' : '16px',
                        alignItems: 'flex-end'
                    }}>
                        <AIBotAvatar />
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                            gap: gridGap.xl,
                            background: '#fff',
                            border: `1px solid ${colors.grey[92]}`,
                            borderRadius: '32px 32px 32px 0',
                            padding: '32px',
                            flex: 1
                        }}>
                            {expertise.map((area, index) => (
                                <div key={index}>
                                    <h3 style={{
                                        fontSize: '18px',
                                        fontWeight: 600,
                                        marginBottom: stackSpacing.md,
                                        color: colors.grey[8]
                                    }}>{area.category}</h3>
                                    <div>
                                        {area.skills.map((skill, i) => (
                                            <ExpertiseTag key={i} {...skill} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            <ContactSection />
        </div>
    );
};
