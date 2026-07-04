import React, { useState, useRef } from 'react';
import { Navbar } from '../components/Navbar';
import { ContactSection } from '../components/ContactSection';
import NothingDotClock from '../components/NothingDotClock';
import CircularGallery from '../components/CircularGallery';
import { colors, layoutSpacing, width, typography, stackSpacing, fontSize, gridGap } from '../design-system/tokens';
import { useMediaQuery } from '../design-system/hooks/useMediaQuery';
import { ASSETS } from '../constants/assets';
import { motion } from 'framer-motion';
import tiantianquanImg from '../assets/Research/tiantianquan.png';
import Stack from '../components/Stack';
import StackImg from '../assets/Research/Stack.png';
import { History, X, ChevronLeft, ChevronRight } from 'lucide-react';

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
                fontFamily: typography.body.fontFamily,
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

const PrincipleCard = ({ title, description }) => (
    <div style={{
        // background: colors.grey[100],
        // padding: layoutSpacing.container.sm,
        // borderRadius: '16px',
        // border: `1px solid ${colors.grey[92]}`,
        display: 'flex',
        flexDirection: 'column',
        gap: stackSpacing.sm
    }}>
        {/* <div style={{ fontSize: '24px', marginBottom: stackSpacing.xs }}>{icon}</div> */}
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
    const [showHistory, setShowHistory] = useState(false);
    const [discHovered, setDiscHovered] = useState(false);

    // Infinite canvas drag state
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragStartRef = useRef(null);

    const handleMouseDown = (e) => {
        if (e.target.closest('button, a, input')) return;
        setIsDragging(true);
        dragStartRef.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
    };

    const handleMouseMove = (e) => {
        if (!isDragging || !dragStartRef.current) return;
        setOffset({ x: e.clientX - dragStartRef.current.x, y: e.clientY - dragStartRef.current.y });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        dragStartRef.current = null;
    };

    const handleTouchStart = (e) => {
        if (e.target.closest('button, a, input')) return;
        const t = e.touches[0];
        setIsDragging(true);
        dragStartRef.current = { x: t.clientX - offset.x, y: t.clientY - offset.y };
    };

    const handleTouchMove = (e) => {
        if (!isDragging || !dragStartRef.current) return;
        const t = e.touches[0];
        setOffset({ x: t.clientX - dragStartRef.current.x, y: t.clientY - dragStartRef.current.y });
    };

    const pageStyle = {
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        background: colors.grey[98],
        backgroundImage: `radial-gradient(#aaaaaa 1px, transparent 1px)`,
        backgroundSize: '18px 18px',
        backgroundPosition: `${offset.x % 18}px ${offset.y % 18}px`,
        backgroundRepeat: 'repeat',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        paddingBottom: 0
    };

    const containerStyle = {
        maxWidth: width.container.xl,
        margin: '0 auto',
        paddingLeft: isMobile ? layoutSpacing.page.mobile : layoutSpacing.page.desktop,
        paddingRight: isMobile ? layoutSpacing.page.mobile : layoutSpacing.page.desktop,
        paddingTop: '40px',
        position: 'relative',
        zIndex: 1
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
        { 
            title: "Interest & Value Driven", 
            description: "Guided by genuine curiosity and intrinsic value. Learning spans side projects and seeking answers to real problems.", 
            icon: "❤️" 
        },
        { 
            title: "Hands-On Curiosity", 
            description: "Depth comes from practice. Turn 'know-how' into 'can-do' by getting your hands dirty and building things.", 
            icon: "🖐️" 
        },
        { 
            title: "Agile Reflection", 
            description: "Harness meta-learning. Shorten the loop from idea to output, and reflect promptly to iterate and improve.", 
            icon: "🔄" 
        }
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
        <div
            style={pageStyle}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
        >
            {/* Navbar — fixed, not affected by canvas pan */}
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>
                <Navbar theme="light" />
            </div>

            {/* Infinite canvas layer */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                transform: `translate(${offset.x}px, ${offset.y}px)`,
                pointerEvents: isDragging ? 'none' : 'auto',
                zIndex: 1,
            }}>
                {/* Title sticker — above the disc */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -220px) rotate(-1.5deg)',
                    pointerEvents: 'none',
                    whiteSpace: 'nowrap',
                    display: 'inline-block',
                }}>
                    <h1 style={{
                        fontFamily: 'Lora, "Times New Roman", Georgia, serif',
                        fontSize: '48px',
                        fontWeight: 400,
                        lineHeight: 1.2,
                        letterSpacing: '-0.02em',
                        color: colors.grey[9],
                        margin: 0,
                        WebkitTextStroke: '20px white',
                        paintOrder: 'stroke fill',
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.08))',
                    }}>
                        Human & AI Sandbox
                    </h1>
                </div>

                {/* Canvas content — centered at origin */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    pointerEvents: 'auto',
                }}>
                    <NothingDotClock staticMode onHoverChange={setDiscHovered} />
                    <button
                        onClick={() => setShowHistory(true)}
                        style={{
                            background: 'rgba(255,255,255,0.6)',
                            backdropFilter: 'blur(8px)',
                            border: '1px solid rgba(0,0,0,0.08)',
                            borderRadius: '50%',
                            width: '48px',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'background 0.2s',
                            padding: 0,
                            outline: 'none',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.8)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.6)'}
                    >
                        <History size={20} color={colors.grey[40]} />
                    </button>
                </div>
            </div>

            {/* Bottom hover info bar */}
            <div style={{
                position: 'fixed',
                bottom: '24px',
                left: '24px',
                right: '24px',
                transform: `translateY(${discHovered ? '0px' : '12px'})`,
                opacity: discHovered ? 1 : 0,
                transition: 'opacity 0.25s ease, transform 0.25s ease',
                pointerEvents: 'none',
                zIndex: 200,
                background: 'rgba(255,255,255,0.8)',
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
                border: '1px solid rgba(0,0,0,0.06)',
                borderRadius: '100px',
                padding: '12px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <span style={{
                    fontFamily: typography.heading5.fontFamily,
                    fontSize: typography.heading5.fontSize,
                    fontWeight: typography.heading5.fontWeight,
                    lineHeight: typography.heading5.lineHeight,
                    letterSpacing: typography.heading5.letterSpacing,
                    color: colors.grey[9],
                }}>
                    An Agent I'm Hatching
                </span>
                <span style={{
                    fontFamily: typography.body.fontFamily,
                    fontSize: '14px',
                    color: colors.grey[9],
                    opacity: 0.6,
                }}>
                    Pixel Art · 2024
                </span>
            </div>

            {/* History Overlay Panel */}
            {showHistory && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 40,
                    background: '#f9f9f9',
                    backdropFilter: 'blur(0px)',
                    overflow: 'auto',
                    opacity: showHistory ? 1 : 0,
                    pointerEvents: showHistory ? 'auto' : 'none',
                    transform: showHistory ? 'translateY(0)' : 'translateY(16px)',
                    transition: 'opacity 0.3s ease, transform 0.3s ease'
                }}>
                    {/* Close button */}
                    <button
                        onClick={() => setShowHistory(false)}
                        style={{
                            position: 'fixed',
                            top: '32px',
                            right: '32px',
                            zIndex: 41,
                            background: 'rgba(255,255,255,0.6)',
                            backdropFilter: 'blur(8px)',
                            border: '1px solid rgba(0,0,0,0.08)',
                            borderRadius: '50%',
                            width: '48px',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            padding: 0,
                            outline: 'none',
                            transition: 'background 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.8)'}
                        onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.6)'}
                    >
                        <X size={20} color={colors.grey[40]} />
                    </button>

                    {/* Overlay Content */}
                    <div style={{
                        maxWidth: width.container.xl,
                        margin: '0 auto',
                        paddingLeft: isMobile ? layoutSpacing.page.mobile : layoutSpacing.page.desktop,
                        paddingRight: isMobile ? layoutSpacing.page.mobile : layoutSpacing.page.desktop,
                        paddingTop: '80px',
                        paddingBottom: '120px'
                    }}>
                        {/* Section 1: Lynn's Co-AI Principles */}
                        <section style={{
                            marginBottom: isMobile ? layoutSpacing.section.lg : layoutSpacing.section.xl
                        }}>
                            <SectionTitle>Lynn's Co-AI Principles</SectionTitle>
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
                                    marginRight: isMobile ? '0' : '80px',
                                    flex: 1
                                }}>
                                    {principles.map((p, index) => (
                                        <PrincipleCard key={index} {...p} />
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Section 2: Lynn's AI Stack */}
                        <section style={{
                            marginBottom: isMobile ? layoutSpacing.section.lg : layoutSpacing.section.xl
                        }}>
                            <SectionTitle>Lynn's AI Stack</SectionTitle>
                            <div style={{
                                display: 'flex',
                                gap: isMobile ? '8px' : '16px',
                                alignItems: 'flex-end'
                            }}>
                                <AIBotAvatar />
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: '#fff',
                                    border: `1px solid ${colors.grey[92]}`,
                                    borderRadius: '32px 32px 32px 0',
                                    padding: '10px',
                                    marginRight: isMobile ? '0' : '80px',
                                    flex: 1
                                }}>
                                    <img
                                        src={StackImg}
                                        alt="AI Workflow Stack"
                                        style={{
                                            maxWidth: '100%',
                                            height: 'auto',
                                            display: 'block'
                                        }}
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Section 3: Lynn's Vibe Coding Workflows */}
                        <section style={{
                            marginBottom: isMobile ? layoutSpacing.section.lg : layoutSpacing.section.xl
                        }}>
                            <SectionTitle>Lynn's Vibe Coding Workflows</SectionTitle>
                            <div style={{
                                display: 'flex',
                                gap: isMobile ? '8px' : '16px',
                                alignItems: 'flex-end'
                            }}>
                                <AIBotAvatar />
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: '#fff',
                                    border: `1px solid ${colors.grey[92]}`,
                                    borderRadius: '32px 32px 32px 0',
                                    padding: '10px',
                                    marginRight: isMobile ? '0' : '80px',
                                    flex: 1
                                }}>
                                    <img
                                        src={StackImg}
                                        alt="AI Workflow Stack"
                                        style={{
                                            maxWidth: '100%',
                                            height: 'auto',
                                            display: 'block'
                                        }}
                                    />
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            )}
        </div>
    );
};
